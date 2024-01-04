document.getElementById("scrapeButton").addEventListener("click", function () {
  console.log("Sending message to background script...");
  chrome.runtime.sendMessage({
    action: "openUrl",
    url: "https://www.facebook.com/marketplace/toronto/search?query=rentals",
  });
});
