const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// ファイルの保存先を指定
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'download'); // 保存フォルダ
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // 一意なファイル名を生成
    }
});

const upload = multer({ storage });

// 静的ファイルの配信
app.use(express.static('public'));
app.use('/download', express.static(path.join(__dirname, 'download')));

// ファイルアップロード用のエンドポイント
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('アップロードされたファイルがありません。');
    }
    const downloadLink = `${req.protocol}://${req.get('host')}/download/${req.file.filename}`;
    res.json({
        message: 'アップロード成功！',
        downloadLink
    });
});

// サーバーを起動
app.listen(PORT, () => {
    console.log(`サーバーが起動しました: http://localhost:${PORT}`);
});
