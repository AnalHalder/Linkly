const baseURL = "https://linkly-su5b.onrender.com";

async function generateShortURL() {
    const showUrlDiv = document.getElementById("show-url");
    const urlInput = document.getElementById("url-input");

    const url = urlInput.value.trim();
    if (!url) return alert("Please enter a URL");

    // Show loading 
    showUrlDiv.innerHTML = "<p style='color:white;'>Loading...</p>";

    try {
        const res = await fetch(`${baseURL}/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ URL: url })
        });
        const data = await res.json()
   
        const shortId = data;
        console.log(data);
        const shortUrlLink = `${baseURL}/${shortId}`;

        // Create link 
        showUrlDiv.innerHTML = `
            <a id="short-url" href="${shortUrlLink}" target="_blank">${shortUrlLink}</a>
        `;
    } catch (err) {
        showUrlDiv.innerHTML = "<p style='color:red;'>Something went wrong. Try again.</p>";
        console.log("Error:", err);
    }
}
