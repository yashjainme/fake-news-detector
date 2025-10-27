# 📰 Fake News Detector - Frontend

AI-powered fact-checking application with intelligent caching and real-time verification


## 🌟 Features

- **Real-time Fact Checking**: Verify news claims instantly using AI-powered analysis
- **Intelligent Caching**: Smart cache system with fuzzy matching for faster results (70-90% faster for similar queries)
- **User Authentication**: Secure email/password authentication with Supabase
- **Verification History**: Track and manage your fact-checking history
- **Responsive Design**: Beautiful, mobile-friendly UI built with Tailwind CSS
- **Protected Routes**: Secure dashboard access for authenticated users

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Installation

```bash
# Clone the repository
git clone https://github.com/yashjainme/fake-news-detector.git


# Install dependencies
npm install


```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:8000
```

### Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`



## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ClaimVerifier.jsx
│   │   ├── History.jsx
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/              # Page components
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SignUpPage.jsx
│   │   └── DashboardPage.jsx
│   ├── lib/                # Utilities & API clients
│   │   ├── supabase.js
│   │   └── api.js
│   ├── store/              # State management
│   │   └── authStore.js
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite ** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Zustand** - Lightweight state management
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications

### Authentication & Database
- **Supabase** - Backend-as-a-Service
  - Authentication (Email/Password)
  - PostgreSQL Database
  - Row Level Security (RLS)

## 🔧 Backend Information

The backend API is hosted separately and provides the core fact-checking functionality.

**Backend Repository**: [https://huggingface.co/spaces/yashjainme/fake-news-detector](https://huggingface.co/spaces/yashjainme/fake-news-detector)

### Backend Tech Stack
- **FastAPI** - Modern Python web framework
- **Gemini AI API** - Google's generative AI with search grounding
- **Redis** - In-memory caching for query optimization
- **Supabase** - Database & authentication
- **Python 3.10+** - Programming language

### Backend Features
- Google Search Grounding for fact verification
- Rate limiting with exponential backoff
- Intelligent cache manager with fuzzy matching (85% similarity threshold)
- RESTful API endpoints
- JWT-based authentication
- Automatic retry logic for API resilience

### API Endpoints

```
POST   /auth/signup          - Register new user
POST   /auth/signin          - Authenticate user
POST   /auth/signout         - Sign out user
POST   /claims/verify        - Verify a news claim
GET    /claims/history       - Get user's verification history
DELETE /claims/{claim_id}    - Delete a claim from history
```

## 🎨 Key Components

### ClaimVerifier
Main component for claim verification with real-time feedback and cache indicators.

### History
Displays user's past verifications with pagination and delete functionality.

### ProtectedRoute
HOC for securing authenticated routes.

### Navbar
Responsive navigation with authentication state management.

## 🔒 Authentication Flow

1. User signs up with email/password
2. Email verification sent by Supabase
3. User signs in and receives JWT token
4. Token stored in localStorage and sent with API requests
5. Protected routes accessible only when authenticated

## 📊 Caching Strategy

The application implements intelligent caching:
- **Exact Match**: Instant results from cache
- **Fuzzy Match**: 85%+ similarity returns cached results
- **Cache Duration**: 24 hours (configurable)
- **Performance**: 70-90% reduction in API calls

## 🎯 Usage

1. **Home Page**: Enter a news claim to verify without authentication
2. **Sign Up**: Create an account to save verification history
3. **Dashboard**: 
   - Verify claims with saved history
   - View past verifications
   - Delete old claims



- Backend: [HuggingFace Space](https://huggingface.co/spaces/yashjainme/fake-news-detector)

## 🙏 Acknowledgments

- Google Gemini AI for fact-checking capabilities
- Supabase for authentication and database services
- Tailwind CSS for the beautiful UI components

***

