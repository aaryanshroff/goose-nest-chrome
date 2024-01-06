export function isLogMessage(message: any): message is LogMessage {
  return message && message.action == 'log' && typeof message.level === 'string';
}

export function isOpenUrlMessage(message: any): message is OpenUrlMessage {
  return message && message.action === 'openUrl' && typeof message.url === 'string';
}

export function isMessage(message: any): message is Message {
  return isOpenUrlMessage(message) // || isOtherMessageType(msg)
}