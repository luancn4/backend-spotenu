import express from "express";
import { AddressInfo } from "net";
import { userRouter } from "./router/UserRouter";
import { bandRouter } from "./router/BandRoutes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users/", userRouter);
app.use("/bands/", bandRouter);

const server = app.listen(3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Servidor rodando em http://localhost:${address.port}`);
  } else {
    console.error(`Falha ao rodar o servidor.`);
  }
});
