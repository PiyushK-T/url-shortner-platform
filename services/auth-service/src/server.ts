import dotenv from "dotenv";
dotenv.config();

import { app } from "./app";
import { getEnv } from "./config/env";

const { PORT, JWT_SECRET, JWT_EXPIRES_IN } = getEnv();
const port = PORT ? Number(PORT) : 4001;

app.listen(port, () => {
  console.log(`Auth service running on port ${port}`);
});
