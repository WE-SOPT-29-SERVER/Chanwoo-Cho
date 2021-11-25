import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import postingRouter from "./routers/postingRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/post", postingRouter);

const PORT = 3000;
const handleListenig = () => 
    console.log(`✅ SERVER LISTENING ON PORT http://localhost:${PORT}`);

app.listen(PORT, handleListenig);