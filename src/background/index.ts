import { scrapeFacebookMarketplace } from '../utils/scrapers';
import { isOpenUrlMessage } from '../utils/type-guards';

/**
 * Processes incoming messages, delegating to specific handlers based on the message type.
 * Logs the received message and sender.
 * Logs a warning for unknown message types.
 *
 * @param message - The incoming message to be processed.
 * @param sender - The sender of the message.
 * @param sendResponse - A callback function to send a response back to the message sender.
 */
function handleMessage(message: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) {
  console.log('Received message', message, 'from', sender);

  if (isOpenUrlMessage(message)) {
    handleOpenUrlMessage(message);
  } else {
    console.warn('Unknown action:', message.action);
  }
}

/**
 * Opens a new tab with the provided URL from the message and executes the relevant scraping script upon completion of the tab's loading.
 *
 * @param {OpenUrlMessage} message - The message containing the URL to open.
 */
function handleOpenUrlMessage(message: OpenUrlMessage) {
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
          func: scrapeFacebookMarketplace
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

try {
  chrome.runtime.onMessage.addListener(handleMessage);
} catch (error) {
  console.error("Error adding listener for messages to service worker:", error);
}