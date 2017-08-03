export class OpeningHours {
  id: string;
  startDay: string;
  endDay: string;
  startTime: string;
  endTime: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
