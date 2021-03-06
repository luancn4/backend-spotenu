import express from "express";
import dotenv from "dotenv"
import { AddressInfo } from "net";
import { userRouter } from "./router/UserRouter";
import { bandRouter } from "./router/BandRoutes";
import cors from "cors";

// dotenv.config()

export const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.use("/users/", userRouter);
app.use("/bands/", bandRouter);

const server = app.listen(process.env.PORT || 3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
