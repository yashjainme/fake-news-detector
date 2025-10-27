import { useState, useEffect } from 'react'
import ClaimVerifier from '../components/ClaimVerifier'

import { Shield, Search, Database, Zap, TrendingUp, CheckCircle2, Clock } from 'lucide-react'

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="space-y-16 overflow-hidden">
      {/* Hero Section with Refined Gradient */}
      <section className="relative text-center py-20 px-4">
        {/* Subtle Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-slate-50 to-purple-50 opacity-50 -z-10" />
        
        {/* Floating Decorative Elements - More Subtle */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-teal-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
        
        <div className={`relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Animated Icon with Subtle Glow */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-500/30 rounded-full blur-2xl opacity-40 animate-pulse" />
              <Shield className="relative w-24 h-24 text-primary-600 animate-float" />
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-teal-600 mb-6 leading-tight">
            Real-Time Fact Checker
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-700 max-w-3xl mx-auto mb-8 font-light leading-relaxed">
            Verify news claims instantly with{' '}
            <span className="font-semibold text-primary-600">AI-powered intelligence</span>,{' '}
            Google Search grounding, and smart caching
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600 mb-8">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-success-500" />
              <span>98% Accurate</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <Clock className="w-4 h-4 text-primary-500" />
              <span>&lt;10s Response</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <TrendingUp className="w-4 h-4 text-teal-500" />
              <span>Real-time Data</span>
            </div>
          </div>
        </div>
      </section>


      {/* Main Verifier with Enhanced Styling */}
      <section className="relative">
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <ClaimVerifier />
        </div>
      </section>


      {/* Features Section with Cards */}
      <section className="py-16 px-4">
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Powered by cutting-edge AI technology to deliver accurate fact-checking
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature Card 1 */}
            <div className="group relative bg-gradient-to-br from-white to-primary-50/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-primary-100/50">
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_30px_rgba(44,95,141,0.15)]" />
              
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Search className="w-12 h-12 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-slate-900">AI-Powered Analysis</h3>
              <p className="text-slate-600 leading-relaxed">
                Advanced Gemini AI analyzes claims using real-time web search 
                and fact-checking databases for unparalleled accuracy
              </p>
            </div>


            {/* Feature Card 2 */}
            <div className="group relative bg-gradient-to-br from-white to-purple-50/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-purple-100/50">
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_30px_rgba(124,58,237,0.15)]" />
              
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Database className="w-12 h-12 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Intelligent Caching</h3>
              <p className="text-slate-600 leading-relaxed">
                Smart cache system with fuzzy matching provides instant results 
                for similar claims, saving time and resources
              </p>
            </div>


            {/* Feature Card 3 */}
            <div className="group relative bg-gradient-to-br from-white to-teal-50/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-teal-100/50">
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_30px_rgba(20,184,166,0.15)]" />
              
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-12 h-12 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Instant Verification</h3>
              <p className="text-slate-600 leading-relaxed">
                Get detailed verdicts with confidence scores and source citations 
                in seconds, not minutes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Component */}
      
    </div>
  )
}