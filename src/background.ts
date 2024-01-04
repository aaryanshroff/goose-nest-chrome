import { handleMessage } from './messageHandlers';

// @ts-ignore
var exports = {}

try {
  chrome.runtime.onMessage.addListener(handleMessage);
} catch (error) {
  console.error("Error adding listener for messages to service worker:", error);
}