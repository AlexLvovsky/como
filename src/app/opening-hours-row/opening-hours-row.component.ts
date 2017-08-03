import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OpeningHours } from "../opening-hours";
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-opening-hours-row',
  templateUrl: './opening-hours-row.component.html',
  styleUrls: ['./opening-hours-row.component.scss']
})
export class OpeningHoursRowComponent implements OnInit {
  days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  hours = ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00",
          "09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00",
          "17:00","18:00","19:00","20:00","21:00","22:00","23:00"];
  startDay: string = 'Sunday';
  endDay: string = 'Thursday';
  startTime: string = "00:00";
  endTime: string = "23:00";
  openingHoursRow: OpeningHours = new OpeningHours();
  @Output() onClick = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  clicked(){
    this.openingHoursRow.id = UUID.UUID();
    this.openingHoursRow.startDay = this.startDay;
    this.openingHoursRow.endDay = this.endDay;
    this.openingHoursRow.startTime = this.startTime;
    this.openingHoursRow.endTime = this.endTime;
    this.onClick.emit(this.openingHoursRow);
    this.openingHoursRow = new OpeningHours();
  }
}
