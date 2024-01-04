import { handleMessage } from './messageHandlers';

try {
  chrome.runtime.onMessage.addListener(handleMessage);
} catch (error) {
  console.error("Error adding listener for messages to service worker:", error);
}