const Navbar = ({ searchQuery, onSearchChange, onAddNote }) => {
  return (
    <nav className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">

        {/* Logo */}
        <h1 className="text-white font-extrabold text-xl shrink-0 tracking-tight flex items-center gap-2 cursor-default">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/20">
            <span className="text-[15px] leading-none text-gray-900">📝</span>
          </div>
          <span><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">Note</span>Vault</span>
        </h1>

        {/* Search */}
        <div className="flex-1 max-w-md mx-auto relative group">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-400 transition-colors">
            🔍
          </span>
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search notes..."
            className="w-full bg-gray-800/50 text-gray-100 placeholder-gray-500 border border-gray-700/50
                       rounded-xl pl-10 pr-4 py-2 text-sm outline-none shadow-inner
                       focus:border-yellow-400/50 focus:ring-4 focus:ring-yellow-400/10 focus:bg-gray-800
                       transition-all duration-300"
          />
        </div>

        {/* Add button */}
        <button
          id="add-note-btn"
          onClick={onAddNote}
          className="shrink-0 flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 
                     hover:from-yellow-300 hover:to-yellow-400
                     text-gray-900 font-bold text-[13px] px-5 py-2.5 rounded-xl
                     transition-all duration-300 shadow-lg shadow-yellow-400/20
                     hover:shadow-yellow-400/40 hover:-translate-y-0.5 active:scale-95 uppercase tracking-wide"
        >
          <span className="text-lg leading-none font-normal">+</span>
          New Note
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
