const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const staticRoutes = require('./routes/staticRoutes');
const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/blog');
const checkForAuthenticationCookie = require('./middleware/auth');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { connect } = require('http2');
const connectDB = require('./db/Connect');

connectDB();

const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());


// Allow requests from frontend (localhost:5173)
// app.use(cors({
//   origin: "http://localhost:5173", // NOT "*"
//   credentials: true,               // Allow cookies, sessions, etc.
// }));

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use(express.static(path.resolve('./public')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(checkForAuthenticationCookie("token"));

app.use('/user',userRoutes);
app.use('/', staticRoutes);
app.use("/blog",blogRoutes);


app.listen(port,()=>{console.log(`Server is running on port ${port}`)});