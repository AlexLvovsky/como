import {Component, OnInit, OnDestroy} from '@angular/core';
import {About} from "../about";
import {AppState} from "../app.service";

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {
  aboutObj: About;
  constructor(private appState: AppState) { }

  ngOnInit() {
    const aboutFromState = this.appState.get('about') ? JSON.parse(this.appState.get('about')) : null;
    if(aboutFromState){
      this.aboutObj = new About(aboutFromState);
    }
    else {
      this.aboutObj = new About();
    }
  }

  ngOnDestroy() {
    this.appState.set('about', JSON.stringify(this.aboutObj));
  }
}
