// import { useState } from 'react'
// import { CheckCircle, XCircle, AlertCircle, Loader2, Clock } from 'lucide-react'
// import { verifyClaimAPI } from '../lib/api'
// import toast from 'react-hot-toast'

// const verdictConfig = {
//   'True': { color: 'green', icon: CheckCircle, bg: 'bg-green-50', border: 'border-green-500' },
//   'Likely True': { color: 'blue', icon: CheckCircle, bg: 'bg-blue-50', border: 'border-blue-500' },
//   'Unverified': { color: 'gray', icon: AlertCircle, bg: 'bg-gray-50', border: 'border-gray-500' },
//   'Likely False': { color: 'orange', icon: XCircle, bg: 'bg-orange-50', border: 'border-orange-500' },
//   'False': { color: 'red', icon: XCircle, bg: 'bg-red-50', border: 'border-red-500' },
// }

// export default function ClaimVerifier() {
//   const [claim, setClaim] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [result, setResult] = useState(null)

//   /**
//    * Sanitize user input to prevent issues with special characters
//    * while preserving legitimate newlines and readability
//    */
//   const sanitizeInput = (input) => {
//     if (!input || typeof input !== 'string') return ''
    
//     // Trim leading and trailing whitespace
//     let sanitized = input.trim()
    
//     // Remove null bytes and dangerous control characters (but keep \n, \r, \t)
//     // \x00-\x08: null to backspace
//     // \x0B: vertical tab
//     // \x0C: form feed
//     // \x0E-\x1F: shift out to unit separator
//     // \x7F: delete
//     sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    
//     // Normalize line breaks to \n (handles Windows \r\n, old Mac \r, Unix \n)
//     sanitized = sanitized.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
    
//     // Remove excessive consecutive newlines (more than 2 in a row)
//     sanitized = sanitized.replace(/\n{3,}/g, '\n\n')
    
//     // Replace multiple consecutive spaces with single space (but preserve newlines)
//     sanitized = sanitized.replace(/[^\S\n]+/g, ' ')
    
//     return sanitized
//   }

//   /**
//    * Validate claim length and content
//    */
//   const validateClaim = (claimText) => {
//     const sanitized = sanitizeInput(claimText)
    
//     if (!sanitized || sanitized.length < 10) {
//       return { valid: false, error: 'Claim must be at least 10 characters long' }
//     }
    
//     if (sanitized.length > 5000) {
//       return { valid: false, error: 'Claim cannot exceed 5000 characters' }
//     }
    
//     // Check if claim contains at least some alphanumeric characters
//     if (!/[a-zA-Z0-9]/.test(sanitized)) {
//       return { valid: false, error: 'Claim must contain alphanumeric characters' }
//     }
    
//     return { valid: true, sanitized }
//   }

//   /**
//    * Handle input change with length limit
//    */
//   const handleInputChange = (e) => {
//     const value = e.target.value
    
//     // Allow raw input but limit length
//     if (value.length <= 5000) {
//       setClaim(value)
//     }
//   }

//   /**
//    * Handle form submission
//    */
//   const handleVerify = async (e) => {
//     e.preventDefault()
    
//     // Validate and sanitize the claim
//     const validation = validateClaim(claim)
    
//     if (!validation.valid) {
//       toast.error(validation.error)
//       return
//     }

//     setLoading(true)
//     setResult(null)

//     try {
//       // Send sanitized claim to API
//       const data = await verifyClaimAPI(validation.sanitized)
      
//       // Validate API response structure
//       if (!data || typeof data !== 'object') {
//         throw new Error('Invalid response from server')
//       }
      
//       setResult(data)
      
//       // Show appropriate success message based on cache status
//       if (data.cache_hit === 'exact') {
//         toast.success('Result retrieved from cache (exact match)')
//       } else if (data.cache_hit === 'fuzzy') {
//         toast.success(`Similar claim found in cache (${data.similarity_score || 'high'} match)`)
//       } else {
//         toast.success('Claim verified successfully')
//       }
      
//     } catch (error) {
//       console.error('Verification error:', error)
      
