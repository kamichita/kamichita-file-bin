document.getElementById("upload-box").addEventListener("click", () => document.getElementById("file-input").click());

document.getElementById("file-input").addEventListener("change", async (event) => {
    const files = event.target.files;
    if (files.length === 0) return;

    const formData = new FormData();
    formData.append("file", files[0]);

    const response = await fetch("http://localhost:3000/api/upload", { method: "POST", body: formData });
    const data = await response.json();

    if (data.downloadUrl) {
        document.getElementById("download-link").href = data.downloadUrl;
        document.getElementById("download-link").textContent = data.downloadUrl;
        document.getElementById("short-url").href = data.shortUrl;
        document.getElementById("short-url").textContent = data.shortUrl;
        document.getElementById("link-box").style.display = "block";
    } else {
        alert("アップロードに失敗しました。");
    }
});
