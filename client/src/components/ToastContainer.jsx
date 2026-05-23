import { useEffect, useState } from "react";

const STYLES = {
  success: {
    bar:  "bg-emerald-500",
    icon: "✅",
    wrap: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  },
  error: {
    bar:  "bg-red-500",
    icon: "❌",
    wrap: "border-red-500/30 bg-red-500/10 text-red-300",
  },
  info: {
    bar:  "bg-blue-400",
    icon: "ℹ️",
    wrap: "border-blue-400/30 bg-blue-400/10 text-blue-300",
  },
};

// Individual toast — handles its own exit animation
const Toast = ({ toast, onRemove }) => {
  const [visible, setVisible] = useState(true);
  const s = STYLES[toast.type] || STYLES.info;

  useEffect(() => {
    const hide = setTimeout(() => setVisible(false), 2800);
    const remove = setTimeout(() => onRemove(toast.id), 3200);
    return () => { clearTimeout(hide); clearTimeout(remove); };
  }, [toast.id, onRemove]);

  return (
    <div
      className={`relative flex items-center gap-3 px-5 py-3.5 rounded-2xl border
                  backdrop-blur-xl shadow-2xl shadow-black/50 min-w-[240px] max-w-xs
                  overflow-hidden transition-all duration-500 cursor-default select-none
                  ${s.wrap}
                  ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-95"}`}
      style={{ animation: "toastIn .35s cubic-bezier(.34,1.56,.64,1)" }}
    >
      {/* Progress bar */}
      <div className={`absolute bottom-0 left-0 h-[2px] ${s.bar} animate-[shrink_3s_linear_forwards]`} />

      <span className="text-base leading-none">{s.icon}</span>
      <p className="text-sm font-semibold leading-snug flex-1">{toast.message}</p>

      <button
        onClick={() => { setVisible(false); setTimeout(() => onRemove(toast.id), 350); }}
        className="text-current opacity-40 hover:opacity-80 transition-opacity text-lg leading-none ml-1"
      >
        ×
      </button>
    </div>
  );
};

// Container — stacked bottom-right
const ToastContainer = ({ toasts, onRemove }) => (
  <div className="fixed bottom-6 right-6 z-[500] flex flex-col-reverse gap-3 items-end pointer-events-none">
    {toasts.map((t) => (
      <div key={t.id} className="pointer-events-auto">
        <Toast toast={t} onRemove={onRemove} />
      </div>
    ))}
  </div>
);

export default ToastContainer;
