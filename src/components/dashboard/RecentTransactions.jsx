import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useStore from '../../store/useStore'
import { categoryColors } from '../../data/mockData'

export default function RecentTransactions() {
  const transactions = useStore((s) => s.transactions)
  const navigate = useNavigate()

  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)

  const fmt = (n) => `₹${n.toLocaleString('en-IN')}`
  const fmtDate = (d) => new Date(d).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short'
  })

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-gray-800">Recent Transactions</h3>
          <p className="text-xs text-gray-400 mt-0.5">Last 5 transactions</p>
        </div>
        <button
          onClick={() => navigate('/transactions')}
          className="text-xs text-indigo-600 font-medium hover:underline"
        >
          View all →
        </button>
      </div>

      <div className="space-y-3">
        {recent.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Category color dot */}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${categoryColors[tx.category]}20` }}
              >
                {tx.type === 'income'
                  ? <ArrowUpRight size={16} className="text-emerald-600" />
                  : <ArrowDownRight size={16} style={{ color: categoryColors[tx.category] }} />
                }
              </div>

              <div>
                <p className="text-sm font-medium text-gray-800">{tx.merchant}</p>
                <p className="text-xs text-gray-400">{fmtDate(tx.date)} · {tx.category}</p>
              </div>
            </div>

            <span className={`text-sm font-semibold
              ${tx.type === 'income' ? 'text-emerald-600' : 'text-rose-500'}`}>
              {tx.type === 'income' ? '+' : '-'}{fmt(tx.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}