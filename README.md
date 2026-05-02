# 🚗 MERN Carpooling Platform (waymate)

A scalable backend for a **carpooling platform** built using the MERN stack.  
This system allows users and agencies to create, join, and manage rides with advanced features like **group booking, bidding, and geolocation-based matching**.

---

## 📌 Features

### 👤 Users
- Register & Login (JWT Authentication)
- Create ride requests
- Join existing rides (user/agency)
- Leave rides
- View created & joined rides
- Group booking (create & join)
- Bid for cheaper rides
- Set ride preferences (gender, AC, etc.)
- Forgot & Reset Password

---

### 🏢 Ride Providers (Agencies)
- Create rides on routes
- View user demand (location-based)
- Accept or ignore group bookings
- Participate in bidding system
- Set ride preferences

---

### 📍 Core Functionalities
- Geo-based ride matching (origin & destination)
- Passenger management
- Seat availability tracking
- Role-based access (user / agency)
- Secure password reset system
- Ride search with filters (location, range, date)

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **JWT Authentication**
- **bcrypt (Password Hashing)**
- **Axios (Geocoding API)**

---

## 📂 Project Structure

```

project/
│
├── controllers/
│   ├── userController.js
│   ├── rideController.js
│
├── models/
│   ├── userModel.js
│   ├── rideModel.js
│
├── routes/
│   ├── userRoutes.js
│   ├── rideRoutes.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│
├── utils/
│   ├── geocode.js
│
├── server.js
└── .env

````

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/your-username/carpooling-backend.git

# Navigate to project
cd carpooling-backend

# Install dependencies
npm install

# Run server
npm run dev
````

---

## 🔐 Environment Variables (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

## 🔑 API Endpoints

### 🧑 Auth

```
POST   /api/users/register
POST   /api/users/login
POST   /api/users/forgot-password
POST   /api/users/reset-password/:token
```

---

### 👤 User

```
GET    /api/users/profile
PUT    /api/users/profile
GET    /api/users/my-rides
GET    /api/users/joined-rides
GET    /api/users/dashboard
```

---

### 🚗 Rides

```
POST   /api/rides/create
GET    /api/rides/:id
PUT    /api/rides/:id
DELETE /api/rides/:id

POST   /api/rides/search
POST   /api/rides/:id/join
POST   /api/rides/:id/leave
```

---

## 📍 Geolocation Matching

* Converts location names → coordinates using OpenStreetMap
* Matches rides within a given range
* Supports origin & destination filtering

---

## 🔐 Security

* Password hashing using bcrypt
* JWT-based authentication
* Protected routes
* Role-based authorization
* Secure password reset (token-based)

---

## 🚀 Future Enhancements

* Real-time ride tracking (WebSockets)
* Payment integration
* Rating & review system
* Notification system (email/SMS)
* Advanced route matching (polyline-based)
* Mobile app support

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create your feature branch
3. Commit changes
4. Push to branch
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Aswin**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

```

---

# 🚀 If You Want Next

I can also help you create:

- 📘 **:contentReference[oaicite:0]{index=0}**
- 🧪 **:contentReference[oaicite:1]{index=1}**
- 🐳 **:contentReference[oaicite:2]{index=2}**
- 🌐 **:contentReference[oaicite:3]{index=3}**

Just tell 👍
```
