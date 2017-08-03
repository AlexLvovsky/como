export class About {
  name: string;
  description: string;
  url: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
