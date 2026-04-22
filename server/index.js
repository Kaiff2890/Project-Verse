/** @format */

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import net from "net";
import path from "path";

import { app, server } from "./socket/socket.js";

//-------------------------------security packages--------------------------------------
import helmet from "helmet";
import dbConnection from "./dbConfig/index.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import router from "./routes/index.js";

const __dirname = path.resolve(path.dirname(""));

dotenv.config();

// const app = express();

app.use(express.static(path.join(__dirname, "views/build")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

let currentPort = Number(process.env.PORT || 8800);
dbConnection();

app.use(helmet());
app.use(
	cors({
		origin: [
			"http://localhost:3000",
			process.env.APP_URL_C, // We will use APP_URL_C for the Vercel URL
			"https://project-verse-xglp.vercel.app" // Fallback hardcoded for now
		],
		credentials: true,
	}),
);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));
app.use(router);
app.use(errorMiddleware);

const getAvailablePort = (startPort) => {
	return new Promise((resolve, reject) => {
		const tester = net.createServer();
		tester.once("error", (err) => {
			if (err.code === "EADDRINUSE") {
				tester.close();
				resolve(getAvailablePort(startPort + 1));
				return;
			}
			reject(err);
		});

		tester.once("listening", () => {
			const port = tester.address().port;
			tester.close(() => resolve(port));
		});

		tester.listen(startPort);
	});
};

const startServer = async () => {
	try {
		const port = await getAvailablePort(currentPort);
		server.listen(port, () => {
			console.log(`server started on port : ${port}`);
		});
	} catch (error) {
		console.error("Failed to find an available port:", error);
		process.exit(1);
	}
};

startServer();
