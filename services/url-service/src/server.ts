import dotenv from "dotenv";
dotenv.config();

import { app } from "./app";
import { getEnv } from "./config/env";

const { PORT } = getEnv();
const port = PORT ? Number(PORT) : 4002;

app.listen(port, () => {
  console.log(`URL service running on port ${port}`);
});
