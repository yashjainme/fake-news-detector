import { Shield, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300 mt-20">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-purple-500 to-teal-500" />
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Real-Time Fact Checker</span>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed max-w-md">
              Empowering truth with AI-powered fact verification. 
              Verify news claims instantly with intelligent analysis and real-time data.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://x.com/yashjainme"
                target='_blank' 
                className="p-2 bg-slate-800 hover:bg-primary-600 rounded-lg transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
             
              <a 
                href="#" 
                className="p-2 bg-slate-800 hover:bg-primary-600 rounded-lg transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-slate-800 hover:bg-primary-600 rounded-lg transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

         

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © {currentYear} Real-Time Fact Checker. All rights reserved.
            </p>
            <p className="text-slate-400 text-sm flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-error-500 fill-current" /> for truth seekers
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}