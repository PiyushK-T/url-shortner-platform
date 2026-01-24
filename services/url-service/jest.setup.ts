import dotenv from "dotenv";
dotenv.config({ path: ".env.example" });
process.env.PORT = "3000";
process.env.AUTH_SERVICE_URL = "http://localhost:4001";
process.env.URL_SERVICE_URL = "http://localhost:4002";
process.env.ANALYTICS_SERVICE_URL = "http://localhost:4003";
