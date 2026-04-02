import { Search, X } from 'lucide-react'
import useStore from '../../store/useStore'
import { categories } from '../../data/mockData'

export default function FiltersBar() {
  const { filters, setFilter, resetFilters } = useStore()

  const isFiltered =
    filters.search !== '' ||
    filters.type !== 'all' ||
    filters.category !== 'all' ||
    filters.sortBy !== 'date-new'

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl
                    border border-gray-100 dark:border-slate-700 p-4 space-y-3">

      {/* Row 1: Search + Reset */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2
                       text-gray-400 dark:text-slate-500"
          />
          <input
            type="text"
            placeholder="Search merchant or category..."
            value={filters.search}
            onChange={(e) => setFilter('search', e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm
                       border border-gray-200 dark:border-slate-600
                       rounded-lg bg-white dark:bg-slate-700
                       text-gray-800 dark:text-white
                       placeholder-gray-400 dark:placeholder-slate-500
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {isFiltered && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1.5 px-3 py-2 text-sm
                       text-rose-600 dark:text-rose-400
                       hover:bg-rose-50 dark:hover:bg-rose-900/20
                       rounded-lg transition-colors"
          >
            <X size={14} />
            Reset
          </button>
        )}
      </div>

      {/* Row 2: Dropdowns */}
      <div className="flex flex-wrap gap-2">
        {[
          {
            value: filters.type,
            onChange: (v) => setFilter('type', v),
            options: [
              { value: 'all',     label: 'All Types' },
              { value: 'income',  label: 'Income'    },
              { value: 'expense', label: 'Expense'   },
            ]
          },
          {
            value: filters.category,
            onChange: (v) => setFilter('category', v),
            options: [
              { value: 'all', label: 'All Categories' },
              ...categories.map(c => ({ value: c, label: c }))
            ]
          },
          {
            value: filters.sortBy,
            onChange: (v) => setFilter('sortBy', v),
            options: [
              { value: 'date-new',    label: 'Newest First'       },
              { value: 'date-old',    label: 'Oldest First'       },
              { value: 'amount-high', label: 'Amount: High to Low' },
              { value: 'amount-low',  label: 'Amount: Low to High' },
            ]
          }
        ].map((select, i) => (
          <select
            key={i}
            value={select.value}
            onChange={(e) => select.onChange(e.target.value)}
            className="text-sm border border-gray-200 dark:border-slate-600
                       rounded-lg px-3 py-2
                       bg-white dark:bg-slate-700
                       text-gray-700 dark:text-slate-200
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {select.options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        ))}
      </div>
    </div>
  )
}