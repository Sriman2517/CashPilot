import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'

// Pages (we'll create these next)
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Insights from './pages/insights'
import Settings from './pages/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="insights" element={<Insights />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}