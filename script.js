document.getElementById('uploadButton').addEventListener('click', () => {
    const files = document.getElementById('fileInput').files;
    if (files.length === 0) {
        alert("ファイルを選択してください！");
        return;
    }

    // 簡単なアップロードロジック
    Array.from(files).forEach(file => {
        console.log(`Uploading: ${file.name}`);
        // ここでアップロード処理を行う
        const link = `https://kamichita-file-bin.pages.dev/download/${file.name}`;
        const downloadKey = Math.random().toString(36).substr(2, 8);
        document.getElementById('links').innerHTML += `
            <p>ファイル名: ${file.name} <br> リンク: <a href="${link}" target="_blank">${link}</a> <br> ダウンロードキー: ${downloadKey}</p>
        `;
    });
});
