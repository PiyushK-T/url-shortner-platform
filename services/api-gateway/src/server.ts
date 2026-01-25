import dotenv from "dotenv";
dotenv.config();

import { app } from "./app";
import { getEnv } from "./config/env";

const { PORT, AUTH_SERVICE_URL, URL_SERVICE_URL, ANALYTICS_SERVICE_URL } = getEnv();
const port = PORT ? Number(PORT) : 4000;

app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});
