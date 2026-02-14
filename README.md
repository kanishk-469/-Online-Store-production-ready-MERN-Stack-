# 🛒 MERN Online Store — Full Stack E-Commerce Platform

[![React](https://img.shields.io/badge/React-19.1.1-blue?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.9.2-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-Framework-black?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)](https://mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

> A production-ready **full-stack scalable e-commerce web application** built using the **MERN Stack (MongoDB, Express, React, Node.js)** with **Razorpay Payment Gateway** **JWT** authentication, **Context API** ,**Redux Toolkit** state management, **protected routes**, and **optimized frontend performance**.

> Built with a clean **MVC-like architecture**, this REST API is ready to serve as the backbone for a real-time delivery application.

> This project is a fully functional shopping platform where users can browse products, add them to the cart, manage orders, and securely log in or sign up , **Seller** can manage thier products and orders all powered by **JWT Authentication** and **MongoDB Database**.

---

## 🌐 Live Demo

🎯 **[Frontend 🚀](https://hellou.in/onlinestore)**
🎯 **[Backend API 🚀](https://your-backend-link.onrender.com)**

---

## 🏪 Project Overview

**OnlineStore**, this is a fully functional e-commerce platform that demonstrates:

- 🧾 **User authentication** (Signup/Login via Firebase)
- 🛍️ **Product browsing and filtering**
- 🛒 **Add-to-cart and order management**
- 💳 **Persistent data storage** in Firebase Firestore
- ⚙️ **Global State Management** using Redux Toolkit

RESTful API design

- **JWT-based authentication**
- **Redux Toolkit async state management**
- **Optimized React performance**
- **Global loading handling**
- **Protected routes**
- **Order creation system**
- **Seller Dashboard**
- **Production-level project structure**

It is designed to reflect real-world scalable architecture used in modern web applications.

---

## 🖼️ Project Screenshots

- 🏠 Home Page:
  ![Home Page](./screenshots/1.png)

- Swagger API Documentation Page:
  ![Swagger API Doc](./screenshots/2.png)

- Postman API Testing Tool:
  ![Postman Tool](./screenshots/3.png)

- 🛍️ Product Page:
  ![Product Page](./screenshots/4.png)

- 🛒 Cart Page:
  ![Cart Page](./screenshots/5.png)

- 📦 Order Page:
  ![Order Page](./screenshots/5.png)

- 🔐 Login & Register Pages:
  ![Login Page](./screenshots/7.png)

---

## ✨ Key Features

### 🔐 Authentication (JWT-Based)

- User registration & login & reset
- Password hashing using bcrypt
- JWT token generation & verification
- Axios interceptor for automatic token attachment
- Protected routes (frontend & backend)

### 🛍 Product Management

- Fetch products from MongoDB
- Async API handling using createAsyncThunk
- Pagination & filtering support
- Debounced search functionality
- Optimized rendering with useMemo & useCallback

### 🛒 Shopping Cart

- Add / Remove items
- Quantity updates
- Cart persistence using localStorage
- Redux-managed state
- Toast notifications for user feedback

### 📦 Order System

- Create order from cart
- Protected checkout route
- Order storage in MongoDB
- Clear cart after successful order

### 🚀 Modern State Management with Redux Toolkit

- Used **createSlice()** for reducers and actions.
- Used **createAsyncThunk()** for Node API calls.
- Application-level state handled globally with Redux Store.

### 🎨 UI/UX Enhancements

- Dark / Light Theme (Context API)
- Global loading spinner
- Skeleton loading UI
- Toast notifications (React Toastify)
- CSS Modules for scoped styling

### ⚠️ Error Handling

- Dedicated **Error Page** component for handling route or API failures.
- Displays a user-friendly message if a route doesn’t exist.

### ⚡ Optimized with Vite

- Project initialized using **Vite**, providing:

  - Lightning-fast development server
  - Lightweight build setup
  - Better developer experience

  ### 💌 Email Notifications

- Sends emails for:

  - New user signup
  - Order placement
  - Password reset (if implemented)

- Configured using **Nodemailer + Gmail SMTP**.

### ⚙️ General Features

- Environment-based configuration using `.env`.
- Centralized error handling with a custom middleware.
- Structured logging using middleware.
- Follows **RESTful API** design principles.
- **Postman** used for API testing and validation.

---

## 🧱 Folder Structure || 🧱 Project Architecture (MVC Inspired)

```
online-store/
│
├── client/                  # React Frontend
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── custom_hooks/
│   │   └── pages/
|   |   |── redux/
|   |   └── utils/
│   └── package.json
│
├── server/                  # Express Backend
│   ├── src/
│   │   ├── config/          # Mongoose ODM
│   │   ├── error-handler/
│   │   ├── features/
│   │   ├── middlewares/
│   │   ├── utils/
│   ├── uploads/
|   ├──package.json
|   └── server.js
│
└── README.md

```

---

## ⚙️ Tech Stack

| Category               | Technology Used          |
| ---------------------- | ------------------------ |
| **Frontend Framework** | ReactJS (with Vite)      |
| **State Management**   | Redux Toolkit            |
| **Runtime**            | Node.js + Express        |
| **Database**           | MongoDB + Mongoose       |
| **Authentication**     | JWT + Bcrypt             |
| **Routing**            | React Router DOM v7      |
| **Notifications**      | React Toastify           |
| **Styling**            | CSS Modules              |
| **Build Tool**         | Vite                     |
| **Language**           | JavaScript (ES6+)        |
| **API Client**         | Axios Library            |
| **Mail Service**       | Nodemailer               |
| **Environment Config** | dotenv                   |
| **Testing Tool**       | Postman                  |
| **Logging**            | Custom logger middleware |

---

## 🔌 API Endpoints Overview

| Module      | Method | Endpoint                                 | Description                     |
| ----------- | ------ | ---------------------------------------- | ------------------------------- |
| **User**    | POST   | `/api/users/signup`                      | Register a new user             |
|             | POST   | `/api/users/signin`                      | User login and token generation |
|             | GET    | `/api/users/resetPassword`               | Fetch logged-in user info       |
| **Product** | GET    | `/api/products/`                         | Get all products (with filters) |
|             | POST   | `/api/products/`                         | Create new product              |
|             | PUT    | `/api/products/product/:id`              | Update product details          |
| **Seller**  | GET    | `/api/sellers/products/:sellerId`        | seller get all products         |
|             | PUT    | `/api/sellers/products/:productId`       | seller Update product details   |
|             | GET    | `/api/sellers/products/:productId/stock` | seller can update Product Stock |

> SO ON..

---

## 🧠 Core Redux Implementation

- 🔁 Example: Async Fetch with createAsyncThunk

```bash
// 🔥 FETCH PRODUCTS
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { dispatch, rejectWithValue }) => {

    try {
      dispatch(startLoading()); //  START GLOBAL LOADING

      const response = await axios.get("/products");

      dispatch(stopLoading()); //  STOP GLOBAL LOADING

      return response.data;
    } catch (error) {
      dispatch(stopLoading()); //  STOP EVEN ON ERROR
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

```

## ⚙️ Example Slice

```bash
const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload;
        state.error = action.error.message;
      });
  },
});

```

## 🧩 Store Configuration

```bash
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    products: productReducer, // key must match selector
    pageLoading: pageLoadingReducer,
  },
});


```

---

## 🧠 Architecture Highlights

- Clean separation between frontend and backend
- Feature-based Redux slice structure
- Async thunks for API calls
- Global loading handler using matcher
- Axios request interceptor for JWT auto-attach
- Modular Express route architecture
- Centralized error handling middleware

---

## 🧩 Environment Variables for Server

Create a `.env` file in your root or `/backend/config` directory and define the following keys:

```
PORT = 8080
DB_URL=mongodb://127.0.0.1:27017/onlineStore
 <!-- DB_URL=mongodb+srv://kanishksingh123:ORxODCoyuHvUI3QfvrS@cluster0.2hhsq0b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/onlineStore -->

JWT_SECRET=KKJXxpGMjGFerPCUGXdt89jOFZ6H47Vc
COOKIE_EXPIRES_IN=5

RAZORPAY_KEY_ID=rzp_test_UehSaq0Eaa7ILy
RAZORPAY_SECRET_KEY=WIys1AqJ2aoR3M9gGIobypwM

EMAIL_USER=cnprojecttest@gmail.com
EMAIL_PASS=sdrk nglo mhcp rged


```

> 💡 For Gmail SMTP, enable “App Passwords” from your Google Account settings.

---

## 📈 Performance Optimizations

- useMemo for product filtering
- useCallback for event handlers
- Reselect for memoized selectors
- Debounced search input
- Global loader matcher pattern
- Code-splitting ready architecture

## 🛠 Future Enhancements

- Admin dashboard
- Wishlist system
- Role-based access control for Admin
- Dockerized deployment

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/kanishk-469/-Online-Store-production-ready-MERN-Stack-.git
cd Online-store

```

## 🔹 Backend Setup

```bash
cd server
npm install
```

### Create .env file

```bash
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
SO ON
```

### Run backend:

```bash
 nodemon server.js or node server.js
```

## 🔹 Frontend Setup

### Install Dependencies

```bash
cd client
npm install
```

### Run the App

```bash
npm run dev or npm start
```

Server runs on:
👉 `http://localhost:5173`
in your browser.

---

## 🎯 Highlights

- 🔄 Redux Toolkit Integration – Replaces Context API with structured state management.
- 🔥 Firebase Firestore – Real-time database for products and cart items.
- 🧭 React Router v7 – Seamless navigation between pages.
- 🧰 Error Handling Middleware – Custom logger middleware for Redux actions.
- 💡 Component-based architecture – Clean, modular, and maintainable structure.

---

## 🧭 Future Enhancements

- ✅ Add Wishlist and Favorites feature
- 🧾 Integrate Payment Gateway (Stripe)
- 🔐 Role-based access for Admin
- 📊 Dashboard for product analytics

---

## 👨‍💻 Author

**Kanishka Singh**  
 Full-Stack Web Developer | React Enthusiast | UI Recreator | Backend API creator
🌐 [GitHub](https://github.com/kanishk-469)  
💼 [LinkedIn](https://www.linkedin.com/in/kanishka-singh-14291157/)

---

> 🛒 _“Shop smart. Shop fast. Shop Online Store — powered by React, Context, Redux, Node and MongoDB.”_
