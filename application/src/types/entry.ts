interface Resource {
  readonly uri: string;
  readonly resource: string;
}

export interface Entry {
  readonly starname: string;
  readonly date: number;
  readonly owner: string;
  readonly broker: string;
  readonly resources?: ReadonlyArray<Resource>;
}