//       // Handle specific error types
//       if (error.response) {
//         // Server responded with error status
//         const status = error.response.status
//         const message = error.response.data?.message || error.response.data?.detail
        
//         if (status === 400) {
//           toast.error(message || 'Invalid claim format')
//         } else if (status === 429) {
//           toast.error('Too many requests. Please try again later.')
//         } else if (status === 500) {
//           toast.error('Server error. Please try again.')
//         } else {
//           toast.error(message || 'Failed to verify claim')
//         }
//       } else if (error.request) {
//         // Request made but no response received
//         toast.error('Network error. Please check your connection.')
//       } else {
//         // Something else happened
//         toast.error(error.message || 'Failed to verify claim. Please try again.')
//       }
      
//     } finally {
//       setLoading(false)
//     }
//   }

//   /**
//    * Safely render URLs to prevent XSS
//    */
//   const renderSource = (source, idx) => {
//     if (!source || typeof source !== 'string') {
//       return null
//     }

//     try {
//       // Validate URL format
//       const url = new URL(source)
      
//       // Only allow http and https protocols
//       if (!['http:', 'https:'].includes(url.protocol)) {
//         return null
//       }
      
//       return (
//         <li key={idx}>
//           <a
//             href={source}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-primary-600 hover:underline text-sm break-all"
//           >
//             {source}
//           </a>
//         </li>
//       )
//     } catch (error) {
//       // Invalid URL, don't render it
//       console.warn('Invalid source URL:', source)
//       return null
//     }
//   }

//   return (
//     <div className="max-w-4xl mx-auto">
//       <form onSubmit={handleVerify} className="bg-white rounded-lg shadow-md p-6 mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Enter a news claim to fact-check
//         </label>
//         <textarea
//           value={claim}
//           onChange={handleInputChange}
//           placeholder="e.g., Scientists have discovered that drinking coffee reduces the risk of heart disease by 50%"
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
//           rows="4"
//           disabled={loading}
//           maxLength={5000}
//         />
        
//         <div className="mt-4 flex items-center justify-between">
//           <p className="text-sm text-gray-500">
//             {claim.length}/5000 characters
//           </p>
//           <button
//             type="submit"
//             disabled={loading || claim.trim().length < 10}
//             className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="w-4 h-4 animate-spin" />
//                 Verifying...
//               </>
//             ) : (
//               'Verify Claim'
//             )}
//           </button>
//         </div>
//       </form>

//       {result && (() => {
//         const config = verdictConfig[result.verdict] || verdictConfig['Unverified']
//         const IconComponent = config.icon
        
//         return (
//           <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${config.border}`}>
//             <div className="flex items-start gap-4">
//               <IconComponent className={`w-8 h-8 text-${config.color}-600 shrink-0`} />
              
//               <div className="flex-1">
//                 <div className="flex items-center justify-between mb-2">
//                   <h3 className="text-xl font-bold text-gray-900">
//                     {result.verdict || 'Unknown'}
//                   </h3>
//                   <span className="text-lg font-semibold text-gray-700">
//                     {result.confidence || 'N/A'}
//                   </span>
//                 </div>
                
//                 {result.cache_hit && result.cache_hit !== 'none' && (
//                   <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
//                     <Clock className="w-4 h-4" />
//                     <span>
//                       {result.cache_hit === 'exact' 
//                         ? 'Cached result (exact match)' 
//                         : `Similar cached result (${result.similarity_score || 'high match'})`}
//                     </span>
//                   </div>
//                 )}
                
//                 <p className="text-gray-700 mb-4 whitespace-pre-wrap">
//                   {result.explanation || 'No explanation available'}
//                 </p>
                
//                 {result.sources && result.sources.length > 0 && (
//                   <div>
//                     <h4 className="font-semibold text-gray-900 mb-2">
//                       Sources ({result.sources.length}):
//                     </h4>
//                     <ul className="space-y-1">
//                       {result.sources.map((source, idx) => renderSource(source, idx))}
//                     </ul>
//                   </div>
//                 )}

