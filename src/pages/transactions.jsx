import { useState } from 'react'
import { Plus } from 'lucide-react'
import useStore from '../store/useStore'
import FiltersBar from '../components/transactions/FiltersBar'
import TransactionTable from '../components/transactions/TransactionTable'
import TransactionModal from '../components/transactions/TransactionModal'

export default function Transactions() {
  const { role } = useStore()
  const isAdmin = role === 'admin'
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Transactions
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">
            Track and manage all your financial activity
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600
                       hover:bg-indigo-700 text-white text-sm font-medium
                       rounded-xl transition-colors shadow-sm"
          >
            <Plus size={16} />
            Add Transaction
          </button>
        )}
      </div>

      {/* Viewer banner */}
      {!isAdmin && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border
                        border-amber-200 dark:border-amber-700/50
                        rounded-xl px-4 py-3">
          <p className="text-sm text-amber-700 dark:text-amber-400">
            👁 You are in <strong>Viewer mode</strong>.
            Switch to Admin to add, edit or delete transactions.
          </p>
        </div>
      )}

      {/* Filters */}
      <FiltersBar />

      {/* Table */}
      <TransactionTable />

      {/* Add Modal */}
      <TransactionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        editData={null}
      />

    </div>
  )
}