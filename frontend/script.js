const baseURL = "https://linkly-su5b.onrender.com";  

// Generate Short URL
async function generateShortURL() {
    const url = document.getElementById("url-input").value.trim();
    if (!url) return alert("Please enter a URL");

    const res = await fetch(`${baseURL}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ URL: url })
    });

    const data = await res.json();
    const currentShortId = data;

    const shortUrlLink = `${baseURL}/${currentShortId}`;

    document.getElementById("short-url").href = shortUrlLink;
    document.getElementById("short-url").textContent = shortUrlLink;
    document.getElementById("short-url-section").classList.remove("hidden");
}

// Get Analytics for any Short URL
async function getAnalytics() {
    const shortUrl = document.getElementById("short-url-input").value.trim();
    if (!shortUrl) return alert("Please enter the short URL");

    // Extract shortId from the entered URL
    const urlParts = shortUrl.split("/");
    const shortId = urlParts[urlParts.length - 1];

    if (!shortId) return alert("Invalid short URL format");

    const res = await fetch(`${baseURL}/analytics/${shortId}`);
    const data = await res.json();

    document.getElementById("total-clicks").textContent = data.totalClicks;

    const historyList = document.getElementById("history");
    historyList.innerHTML = "";

    data.analytics.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `Visited At: ${new Date(item.timestamp).toLocaleString()}`;
        historyList.appendChild(li);
    });

    document.getElementById("analytics-section").classList.remove("hidden");
}
