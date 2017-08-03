import { Component, OnInit, OnDestroy } from '@angular/core';
import {OpeningHours} from "../opening-hours";
import {AppState} from "../app.service";

@Component({
  selector: 'app-opening-hours',
  templateUrl: './opening-hours.component.html',
  styleUrls: ['./opening-hours.component.scss']
})
export class OpeningHoursComponent implements OnInit, OnDestroy {
  listOpeningHours: OpeningHours[] = [];
  constructor(private appState: AppState) {
  }

  ngOnInit() {
    var listFromState = this.appState.get('openingHours') ? JSON.parse(this.appState.get('openingHours')) : null;
    if(listFromState){
      this.listOpeningHours = listFromState;
    }
  }

  ngOnDestroy(){
    this.appState.set('openingHours', JSON.stringify(this.listOpeningHours));
  }

  addOpeningHour(openingHourObj: OpeningHours) {
    this.listOpeningHours.push(openingHourObj);
    return this;
  }

  deleteOpeningHourById(id: string) {
    this.listOpeningHours = this.listOpeningHours
      .filter(obj => obj.id !== id);
    return this;
  }

  removeOpeningHour(openingHourObj: OpeningHours) {
    this.deleteOpeningHourById(openingHourObj.id);
  }
}
