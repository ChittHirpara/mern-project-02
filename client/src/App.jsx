import { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import NoteCard from "./components/NoteCard";
import NoteModal from "./components/NoteModal";
import EmptyState from "./components/EmptyState";
import SortBar from "./components/SortBar";
import ToastContainer from "./components/ToastContainer";
import { getAllNotes, createNote, updateNote, deleteNote } from "./api/notes.api";

function App() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null); // null = create, object = edit
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  
  const [toasts, setToasts] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");

  // ── Toast Helpers ─────────────────────────────────────────────────────────
  const addToast = (message, type = "success") => {
    setToasts((prev) => [...prev, { id: Date.now(), message, type }]);
  };
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // ── Fetch all notes on mount ─────────────────────────────────────────────
  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      setFetchError("");
      const data = await getAllNotes();
      setNotes(data);
    } catch {
      setFetchError("Could not connect to the server. Is it running on port 5000?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // ── Derived: filtered notes + sorting ────────────────────────────────────
  const filteredNotes = notes
    .filter((n) => n.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      // Pinned always top
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
      
      // Secondary sort based on sortBy
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "az") return a.title.localeCompare(b.title);
      return 0;
    });

  // ── Handlers ──────────────────────────────────────────────────────────────
  const openCreateModal = () => {
    setSelectedNote(null);
    setIsModalOpen(true);
  };

  const openEditModal = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  const handleSubmit = async (noteData) => {
    try {
      if (selectedNote) {
        // Edit
        const updated = await updateNote(selectedNote._id, noteData);
        setNotes((prev) =>
          prev.map((n) => (n._id === updated._id ? updated : n))
        );
        addToast("Note updated successfully!");
      } else {
        // Create
        const created = await createNote(noteData);
        setNotes((prev) => [created, ...prev]);
        addToast("Note created successfully!");
      }
      closeModal();
    } catch (err) {
      addToast(err.response?.data?.message || "Failed to save note.", "error");
      throw err; // let modal handle the form error state
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      addToast("Note deleted permanently.", "success");
    } catch (err) {
      console.error("Delete failed:", err);
      addToast("Failed to delete note.", "error");
    }
  };

  const handleCopy = (note) => {
    navigator.clipboard.writeText(`${note.title}\n\n${note.content}`);
    addToast("Copied to clipboard!", "info");
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-900 text-white pb-12 relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-yellow-400/5 blur-[120px] pointer-events-none" />

      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddNote={openCreateModal}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 relative z-10">

        {/* Loading spinner */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div
              className="w-10 h-10 rounded-full border-4 border-gray-700 border-t-yellow-400
                         animate-spin"
            />
            <p className="text-gray-500 text-sm">Loading notes...</p>
          </div>
        )}

        {/* Fetch error */}
        {!loading && fetchError && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-5 py-4
                          text-red-400 text-sm text-center mb-6">
            ⚠️ {fetchError}
          </div>
        )}

        {/* Sort Bar */}
        {!loading && !fetchError && notes.length > 0 && (
          <SortBar 
            sortBy={sortBy} 
            onSortChange={setSortBy} 
            viewMode={viewMode} 
            onViewToggle={setViewMode}
            total={filteredNotes.length}
            pinned={filteredNotes.filter(n => n.isPinned).length}
          />
        )}

        {/* Notes container */}
        {!loading && !fetchError && filteredNotes.length > 0 && (
          <div
            id="notes-container"
            className={viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              : "flex flex-col gap-4"}
          >
            {filteredNotes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={openEditModal}
                onDelete={handleDelete}
                onCopy={handleCopy}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}

        {/* Empty states */}
        {!loading && !fetchError && notes.length === 0 && (
          <EmptyState isSearch={false} />
        )}
        {!loading && !fetchError && notes.length > 0 && filteredNotes.length === 0 && (
          <EmptyState isSearch={true} />
        )}
      </main>

      <NoteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        existingNote={selectedNote}
      />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default App;
