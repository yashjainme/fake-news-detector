import { useState, useEffect } from 'react'
import { Clock, Trash2, Loader2 } from 'lucide-react'
import { getClaimHistory, deleteClaim } from '../lib/api'
import toast from 'react-hot-toast'

export default function History() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    fetchHistory()
  }, [page])

  const fetchHistory = async () => {
    setLoading(true)
    try {
      const data = await getClaimHistory(page, 10)
      setHistory(data.claims)
      setTotal(data.total)
    } catch (error) {
      toast.error('Failed to load history')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (claimId) => {
    if (!confirm('Are you sure you want to delete this claim?')) return

    try {
      await deleteClaim(claimId)
      toast.success('Claim deleted')
      fetchHistory()
    } catch (error) {
      toast.error('Failed to delete claim')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Verification History</h2>
      
      {history.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
          No verification history yet. Start by checking a claim!
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <p className="text-gray-900 font-medium mb-2">{item.claim}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className={`px-3 py-1 rounded-full text-white ${
                      item.verdict.includes('True') ? 'bg-green-600' : 
                      item.verdict.includes('False') ? 'bg-red-600' : 'bg-gray-600'
                    }`}>
                      {item.verdict}
                    </span>
                    <span>{item.confidence}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {new Date(item.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-700 text-sm">{item.explanation}</p>
            </div>
          ))}
          
          <div className="flex justify-center gap-2 mt-6">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">Page {page} of {Math.ceil(total / 10)}</span>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={page >= Math.ceil(total / 10)}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
