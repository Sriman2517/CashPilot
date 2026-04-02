import { useState } from 'react'
import { User, Shield, Trash2, Check } from 'lucide-react'
import useStore from '../store/useStore'
import { userProfile } from '../data/mockData'

function Section({ title, description, children }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl
                    border border-gray-100 dark:border-slate-700 p-6">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-gray-800 dark:text-white">
          {title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">
          {description}
        </p>
      </div>
      {children}
    </div>
  )
}

function Field({ label, value, type = 'text', disabled = false }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600
                        dark:text-slate-300 mb-1">
        {label}
      </label>
      <input
        type={type}
        defaultValue={value}
        disabled={disabled}
        className={`
          w-full border border-gray-200 dark:border-slate-600
          rounded-xl px-4 py-2.5 text-sm
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          ${disabled
            ? 'bg-gray-50 dark:bg-slate-700 text-gray-400 dark:text-slate-500 cursor-not-allowed'
            : 'bg-white dark:bg-slate-700 text-gray-800 dark:text-white'
          }
        `}
      />
    </div>
  )
}

export default function Settings() {
  const { role, setRole, transactions } = useStore()
  const [saved, setSaved] = useState(false)
  const [notifications, setNotifications] = useState({
    monthlyReport: true,
    budgetAlerts: true,
    largeTransactions: false
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const totalIncome = transactions
    .filter(tx => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0)

  const totalExpenses = transactions
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0)

  return (
    <div className="space-y-5 max-w-2xl">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Settings
        </h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">
          Manage your profile and preferences
        </p>
      </div>

      {/* Profile */}
      <Section
        title="Profile Information"
        description="Your personal details and account information"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl
                          flex items-center justify-center">
            <span className="text-white text-xl font-bold">
              {userProfile.avatar}
            </span>
          </div>
          <div>
            <p className="text-base font-semibold text-gray-800 dark:text-white">
              {userProfile.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              {userProfile.email}
            </p>
            <span className="inline-flex items-center mt-1 px-2 py-0.5
                             bg-indigo-50 dark:bg-indigo-900/30
                             text-indigo-600 dark:text-indigo-400
                             text-xs font-medium rounded-full">
              Member since Jan 2026
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full Name"     value={userProfile.name} />
          <Field label="Email Address" value={userProfile.email} type="email" />
          <Field label="Phone"         value="+91 7416995503" />
          <Field label="Location"      value="Sri City, Andhra Pradesh" />
        </div>

        <button
          onClick={handleSave}
          className={`
            mt-5 flex items-center gap-2 px-5 py-2.5 rounded-xl
            text-sm font-medium transition-all duration-200
            ${saved
              ? 'bg-emerald-500 text-white'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }
          `}
        >
          {saved ? <><Check size={15} /> Saved!</> : 'Save Changes'}
        </button>
      </Section>

      {/* Role */}
      <Section
        title="Role & Access"
        description="Control what actions are available in the dashboard"
      >
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setRole('viewer')}
            className={`
              p-4 rounded-xl border-2 text-left transition-all
              ${role === 'viewer'
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                : 'border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500'
              }
            `}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gray-100 dark:bg-slate-700
                              rounded-lg flex items-center justify-center">
                <User size={16} className="text-gray-600 dark:text-slate-300" />
              </div>
              {role === 'viewer' && (
                <span className="text-xs bg-indigo-600 text-white
                                 px-2 py-0.5 rounded-full font-medium">
                  Active
                </span>
              )}
            </div>
            <p className="text-sm font-semibold text-gray-800 dark:text-white">
              Viewer
            </p>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
              Read-only access. Can view all data but cannot modify transactions.
            </p>
          </button>

          <button
            onClick={() => setRole('admin')}
            className={`
              p-4 rounded-xl border-2 text-left transition-all
              ${role === 'admin'
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                : 'border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500'
              }
            `}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/40
                              rounded-lg flex items-center justify-center">
                <Shield size={16} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              {role === 'admin' && (
                <span className="text-xs bg-indigo-600 text-white
                                 px-2 py-0.5 rounded-full font-medium">
                  Active
                </span>
              )}
            </div>
            <p className="text-sm font-semibold text-gray-800 dark:text-white">
              Admin
            </p>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
              Full access. Can add, edit and delete transactions.
            </p>
          </button>
        </div>
      </Section>

      {/* Notifications */}
      <Section
        title="Notifications"
        description="Choose what updates you want to receive"
      >
        <div className="space-y-4">
          {[
            {
              key: 'monthlyReport',
              label: 'Monthly Report',
              sub: 'Get a summary of your finances at end of each month'
            },
            {
              key: 'budgetAlerts',
              label: 'Budget Alerts',
              sub: 'Alert when spending exceeds 80% of income'
            },
            {
              key: 'largeTransactions',
              label: 'Large Transactions',
              sub: 'Notify when a single transaction exceeds ₹5,000'
            }
          ].map(({ key, label, sub }) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-slate-200">
                  {label}
                </p>
                <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">
                  {sub}
                </p>
              </div>
              <button
                onClick={() =>
                  setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
                }
                className={`
                  relative w-11 h-6 rounded-full transition-colors duration-200
                  ${notifications[key] ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-slate-600'}
                `}
              >
                <span className={`
                  absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full
                  shadow transition-transform duration-200
                  ${notifications[key] ? 'translate-x-5' : 'translate-x-0'}
                `} />
              </button>
            </div>
          ))}
        </div>
      </Section>

      {/* Account Stats */}
      <Section
        title="Account Overview"
        description="A snapshot of your financial data in CashPilot"
      >
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {transactions.length}
            </p>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
              Total Transactions
            </p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 text-center">
            <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
              ₹{(totalIncome / 1000).toFixed(0)}k
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-500 mt-1">
              Total Income
            </p>
          </div>
          <div className="bg-rose-50 dark:bg-rose-900/20 rounded-xl p-4 text-center">
            <p className="text-lg font-bold text-rose-700 dark:text-rose-400">
              ₹{(totalExpenses / 1000).toFixed(0)}k
            </p>
            <p className="text-xs text-rose-500 dark:text-rose-400 mt-1">
              Total Expenses
            </p>
          </div>
        </div>
      </Section>

      {/* Danger Zone */}
      <Section
        title="Danger Zone"
        description="Irreversible actions — proceed with caution"
      >
        <div className="border border-rose-200 dark:border-rose-700/50
                        bg-rose-50 dark:bg-rose-900/20 rounded-xl p-4
                        flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-rose-700 dark:text-rose-400">
              Reset All Data
            </p>
            <p className="text-xs text-rose-500 dark:text-rose-400/70 mt-0.5">
              Clears all transactions and resets to default mock data
            </p>
          </div>
          <button
            onClick={() => {
              if (window.confirm('Reset all data to defaults? This cannot be undone.')) {
                localStorage.removeItem('cashpilot-storage')
                window.location.reload()
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-rose-600
                       hover:bg-rose-700 text-white text-sm font-medium
                       rounded-lg transition-colors"
          >
            <Trash2 size={14} />
            Reset
          </button>
        </div>
      </Section>

    </div>
  )
}