//                 {result.search_queries_used && result.search_queries_used.length > 0 && (
//                   <div className="mt-4 pt-4 border-t border-gray-200">
//                     <h4 className="font-semibold text-gray-900 mb-2 text-sm">
//                       Search Queries Used:
//                     </h4>
//                     <div className="flex flex-wrap gap-2">
//                       {result.search_queries_used.map((query, idx) => (
//                         <span 
//                           key={idx}
//                           className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
//                         >
//                           {query}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )
//       })()}
//     </div>
//   )
// }



















import { useState } from 'react'
import { CheckCircle, XCircle, AlertCircle, Loader2, Clock, ExternalLink, Sparkles } from 'lucide-react'
import { verifyClaimAPI } from '../lib/api'
import toast from 'react-hot-toast'

const verdictConfig = {
  'True': { color: 'green', icon: CheckCircle, bg: 'bg-green-50', border: 'border-green-500' },
  'Likely True': { color: 'blue', icon: CheckCircle, bg: 'bg-blue-50', border: 'border-blue-500' },
  'Unverified': { color: 'gray', icon: AlertCircle, bg: 'bg-gray-50', border: 'border-gray-500' },
  'Likely False': { color: 'orange', icon: XCircle, bg: 'bg-orange-50', border: 'border-orange-500' },
  'False': { color: 'red', icon: XCircle, bg: 'bg-red-50', border: 'border-red-500' },
}

// Example claims that users can click to test the system
const exampleClaims = [
  {
    text: "Drinking coffee reduces the risk of heart disease by 50%",
    category: "Health"
  },
  {
    text: "The Great Wall of China is visible from the moon",
    category: "Science"
  },
  {
    text: "Electric cars produce zero emissions",
    category: "Environment"
  },
  {
    text: "Humans only use 10% of their brain capacity",
    category: "Science"
  }
]

