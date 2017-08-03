import { Component, OnInit } from '@angular/core';
import {StyleService} from "../style.service";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subscription }   from 'rxjs/Subscription';
import {AppState} from "../app.service";

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  backgroundColor:string = '';
  textColor:string = '';
  constructor(private styleService: StyleService, private appState: AppState) {
    this.backgroundColor = this.appState.get('background-color')
      ? JSON.parse(this.appState.get('background-color')) : '255,255,255';
    this.textColor = this.appState.get('text-color')
      ? JSON.parse(this.appState.get('text-color')) : '0,0,0';
  }

  ngOnInit() {
    this.styleService.theme$.subscribe(
      data => {
        console.log('Sibling1Component-received from sibling2: ' + data);
        this.backgroundColor = data[1]._rgb[0]+','+data[1]._rgb[1]+','+data[1]._rgb[2];
        this.textColor = data[0]._rgb[0]+','+data[0]._rgb[1]+','+data[0]._rgb[2];
        this.appState.set('background-color', JSON.stringify(this.backgroundColor));
        this.appState.set('text-color', JSON.stringify(this.textColor));
      });
  }

}
