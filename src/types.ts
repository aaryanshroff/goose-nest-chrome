// types.ts

export interface OpenUrlMessage {
  action: 'openUrl';
  url: string;
}

export function isOpenUrlMessage(message: any): message is OpenUrlMessage {
  return message.action === 'openUrl' && typeof message.url === 'string';
}

export interface Listing {
  raw_content: string | null
  href: string | null
}