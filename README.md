# Chat App

A modern, real-time chat application built with React, Node.js, and Socket.io. Features include user authentication, real-time messaging, file uploads, and a beautiful dark theme UI.

## 🚀 Features

- **Real-time Messaging**: Instant messaging with Socket.io
- **User Authentication**: Secure login/register with JWT tokens
- **File Upload**: Image and file sharing via Cloudinary
- **Dark Theme**: Modern, responsive dark UI with Tailwind CSS
- **Online Status**: See who's online in real-time
- **Message Alignment**: Proper left/right message bubble alignment
- **User Search**: Find and connect with other users
- **Profile Management**: Update profile picture and user details
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - UI framework
- **Vite 7.0.4** - Build tool and dev server
- **Tailwind CSS v4** - Styling framework
- **Redux Toolkit** - State management
- **React Router DOM** - Navigation
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Moment.js** - Date formatting

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.io** - Real-time communication
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Cloud Services
- **Cloudinary** - File upload and storage

## 📁 Project Structure

```
chatApp/
├── backend/
│   ├── config/
│   │   └── connectDB.js         # Database connection
│   ├── controller/
│   │   ├── checkEmail.js        # Email validation
│   │   ├── checkPassword.js     # Password validation
│   │   ├── logout.js            # User logout
│   │   ├── registerUser.js      # User registration
│   │   ├── searchUser.js        # User search
│   │   ├── updateUserDetails.js # Profile updates
│   │   └── userDetails.js       # Get user details
│   ├── helpers/
│   │   ├── getConversation.js   # Chat conversation logic
│   │   └── getUserDetailsFromToken.js # JWT token validation
│   ├── models/
│   │   ├── ConversationModel.js # Chat conversation schema
│   │   └── UserModel.js         # User schema
│   ├── routes/
│   │   └── index.js             # API routes
│   ├── socket/
│   │   └── index.js             # Socket.io configuration
│   ├── index.js                 # Server entry point
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Avatar.jsx           # User avatar component
    │   │   ├── Divider.jsx          # UI divider
    │   │   ├── EditUserDetails.jsx  # Profile edit modal
    │   │   ├── Loading.jsx          # Loading spinner
    │   │   ├── MessagePage.jsx      # Chat interface
    │   │   ├── SearchUser.jsx       # User search component
    │   │   ├── Sidebar.jsx          # Chat sidebar
    │   │   └── UserSearchCard.jsx   # User search result card
    │   ├── helpers/
    │   │   └── UploadFile.jsx       # Cloudinary file upload
    │   ├── layout/
    │   │   └── Index.jsx            # Auth layout wrapper
    │   ├── pages/
    │   │   ├── CheckEmailPage.jsx   # Email verification
    │   │   ├── CheckPasswordPage.jsx # Password verification
    │   │   ├── Forgotpassword.jsx   # Password reset
    │   │   ├── Home.jsx             # Main chat page
    │   │   └── RegisterPage.jsx     # User registration
    │   ├── redux/
    │   │   ├── Store.jsx            # Redux store
    │   │   └── UserSlice.jsx        # User state management
    │   ├── routes/
    │   │   └── Index.jsx            # Frontend routing
    │   ├── App.jsx                  # Main app component
    │   └── main.jsx                 # App entry point
    ├── package.json
    └── vite.config.js
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account for file uploads

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chatApp
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Variables

1. **Backend (.env)**
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET_KEY=your_jwt_secret_key
   PORT=8080
   ```

2. **Frontend (.env)**
   ```env
   VITE_APP_BACKEND_URL=http://localhost:8080
   VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   ```

### Cloudinary Setup

1. Create a [Cloudinary account](https://cloudinary.com/)
2. Go to Settings → Upload → Upload presets
3. Create an unsigned upload preset named `chat-app-file`
4. Add your cloud name to the frontend `.env` file

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server will run on `http://localhost:8080`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## 🎨 Features Overview

### Authentication Flow
- Email-based registration and login
- JWT token authentication
- Secure password hashing with bcryptjs
- Automatic logout on token expiration

### Real-time Chat
- Instant messaging with Socket.io
- Message delivery status
- Online/offline user status
- Message history persistence

### File Upload
- Image and file sharing
- Cloudinary integration for cloud storage
- Automatic image optimization
- Error handling for failed uploads

### UI/UX
- Modern dark theme design
- Responsive layout for all devices
- Smooth animations and transitions
- Toast notifications for user feedback
- Centered authentication pages
- Adjacent sidebar and message sections

## 🔧 Scripts

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Frontend
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

**Happy Chatting! 💬**
