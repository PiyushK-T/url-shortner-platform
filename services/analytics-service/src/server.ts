import dotenv from "dotenv";
dotenv.config();

import { app } from "./app";

const PORT = process.env.PORT || 4003;

app.listen(PORT, () => {
  console.log(`Analytics service running on port ${PORT}`);
});
