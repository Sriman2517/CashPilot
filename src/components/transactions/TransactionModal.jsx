import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import useStore from '../../store/useStore'
import { categories } from '../../data/mockData'

export default function TransactionModal({ isOpen, onClose, editData }) {
  const { addTransaction, editTransaction } = useStore()

  const empty = {
    date: '',
    merchant: '',
    category: 'Food',
    type: 'expense',
    amount: '',
    note: ''
  }

  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editData) {
      setForm(editData)
    } else {
      setForm(empty)
    }
    setErrors({})
  }, [editData, isOpen])

  const validate = () => {
    const e = {}
    if (!form.date) e.date = 'Date is required'
    if (!form.merchant.trim()) e.merchant = 'Merchant is required'
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      e.amount = 'Enter a valid amount'
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length > 0) {
      setErrors(e)
      return
    }

    const data = { ...form, amount: Number(form.amount) }

    if (editData) {
      editTransaction(editData.id, data)
    } else {
      addTransaction(data)
    }

    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md z-10">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">
            {editData ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-4 space-y-4">

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.date && (
              <p className="text-rose-500 text-xs mt-1">{errors.date}</p>
            )}
          </div>

          {/* Merchant */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Merchant
            </label>
            <input
              type="text"
              placeholder="e.g. Swiggy, Salary Credit"
              value={form.merchant}
              onChange={(e) => setForm({ ...form, merchant: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.merchant && (
              <p className="text-rose-500 text-xs mt-1">{errors.merchant}</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (₹)
            </label>
            <input
              type="number"
              placeholder="e.g. 1500"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.amount && (
              <p className="text-rose-500 text-xs mt-1">{errors.amount}</p>
            )}
          </div>

          {/* Type + Category row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Note <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="Short description"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600
                       hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white
                       bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
          >
            {editData ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>

      </div>
    </div>
  )
}