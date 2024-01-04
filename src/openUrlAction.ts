import { OpenUrlMessage } from "./types";

function handleOpenUrl(message: OpenUrlMessage) {
  chrome.tabs.create({ url: message.url }, (tab) => {
    // Check if tab.id is undefined or not
    if (tab.id === undefined) return;

    // Use the tab.id to check the status of the tab loading.
    const onUpdatedCallback = (tabId: number, changeInfo: chrome.tabs.TabChangeInfo) => {
      // Make sure the status is 'complete' and it's the tab we created.
      if (tabId === tab.id && changeInfo.status === "complete") {
        // Now the tab has finished loading, execute the content script.
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ["src/content.js"],
        }, (results) => {
          // Handle the results returned by the script here
          if (results) {
            console.log(results)
          } else {
            console.error("Background script did not receive any results from the content script's scraping.")
          }
        });

        // Remove the listener after the script is executed to avoid multiple injections
        chrome.tabs.onUpdated.removeListener(onUpdatedCallback);
      }
    };

    // Add the listener for tab updates
    chrome.tabs.onUpdated.addListener(onUpdatedCallback);
  });
}

export default handleOpenUrl;