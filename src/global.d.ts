declare global {
  interface LogMessage {
    action: 'log'
    level: 'log' | 'error'
    data: any
  }

  interface OpenUrlMessage {
    action: 'openUrl';
    url: string;
  }

  type Message = LogMessage | OpenUrlMessage // | OtherMessageType

  interface Listing {
    raw_content: string | null
    href: string | null
  }
}

export {}