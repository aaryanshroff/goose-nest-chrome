import React from "react";
import Select from "react-select";

const cityOptions = [{ value: "toronto", label: "Toronto" }];

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
  return (
    <div>
      <h1>Goose Nest</h1>
      <Select defaultValue={cityOptions[0]} options={cityOptions} />
    </div>
  );
}
