const express = require("express");
const cors = require("cors");
const uploadRoutes = require("./routes/upload");
const downloadRoutes = require("./routes/download");
const deleteRoutes = require("./routes/delete");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // アップロードされたファイルを公開

// ルート
app.use("/api/upload", uploadRoutes);
app.use("/api/download", downloadRoutes);
app.use("/api/delete", deleteRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`サーバーが http://localhost:${PORT} で起動しました。`));
