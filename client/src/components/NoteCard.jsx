const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const COLOR_MAP = {
  default: "hover:border-yellow-400/50 bg-gray-800 border-gray-700",
  red: "hover:border-red-400 bg-red-900/10 border-red-900/50",
  green: "hover:border-emerald-400 bg-emerald-900/10 border-emerald-900/50",
  blue: "hover:border-blue-400 bg-blue-900/10 border-blue-900/50",
  yellow: "hover:border-yellow-400 bg-yellow-900/10 border-yellow-900/50",
  purple: "hover:border-purple-400 bg-purple-900/10 border-purple-900/50",
};

const NoteCard = ({ note, onEdit, onDelete, onCopy, viewMode }) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Delete "${note.title}"? This cannot be undone.`)) {
      onDelete(note._id);
    }
  };

  const handleCopy = (e) => {
    e.stopPropagation();
    if (onCopy) onCopy(note);
  };

  const cardStyle = COLOR_MAP[note.color] || COLOR_MAP.default;
  const isList = viewMode === "list";

  return (
    <div
      onClick={() => onEdit(note)}
      className={`group border rounded-2xl p-5 flex flex-col gap-3
                 cursor-pointer transition-all duration-300
                 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1.5
                 relative overflow-hidden ${cardStyle}
                 ${isList ? "sm:flex-row sm:items-center sm:gap-6 sm:p-6" : ""}`}
    >
      {/* Decorative top/left accent for pinned notes */}
      {note.isPinned && (
        <div className={`absolute ${isList ? "left-0 top-0 w-1 h-full" : "top-0 left-0 w-full h-1"} bg-gradient-to-r from-yellow-400 to-yellow-600`} />
      )}

      {/* Info wrapper (Left side in list view) */}
      <div className={`flex flex-col gap-3 ${isList ? "flex-1 min-w-0" : ""}`}>
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-white font-bold text-lg leading-snug truncate">
            {note.title}
          </h3>
          {note.isPinned && (
            <span className="text-yellow-400 text-sm shrink-0" title="Pinned Note">
              📌
            </span>
          )}
        </div>

        {/* Content preview */}
        <p className={`text-gray-400 text-[15px] leading-relaxed flex-1 mt-1
                      ${isList ? "line-clamp-2" : "line-clamp-3"}`}>
          {note.content}
        </p>
      </div>

      {/* Footer / Actions (Right side in list view) */}
      <div className={`flex justify-between ${isList ? "sm:flex-col sm:items-end sm:gap-4 shrink-0" : "items-end mt-4"}`}>
        {/* Timestamps */}
        <div className={`flex flex-col gap-0.5 ${isList ? "sm:text-right" : ""}`}>
          <span className="text-gray-500 text-[11px] font-medium tracking-wide uppercase">
            Created {formatDate(note.createdAt)}
          </span>
          {note.updatedAt &&
            Math.abs(
              new Date(note.updatedAt).getTime() - new Date(note.createdAt).getTime()
            ) > 1000 && (
              <span className="text-gray-500 text-[11px] font-medium tracking-wide uppercase">
                Updated {formatDate(note.updatedAt)}
              </span>
            )}
        </div>

        {/* Action buttons */}
        <div
          className={`flex gap-2 transition-all duration-300
                      ${isList ? "opacity-100" : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Copy */}
          <button
            onClick={handleCopy}
            title="Copy content"
            className="w-9 h-9 flex items-center justify-center rounded-xl
                       bg-gray-800 border border-gray-700 text-gray-300
                       hover:bg-blue-500 hover:text-white hover:border-blue-500
                       transition-all duration-200 shadow-lg"
          >
            📋
          </button>

          {/* Edit */}
          <button
            id={`edit-${note._id}`}
            onClick={() => onEdit(note)}
            title="Edit note"
            className="w-9 h-9 flex items-center justify-center rounded-xl
                       bg-gray-800 border border-gray-700 text-gray-300
                       hover:bg-yellow-400 hover:text-gray-900 hover:border-yellow-400
                       transition-all duration-200 shadow-lg"
          >
            ✏️
          </button>

          {/* Delete */}
          <button
            id={`delete-${note._id}`}
            onClick={handleDelete}
            title="Delete note"
            className="w-9 h-9 flex items-center justify-center rounded-xl
                       bg-gray-800 border border-gray-700 text-gray-300
                       hover:bg-red-500 hover:text-white hover:border-red-500
                       transition-all duration-200 shadow-lg"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
