 🚗 waymate – Smart Carpooling Platform

<p align="center">
  <img src="frontend/public/waymate_standalone_icon.png" alt="waymate icon" width="200"/>
</p>

<p align="center">
  <img src="frontend/public/waymate_wordmark_logo.png" alt="waymate wordmark" width="200"/>
</p>

---

# ✨ Features

## 👤 Users

* Create ride requests
* Join rides created by users & agencies
* Create & join group bookings
* Bid for cheaper rides 💰
* Set travel preferences (AC, gender, timing, etc.)
* View ride history & dashboard

---

## 🏢 Ride Providers (Agencies)

* Create rides on specific routes
* View user demand on routes 📍
* Accept or reject group bookings
* Participate in bidding system
* Set ride preferences

---

## 🔍 Smart Matching

* Location-based ride search (Geo matching)
* Route-based pickup & destination matching
* Nearby ride discovery

---

# 🛠️ Tech Stack

### Frontend

* ⚛️ React.js
* 🎨 CSS / Tailwind (optional)

### Backend

* 🟢 Node.js
* 🚀 Express.js
* 🍃 MongoDB (Mongoose)

### Other Tools

* JWT Authentication 🔐
* Axios
* OpenStreetMap (Geocoding)

---

# 📁 Project Structure

```bash
WayMate/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── App.js
│
└── README.md
```

---

# ⚙️ Backend Setup

```bash
cd backend
npm install
```

### 🔑 Create `.env`

```env
PORT=4000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

### ▶️ Run Server

```bash
npm start
```

---

# 💻 Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

# 🔐 API Highlights

## Auth

* `POST /api/users/register`
* `POST /api/users/login`

## Rides

* `POST /api/rides/create`
* `GET /api/rides/search`
* `POST /api/users/ride/:id/join`
* `POST /api/users/ride/:id/leave`

## User

* `GET /api/users/profile`
* `GET /api/users/my-rides`
* `GET /api/users/joined-rides`

---

# 📊 Dashboard Features

* Total rides created
* Total rides joined
* Activity tracking

---

# 🌍 Geo Features

* Convert location name → coordinates
* Find rides within range
* Match origin & destination

---

# 🚀 Future Enhancements

* 🔄 Real-time ride tracking
* 💳 Payment integration
* 📱 Mobile app (React Native)
* ⭐ Ratings & reviews
* 🔔 Notifications system

---

# 🧠 Concept

WayMate solves:

* 🚗 Empty seats problem
* 💸 High travel costs
* 🌱 Environmental impact

---

# 🤝 Contributing

Pull requests are welcome!
For major changes, open an issue first.

---

# 📄 License

MIT License

---