export default function ClaimVerifier() {
  const [claim, setClaim] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  /**
   * Sanitize user input to prevent issues with special characters
   * while preserving legitimate newlines and readability
   */
  const sanitizeInput = (input) => {
    if (!input || typeof input !== 'string') return ''
    
    let sanitized = input.trim()
    
    // eslint-disable-next-line no-control-regex
    sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    
    sanitized = sanitized.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
    
    sanitized = sanitized.replace(/\n{3,}/g, '\n\n')
    
    sanitized = sanitized.replace(/[^\S\n]+/g, ' ')
    
    return sanitized
  }

  /**
   * Validate claim length and content
   */
  const validateClaim = (claimText) => {
    const sanitized = sanitizeInput(claimText)
    
    if (!sanitized || sanitized.length < 10) {
      return { valid: false, error: 'Claim must be at least 10 characters long' }
    }
    
    if (sanitized.length > 5000) {
      return { valid: false, error: 'Claim cannot exceed 5000 characters' }
    }
    
    if (!/[a-zA-Z0-9]/.test(sanitized)) {
      return { valid: false, error: 'Claim must contain alphanumeric characters' }
    }
    
    return { valid: true, sanitized }
  }

  /**
   * Handle input change with length limit
   */
  const handleInputChange = (e) => {
    const value = e.target.value
    
    if (value.length <= 5000) {
      setClaim(value)
    }
  }

  /**
   * Handle clicking an example claim
   */
  const handleExampleClick = (exampleText) => {
    setClaim(exampleText)
    setResult(null)
  }

  /**
   * Handle form submission
   */
  const handleVerify = async (e) => {
    e.preventDefault()
    
    const validation = validateClaim(claim)
    
    if (!validation.valid) {
      toast.error(validation.error)
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const data = await verifyClaimAPI(validation.sanitized)
      
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid response from server')
      }
      
      setResult(data)
      
      if (data.cache_hit === 'exact') {
        toast.success('Result retrieved from cache (exact match)')
      } else if (data.cache_hit === 'fuzzy') {
        toast.success(`Similar claim found in cache (${data.similarity_score || 'high'} match)`)
      } else {
        toast.success('Claim verified successfully')
      }
      
    } catch (error) {
      console.error('Verification error:', error)
      
      if (error.response) {
        const status = error.response.status
        const message = error.response.data?.message || error.response.data?.detail
        
        if (status === 400) {
          toast.error(message || 'Invalid claim format')
        } else if (status === 429) {
          toast.error('Too many requests. Please try again later.')
        } else if (status === 500) {
          toast.error('Server error. Please try again.')
        } else {
          toast.error(message || 'Failed to verify claim')
        }
      } else if (error.request) {
        toast.error('Network error. Please check your connection.')
      } else {
        toast.error(error.message || 'Failed to verify claim. Please try again.')
      }
      
    } finally {
      setLoading(false)
    }
  }

  /**
   * Extract domain name from URL for display
   */
  const extractDomain = (url) => {
    try {
      const urlObj = new URL(url)
      let domain = urlObj.hostname.replace(/^www\./, '')
      
      if (domain.length > 30) {
        domain = domain.substring(0, 27) + '...'
      }
      
      return domain
    } catch {
      return 'Invalid URL'
    }
  }

  /**
   * Render source as a compact card with link
   */
  const renderSourceCard = (source, idx) => {
    if (!source || typeof source !== 'string') {
      return null
    }

    try {
      const url = new URL(source)
      
      if (!['http:', 'https:'].includes(url.protocol)) {
        return null
      }
      
      const domain = extractDomain(source)
      
      return (
        <a
          key={idx}
          href={source}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-all duration-200 hover:shadow-md hover:border-gray-300 text-sm"
        >
          <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-primary-600 shrink-0" />
          <span className="text-gray-700 group-hover:text-gray-900 truncate max-w-[200px]">
            {domain}
          </span>
        </a>
      )
    } catch (error) {
      console.warn('Invalid source URL:', source)
      return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleVerify} className="bg-white rounded-lg shadow-md p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter a news claim to fact-check
        </label>
        <textarea
          value={claim}
          onChange={handleInputChange}
          placeholder="e.g., Scientists have discovered that drinking coffee reduces the risk of heart disease by 50%"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          rows="4"
          disabled={loading}
          maxLength={5000}
        />
        
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {claim.length}/5000 characters
          </p>
          <button
            type="submit"
            disabled={loading || claim.trim().length < 10}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify Claim'
            )}
          </button>
        </div>

        {/* Example Claims Section */}
        {!result && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary-600" />
              <h4 className="text-sm font-medium text-gray-700">
                Try an example:
              </h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {exampleClaims.map((example, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleExampleClick(example.text)}
                  disabled={loading}
                  className="group px-3 py-2 bg-gradient-to-r from-primary-50 to-primary-100 hover:from-primary-100 hover:to-primary-200 border border-primary-200 rounded-lg transition-all duration-200 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-left"
                >
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide shrink-0">
                      {example.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 group-hover:text-gray-900 mt-1 line-clamp-2">
                    {example.text}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </form>

      {result && (() => {
        const config = verdictConfig[result.verdict] || verdictConfig['Unverified']
        const IconComponent = config.icon
        
        return (
          <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${config.border}`}>
            <div className="flex items-start gap-4">
              <IconComponent className={`w-8 h-8 text-${config.color}-600 shrink-0`} />
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {result.verdict || 'Unknown'}
                  </h3>
                  <span className="text-lg font-semibold text-gray-700">
                    {result.confidence || 'N/A'}
                  </span>
                </div>
                
                {result.cache_hit && result.cache_hit !== 'none' && (
                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>
                      {result.cache_hit === 'exact' 
                        ? 'Cached result (exact match)' 
                        : `Similar cached result (${result.similarity_score || 'high match'})`}
                    </span>
                  </div>
                )}
                
                <p className="text-gray-700 mb-4 whitespace-pre-wrap">
                  {result.explanation || 'No explanation available'}
                </p>
                
                {result.sources && result.sources.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Sources ({result.sources.length}):
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {result.sources.map((source, idx) => renderSourceCard(source, idx))}
                    </div>
                  </div>
                )}

                {result.search_queries_used && result.search_queries_used.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                      Search Queries Used:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {result.search_queries_used.map((query, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                        >
                          {query}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
