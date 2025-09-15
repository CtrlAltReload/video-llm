import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "../src/config/mongo";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

connectToDatabase();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Here!!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
