import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import blogRouter from "./routers/blogRouter";
import userRouter from "./routers/userRouter";

const app = express();
const logger = morgan("dev");

app.use(logger);

app.use("/", rootRouter);
app.use("/blog", blogRouter);
app.use("/user", userRouter);


const PORT = 3000;
const handleListening = () => 
    console.log(`✅ SERVER LISTENING ON PORT http://localhost:${PORT}`);

app.listen(PORT, handleListening);
