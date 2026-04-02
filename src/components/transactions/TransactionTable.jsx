import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import useStore from '../../store/useStore'
import CategoryBadge from './CategoryBadge'
import TransactionModal from './TransactionModal'

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 bg-gray-100 dark:bg-slate-700
                      rounded-full flex items-center justify-center mb-4">
        <span className="text-2xl">🔍</span>
      </div>
      <h3 className="text-gray-700 dark:text-slate-200 font-semibold text-lg mb-1">
        No transactions found
      </h3>
      <p className="text-gray-400 dark:text-slate-500 text-sm">
        Try adjusting your filters or search term
      </p>
    </div>
  )
}

export default function TransactionTable() {
  const { role, getFilteredTransactions, deleteTransaction } = useStore()
  const transactions = getFilteredTransactions()
  const isAdmin = role === 'admin'

  const [editData, setEditData] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleEdit = (tx) => {
    setEditData(tx)
    setModalOpen(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Delete this transaction?')) {
      deleteTransaction(id)
    }
  }

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    })

  return (
    <>
      <div className="bg-white dark:bg-slate-800 rounded-2xl
                      border border-gray-100 dark:border-slate-700 overflow-hidden">

        {transactions.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-slate-700/50 border-b
                                 border-gray-100 dark:border-slate-700">
                    {['Date', 'Merchant', 'Category', 'Type', 'Amount',
                      ...(isAdmin ? ['Actions'] : [])
                    ].map((h, i) => (
                      <th
                        key={h}
                        className={`px-6 py-3 text-xs font-semibold
                                    text-gray-500 dark:text-slate-400
                                    uppercase tracking-wide
                                    ${i >= 4 ? 'text-right' : 'text-left'}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-slate-700/50">
                  {transactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className="hover:bg-gray-50 dark:hover:bg-slate-700/30
                                 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-slate-400">
                        {formatDate(tx.date)}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-800 dark:text-white">
                          {tx.merchant}
                        </p>
                        {tx.note && (
                          <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">
                            {tx.note}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <CategoryBadge category={tx.category} />
                      </td>
                      <td className="px-6 py-4">
                        <span className={`
                          inline-flex items-center px-2 py-0.5 rounded-full
                          text-xs font-medium capitalize
                          ${tx.type === 'income'
                            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                            : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400'
                          }
                        `}>
                          {tx.type}
                        </span>
                      </td>
                      <td className={`
                        px-6 py-4 text-right text-sm font-semibold
                        ${tx.type === 'income'
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-rose-500 dark:text-rose-400'
                        }
                      `}>
                        {tx.type === 'income' ? '+' : '-'}
                        ₹{tx.amount.toLocaleString('en-IN')}
                      </td>
                      {isAdmin && (
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEdit(tx)}
                              className="p-1.5 rounded-lg text-gray-400
                                         hover:text-indigo-600 hover:bg-indigo-50
                                         dark:hover:text-indigo-400 dark:hover:bg-indigo-900/20
                                         transition-colors"
                            >
                              <Pencil size={15} />
                            </button>
                            <button
                              onClick={() => handleDelete(tx.id)}
                              className="p-1.5 rounded-lg text-gray-400
                                         hover:text-rose-600 hover:bg-rose-50
                                         dark:hover:text-rose-400 dark:hover:bg-rose-900/20
                                         transition-colors"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-100 dark:divide-slate-700">
              {transactions.map((tx) => (
                <div key={tx.id} className="px-4 py-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 dark:text-white">
                        {tx.merchant}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">
                        {formatDate(tx.date)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <CategoryBadge category={tx.category} />
                        <span className={`
                          text-xs font-medium capitalize
                          ${tx.type === 'income'
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-rose-500 dark:text-rose-400'
                          }
                        `}>
                          {tx.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`
                        text-sm font-bold
                        ${tx.type === 'income'
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-rose-500 dark:text-rose-400'
                        }
                      `}>
                        {tx.type === 'income' ? '+' : '-'}
                        ₹{tx.amount.toLocaleString('en-IN')}
                      </span>
                      {isAdmin && (
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleEdit(tx)}
                            className="p-1.5 rounded-lg text-gray-400
                                       hover:text-indigo-600 dark:hover:text-indigo-400
                                       hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                          >
                            <Pencil size={13} />
                          </button>
                          <button
                            onClick={() => handleDelete(tx.id)}
                            className="p-1.5 rounded-lg text-gray-400
                                       hover:text-rose-600 dark:hover:text-rose-400
                                       hover:bg-rose-50 dark:hover:bg-rose-900/20"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <TransactionModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditData(null) }}
        editData={editData}
      />
    </>
  )
}