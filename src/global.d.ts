declare global {
  interface OpenUrlMessage {
    action: 'openUrl';
    url: string;
  }

  type Message = OpenUrlMessage // | OtherMessageType

  interface Listing {
    raw_content: string | null
    href: string | null
  }
}

export {}