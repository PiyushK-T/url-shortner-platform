import app from "./app";
import { connectRedis } from "./config/redis";

const PORT = process.env.PORT || 3000;

async function start() {
  await connectRedis();

  app.listen(PORT, () => {
    console.log(`URL Service running on port ${PORT}`);
  });
}

start();
