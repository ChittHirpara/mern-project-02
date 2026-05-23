const EmptyState = ({ isSearch = false }) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
      <span className="text-7xl select-none">📭</span>
      <h2 className="text-gray-300 text-xl font-semibold">
        {isSearch ? "No notes found" : "No notes yet"}
      </h2>
      <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
        {isSearch
          ? "No notes match your search. Try a different keyword."
          : "Click 'Add Note' to get started!"}
      </p>
    </div>
  );
};

export default EmptyState;
