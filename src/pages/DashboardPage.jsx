import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import ClaimVerifier from '../components/ClaimVerifier'
import History from '../components/History'
import { FileText, History as HistoryIcon } from 'lucide-react'
import ProtectedRoute from '../components/ProtectedRoute'

function DashboardContent() {
  const [activeTab, setActiveTab] = useState('verify')
  const { user } = useAuthStore()

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome, {user?.user_metadata?.full_name || user?.email}
        </h1>
        <p className="text-gray-600">
          Verify claims and view your fact-checking history
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('verify')}
              className={`flex items-center gap-2 px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'verify'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FileText className="w-5 h-5" />
              Verify Claim
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'history'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <HistoryIcon className="w-5 h-5" />
              History
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'verify' ? <ClaimVerifier /> : <History />}
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
