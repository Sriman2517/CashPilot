import InsightCard from './InsightCard'
import { formatCurrency } from '../../utils/calculations'

export default function SpendingRatio({ insights }) {
  const { spendingRatio, currentExpenses, currentIncome } = insights
  const savingsAmount = currentIncome - currentExpenses
  const savingsRate = 100 - spendingRatio

  return (
    <InsightCard title="Income vs Spending">
      <div className="flex items-end gap-2 mb-2">
        <span className="text-4xl font-bold text-gray-800 dark:text-white">
          {spendingRatio}%
        </span>
        <span className="text-gray-500 dark:text-slate-400 text-sm mb-1">
          of income spent
        </span>
      </div>

      <div className="h-3 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden mb-4">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            spendingRatio > 80 ? 'bg-rose-500'
            : spendingRatio > 60 ? 'bg-amber-500'
            : 'bg-emerald-500'
          }`}
          style={{ width: `${Math.min(spendingRatio, 100)}%` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-3 text-center">
          <p className="text-xs text-indigo-500 dark:text-indigo-400 font-medium mb-1">
            Income
          </p>
          <p className="text-sm font-bold text-indigo-700 dark:text-indigo-300">
            {formatCurrency(currentIncome)}
          </p>
        </div>
        <div className="bg-rose-50 dark:bg-rose-900/20 rounded-xl p-3 text-center">
          <p className="text-xs text-rose-500 dark:text-rose-400 font-medium mb-1">
            Spent
          </p>
          <p className="text-sm font-bold text-rose-700 dark:text-rose-300">
            {formatCurrency(currentExpenses)}
          </p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3 text-center">
          <p className="text-xs text-emerald-500 dark:text-emerald-400 font-medium mb-1">
            Saved
          </p>
          <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
            {formatCurrency(savingsAmount)}
          </p>
        </div>
      </div>

      <div className={`
        mt-3 text-center text-sm font-medium py-2 rounded-xl
        ${savingsRate >= 30
          ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
          : savingsRate >= 15
          ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'
          : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400'
        }
      `}>
        {savingsRate >= 30
          ? `🎯 Great! You saved ${savingsRate.toFixed(1)}% this month`
          : savingsRate >= 15
          ? `📊 Decent savings rate of ${savingsRate.toFixed(1)}%`
          : `⚠️ Low savings rate — only ${savingsRate.toFixed(1)}% saved`
        }
      </div>
    </InsightCard>
  )
}