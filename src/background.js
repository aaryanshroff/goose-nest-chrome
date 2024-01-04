chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Received message", message, "from", sender);
  if (message.action === "openUrl") {
    chrome.tabs.create({ url: message.url }, function (tab) {
      // Use the tab.id to check the status of the tab loading.
      chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
        // Make sure the status is 'complete' and it's the tab we created.
        if (tabId === tab.id && changeInfo.status === "complete") {
          // Now the tab has finished loading, execute the content script.
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["src/content.js"],
          });
        }
      });
    });
  }
});
