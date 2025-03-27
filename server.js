const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;

// ファイルの保存先を指定
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "download"); // "download" フォルダに保存
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // ファイル名を一意に
    }
});

const upload = multer({ storage });

// 静的ファイル配信設定
app.use(express.static("public"));

// ファイルアップロード用エンドポイント
app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("ファイルがアップロードされていません！");
    }
    const fileLink = `${req.protocol}://${req.get("host")}/download/${req.file.filename}`;
    res.send({ 
        message: "アップロード完了！", 
        downloadLink: fileLink 
    });
});

// サーバー起動
app.listen(PORT, () => {
    console.log(`サーバーが起動しました: http://localhost:${PORT}`);
});
