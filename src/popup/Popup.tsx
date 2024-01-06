import React from "react";

function scrapeListingsClickHandler() {
  console.log("Sending message to background script...");

  const message: OpenUrlMessage = {
    action: "openUrl",
    url: "https://www.facebook.com/marketplace/toronto/search?query=rentals",
  };

  // Send the message to the background script
  chrome.runtime.sendMessage(message);
}

export function Popup() {
  return <button onClick={scrapeListingsClickHandler}>Scrape Listings</button>;
}
