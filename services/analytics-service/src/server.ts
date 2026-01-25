import dotenv from "dotenv";
dotenv.config();

import { app } from "./app";
import { getEnv } from "./config/env";

const { PORT } = getEnv();
const port = PORT ? Number(PORT) : 4003;

app.listen(port, () => {
  console.log(`Analytics service running on port ${port}`);
});
