import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import postRoutes from "./routes/postRoutes";
import path from "path";

dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✔✔ Servidor rodando na porta ${PORT}`);
});
