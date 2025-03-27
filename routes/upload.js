const express = require("express");
const multer = require("../config/multer");
const router = express.Router();
const { generateShortUrl } = require("../config/shortener");

router.post("/", multer.single("file"), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "ファイルがありません。" });

    const fileUrl = `http://localhost:3000/uploads/${req.file.filename}`;
    const shortUrl = await generateShortUrl(fileUrl); // 短縮URL生成

    res.json({
        message: "アップロード成功！",
        downloadUrl: fileUrl,
        shortUrl: shortUrl,
        deleteKey: req.file.filename, // シンプルな削除キー
    });
});

module.exports = router;
