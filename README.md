# chat-app
# Intrtoduction

The Chat Application is a real-time messaging platform designed to facilitate seamless communication between users. Built using the MERN stack (MongoDB, Express.js, React.js, and Node.js), this application provides features like user authentication, real-time messaging, group chats, and message storage. With Socket.io, integrated for instant communication, this project showcases modern web technologies for a scalable and efficient chat experience.


# Project Overview
The application consists of two main components:

- Frontend: Developed using React.js, the frontend provides an intuitive user interface for real-time chat. It manages user authentication, chat rooms, and individual messaging.

- Backend: Powered by Express.js and Node.js, the backend handles authentication, user management, message storage, and WebSocket connections. MongoDB serves as the database for storing user details and chat history.



# Key Features

- User Authentication: Secure user registration, login, and authentication using JWT and bcrypt.

- Real-Time Messaging: Instant communication using WebSockets (Socket.io).

- Message Storage: Chat history is stored in MongoDB for future reference.

- Global State Management: Zustand ensures efficient state handling for chat data.

- Security Measures: Includes token validation, password hashing, and CORS configuration.



## Technologies Used

- **Frontend:**
  - [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
  - [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)
  - [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  - [React.js](https://reactjs.org/)
  - [Zustand](https://zustand-demo.pmnd.rs/)
  - [Shadcn-ui]((https://ui.shadcn.com/))

- **Backend:**
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)  - 
  - [Socket.io](https://socket.io/)

- **Database:**
  - [MongoDB](https://www.mongodb.com/)

- **Other Tools:**
  - [GitHub](https://github.com/)
  - [VSCode](https://code.visualstudio.com/)


# State Management

How Zustand is Used for API Integration and Managing Global State

- Zustand Store: Zustand is used to maintain user authentication state, chat messages, and active user lists.

- Socket Integration: Real-time messages are managed using Zustand actions combined with Socket.io events.

- Simplified State Management: Zustand eliminates unnecessary boilerplate while keeping state updates efficient.


## Setup Instructions

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) 
- [npm](https://www.npmjs.com/) 
- [MongoDB](https://www.mongodb.com/) 

**Backend Setup**

Clone the repository:
```
git clone https://github.com/Disha-1751999/chat-app.git
```

Navigate to the backend directory:
```
cd backend
```

Install dependencies:
```
npm install
```

Create a .env file with the following variables:
```
PORT= 5000
JWT_KEY='eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTczOTIxMTE4NiwiaWF0IjoxNzM5MjExMTg2fQ.1kKRHyo8dM7HwlNjQTeJK1wHBP4m8Q_s1_ulN3mTS3I'
DATABASE='mongodb+srv://dishadas:dishadas@cluster0.usln4.mongodb.net/chat-app?retryWrites=true&w=majority'
ORIGIN='http://localhost:5173'

```

Start the server:
```
nodemon index.js
```


**Frontend Setup**

Navigate to the frontend directory:
```
cd frontend
```

Install dependencies:
```
npm install
```

Create a .env file with the following variables:
```
VITE_SERVER_URL='http://localhost:5000'

```

Start the server:
```
npm run dev
```


## Security Measures



- Password Hashing:

User passwords are hashed using bcrypt before storing them in the database.

- Token Validation:

JWT tokens are used for authentication and authorization.

Tokens are validated using middleware to ensure access to protected routes.

- Input Validation:

Data inputs are sanitized and validated to prevent SQL injection and XSS attacks.

- CORS:

Configured CORS to allow only the client domain access to the API.



# DEMO

## Login Register Page
![Login Register](https://github.com/Disha-1751999/task-manager-/blob/main/client/public/asset/register.PNG)
## Login Page
![Login](https://github.com/Disha-1751999/task-manager-/blob/main/client/public/asset/login.PNG)
## Home Page
![Home](https://github.com/Disha-1751999/task-manager-/blob/main/client/public/asset/home.PNG)
## Task Create Page
![Task Create](https://github.com/Disha-1751999/task-manager-/blob/main/client/public/asset/create.PNG)



    
