export default function InsightCard({ title, children, className = '' }) {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-2xl
                     border border-gray-100 dark:border-slate-700
                     p-5 ${className}`}>
      <h3 className="text-sm font-semibold text-gray-500 dark:text-slate-400
                     uppercase tracking-wide mb-4">
        {title}
      </h3>
      {children}
    </div>
  )
}