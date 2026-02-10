const errorMiddleware = require("./middlewares/error-middleware");

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDb = require("./utils/db");

/* const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH", "HEAD"],
    credentials: true
} */

const corsOptions = {
  // origin: "http://localhost:5173",
  origin: (origin, callback) => {
    // Check if the origin is allowed
    const allowedOrigins = [
      "http://localhost:5173",
      "https://adkap.org",
      "https://www.adkap.org",
    ];
    const isAllowed = allowedOrigins.includes(origin);
    callback(null, isAllowed ? origin : false);
  },
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

//Let's define admin route
app.use("/api/admindata", adminRoute);


app.use(errorMiddleware);
/* app.get("/", (req, res) => {
    res.status(200).send("Welcome To New Series");
});


app.get("/register", (req, res) => {
    res.status(200).send("Welcome To Register Page");
}); */

const PORT = process.env.PORT || 5000;
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at Port:  ${PORT}`);    
    });
});