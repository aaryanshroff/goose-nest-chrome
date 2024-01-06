export function isOpenUrlMessage(message: any): message is OpenUrlMessage {
  return message && message.type === 'openUrl' && typeof message.url === 'string';
}

export function isMessage(message: any): message is Message {
  return isOpenUrlMessage(message) // || isOtherMessageType(msg)
}