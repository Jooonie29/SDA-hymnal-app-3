import dotenv from "dotenv";
import { createServer } from "http";
import app from "./server";

dotenv.config();

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
const server = createServer(app);

server.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});

