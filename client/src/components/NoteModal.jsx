import { useState, useEffect, useRef } from "react";

const COLORS = [
  { id: "default", bg: "bg-gray-800", border: "border-gray-700", ring: "ring-gray-500" },
  { id: "red", bg: "bg-red-900/40", border: "border-red-500/50", ring: "ring-red-500" },
  { id: "green", bg: "bg-emerald-900/40", border: "border-emerald-500/50", ring: "ring-emerald-500" },
  { id: "blue", bg: "bg-blue-900/40", border: "border-blue-500/50", ring: "ring-blue-500" },
  { id: "yellow", bg: "bg-yellow-900/40", border: "border-yellow-500/50", ring: "ring-yellow-500" },
  { id: "purple", bg: "bg-purple-900/40", border: "border-purple-500/50", ring: "ring-purple-500" },
];

const NoteModal = ({ isOpen, onClose, onSubmit, existingNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [color, setColor] = useState("default");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const titleRef = useRef(null);

  const isEditMode = Boolean(existingNote);

  // Sync fields when modal opens or existingNote changes
  useEffect(() => {
    if (isOpen) {
      setTitle(existingNote?.title ?? "");
      setContent(existingNote?.content ?? "");
      setIsPinned(existingNote?.isPinned ?? false);
      setColor(existingNote?.color ?? "default");
      setError("");
      setLoading(false);
      setTimeout(() => titleRef.current?.focus(), 60);
    }
  }, [isOpen, existingNote]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return setError("Title is required.");
    if (!content.trim()) return setError("Content is required.");
    setError("");
    setLoading(true);
    try {
      await onSubmit({ 
        title: title.trim(), 
        content: content.trim(),
        isPinned,
        color
      });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    /* Overlay */
    <div
      id="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4
                 bg-black/70 backdrop-blur-md animate-[fadeIn_.15s_ease]"
    >
      <style>{`@keyframes fadeIn { from { opacity:0; transform:scale(.96) } to { opacity:1; transform:scale(1) } }`}</style>

      {/* Modal panel */}
      <div
        id="note-modal"
        className="w-full max-w-lg bg-gray-900 border border-gray-700 rounded-3xl
                   shadow-2xl flex flex-col gap-6 p-6 sm:p-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-white font-bold text-xl tracking-tight">
            {isEditMode ? "✏️ Edit Note" : "📝 New Note"}
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPinned(!isPinned)}
              title={isPinned ? "Unpin note" : "Pin note"}
              className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200
                          ${isPinned 
                            ? "bg-yellow-400/20 text-yellow-400 border border-yellow-400/30" 
                            : "bg-gray-800 text-gray-500 border border-gray-700 hover:text-gray-300 hover:bg-gray-700"}`}
            >
              📌
            </button>
            <button
              id="close-modal-btn"
              onClick={onClose}
              className="text-gray-500 hover:text-red-400 transition-colors text-2xl leading-none
                         w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-800"
            >
              ×
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <input
              id="note-title-input"
              ref={titleRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
              maxLength={120}
              className="bg-transparent border-none px-1 py-2 text-2xl font-bold text-white placeholder-gray-600 outline-none
                         focus:ring-0 transition-all duration-200"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-1.5">
            <textarea
              id="note-content-input"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start typing..."
              rows={6}
              className="bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3
                         text-gray-200 placeholder-gray-500 text-[15px] outline-none resize-y
                         focus:border-yellow-400/50 focus:ring-4 focus:ring-yellow-400/10
                         transition-all duration-200 leading-relaxed min-h-[140px]"
            />
          </div>

          {/* Color Picker */}
          <div className="flex items-center gap-3 py-1">
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-widest mr-1">Color</span>
            {COLORS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setColor(c.id)}
                className={`w-6 h-6 rounded-full transition-all duration-200 ${c.bg} ${c.border} border
                            ${color === c.id ? `ring-2 ring-offset-2 ring-offset-gray-900 ${c.ring} scale-110` : "hover:scale-110"}`}
                title={c.id}
              />
            ))}
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3
                            text-red-400 text-sm flex items-center gap-2">
              ⚠️ {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-2 border-t border-gray-800 mt-2">
            <button
              id="cancel-btn"
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-gray-400 hover:text-white font-medium
                         transition-all duration-200 hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              id="submit-note-btn"
              type="submit"
              disabled={loading}
              className="px-7 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300
                         text-gray-900 font-bold text-[15px] shadow-lg shadow-yellow-400/20
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-200 active:scale-95"
            >
              {loading
                ? "Saving..."
                : isEditMode
                ? "Save Changes"
                : "Create Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
