import { OpenUrlMessage } from "./types";

const scrapeButton = document.getElementById("scrapeButton") as HTMLButtonElement | null;

if (scrapeButton) {
  scrapeButton.addEventListener("click", () => {
    console.log("Sending message to background script...");

    const message: OpenUrlMessage = {
      action: "openUrl",
      url: "https://www.facebook.com/marketplace/toronto/search?query=rentals",
    };

    // Send the message to the background script
    chrome.runtime.sendMessage(message);
  });
} else {
  console.error('The element with id "scrapeButton" was not found.');
}
