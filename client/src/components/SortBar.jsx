const SORTS = [
  { id: "newest", label: "Newest" },
  { id: "oldest", label: "Oldest" },
  { id: "az",     label: "A → Z"  },
];

const GridIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
    <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor"/>
    <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor"/>
    <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor"/>
    <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor"/>
  </svg>
);

const ListIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
    <rect x="1" y="2"  width="14" height="3" rx="1.5" fill="currentColor"/>
    <rect x="1" y="7"  width="14" height="3" rx="1.5" fill="currentColor"/>
    <rect x="1" y="12" width="14" height="3" rx="1.5" fill="currentColor"/>
  </svg>
);

const SortBar = ({ sortBy, onSortChange, viewMode, onViewToggle, total, pinned }) => (
  <div className="flex flex-wrap items-center justify-between gap-3 mb-6
                  pb-4 border-b border-gray-800">

    {/* Left — stats */}
    <div className="flex items-center gap-3">
      <span className="text-gray-400 text-sm font-medium">
        <span className="text-white font-bold">{total}</span>{" "}
        {total === 1 ? "note" : "notes"}
      </span>
      {pinned > 0 && (
        <span className="inline-flex items-center gap-1 text-xs bg-yellow-400/10 border border-yellow-400/20
                         text-yellow-400 px-2.5 py-1 rounded-full font-semibold">
          📌 {pinned} pinned
        </span>
      )}
    </div>

    {/* Right — sort + view */}
    <div className="flex items-center gap-2">
      {/* Sort pills */}
      <div className="flex items-center bg-gray-800/60 rounded-xl p-1 gap-0.5 border border-gray-700/50">
        {SORTS.map((s) => (
          <button
            key={s.id}
            onClick={() => onSortChange(s.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200
                        ${sortBy === s.id
                          ? "bg-yellow-400 text-gray-900 shadow"
                          : "text-gray-400 hover:text-white"}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-gray-700" />

      {/* View toggle */}
      <div className="flex items-center bg-gray-800/60 rounded-xl p-1 gap-0.5 border border-gray-700/50">
        <button
          onClick={() => onViewToggle("grid")}
          title="Grid view"
          className={`p-1.5 rounded-lg transition-all duration-200
                      ${viewMode === "grid"
                        ? "bg-yellow-400 text-gray-900"
                        : "text-gray-400 hover:text-white"}`}
        >
          <GridIcon />
        </button>
        <button
          onClick={() => onViewToggle("list")}
          title="List view"
          className={`p-1.5 rounded-lg transition-all duration-200
                      ${viewMode === "list"
                        ? "bg-yellow-400 text-gray-900"
                        : "text-gray-400 hover:text-white"}`}
        >
          <ListIcon />
        </button>
      </div>
    </div>
  </div>
);

export default SortBar;
