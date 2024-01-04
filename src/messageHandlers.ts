import { handleOpenUrl } from './openUrlAction';
import { isOpenUrlMessage } from './types';

export function handleMessage(message: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) {
  console.log('Received message', message, 'from', sender);

  switch (message.action) {
    case 'openUrl':
      if (isOpenUrlMessage(message)) {
        handleOpenUrl(message);
      } else {
        console.warn('Invalid message format for openUrl:', message);
      }
      break;
    // Add additional cases for other actions here
    default:
      console.warn('Unknown action:', message.action);
      break;
  }
}