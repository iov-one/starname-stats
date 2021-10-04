export interface Message {
  readonly "@type": string;

  // FIXME: use specific messages
  readonly [k: string]: any;
}
