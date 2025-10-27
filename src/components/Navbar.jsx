import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, Shield, LogOut, User, History } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, signOut } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('Signed out successfully')
      navigate('/')
    } catch (error) {
      toast.error('Failed to sign out')
    }
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-soft border-b border-slate-200/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo with Gradient */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-500/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Shield className="relative w-8 h-8 text-primary-600 group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
              Fact Checker
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                isActive('/') 
                  ? 'text-primary-600' 
                  : 'text-slate-700 hover:text-primary-600'
              }`}
            >
              Home
              {isActive('/') && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-600 to-teal-600 rounded-full" />
              )}
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`relative flex items-center space-x-1.5 px-3 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive('/dashboard')
                      ? 'text-primary-600'
                      : 'text-slate-700 hover:text-primary-600'
                  }`}
                >
                  <History className="w-4 h-4" strokeWidth={2} />
                  <span>Dashboard</span>
                  {isActive('/dashboard') && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-600 to-teal-600 rounded-full" />
                  )}
                </Link>

                <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-slate-200">
                  {/* User Info with Subtle Background */}
                  <div className="flex items-center space-x-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200/60">
                    <div className="p-1.5 bg-primary-100 rounded-full">
                      <User className="w-3.5 h-3.5 text-primary-600" strokeWidth={2} />
                    </div>
                    <span className="text-sm text-slate-700 font-medium">{user.email}</span>
                  </div>
                  
                  {/* Sign Out Button - Modern Style */}
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-slate-600 to-slate-700 text-white text-sm font-medium rounded-lg hover:from-slate-700 hover:to-slate-800 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <LogOut className="w-4 h-4" strokeWidth={2} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-slate-200">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-sm font-medium rounded-lg hover:from-primary-700 hover:to-primary-600 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button with enhanced styling */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors duration-300"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-slate-700" strokeWidth={2} />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" strokeWidth={2} />
            )}
          </button>
        </div>

        {/* Mobile Navigation with Smooth Animation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-slate-200/60">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                isActive('/')
                  ? 'bg-primary-50 text-primary-600 border border-primary-200/60'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive('/dashboard')
                      ? 'bg-primary-50 text-primary-600 border border-primary-200/60'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <History className="w-4 h-4" strokeWidth={2} />
                  <span>Dashboard</span>
                </Link>

                {/* User Section with Modern Design */}
                <div className="px-4 py-3 mt-4 border-t border-slate-200">
                  <div className="flex items-center space-x-2 mb-3 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200/60">
                    <div className="p-1.5 bg-primary-100 rounded-full">
                      <User className="w-3.5 h-3.5 text-primary-600" strokeWidth={2} />
                    </div>
                    <span className="text-sm text-slate-700 font-medium">{user.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleSignOut()
                      setIsOpen(false)
                    }}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-slate-600 to-slate-700 text-white text-sm font-medium rounded-lg hover:from-slate-700 hover:to-slate-800 transition-all duration-300 shadow-sm"
                  >
                    <LogOut className="w-4 h-4" strokeWidth={2} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-sm font-medium rounded-lg hover:from-primary-700 hover:to-primary-600 transition-all duration-300 text-center shadow-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}