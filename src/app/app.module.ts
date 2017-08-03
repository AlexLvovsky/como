import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
// import {ImageUploadModule} from 'angular2-image-upload';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import { AboutComponent } from './about/about.component';
import { ImagesComponent } from './images/images.component';
import { OpeningHoursComponent } from './opening-hours/opening-hours.component';
import {PixabayService} from "./pixabay.service";
import { OpeningHoursRowComponent } from './opening-hours-row/opening-hours-row.component';
import {AppState} from "./app.service";
import { CustomStylingComponent } from './custom-styling/custom-styling.component';
import {StyleService} from "./style.service";
import {PreviewComponent} from "./preview/preview.component";
import {ImageUploadModule} from "./image-upload/image-upload.module";

// Define the routes
const ROUTES = [
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: 'about',  component: AboutComponent },
  { path: 'images', component: ImagesComponent },
  { path: 'opening-hours',     component: OpeningHoursComponent },
  { path: 'custom-styling', component: CustomStylingComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ImagesComponent,
    OpeningHoursComponent,
    OpeningHoursRowComponent,
    CustomStylingComponent,
    PreviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    ImageUploadModule.forRoot(),
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  entryComponents: [OpeningHoursRowComponent],
  providers: [PixabayService, AppState, StyleService], // Add the posts service
  bootstrap: [AppComponent]
})
export class AppModule { }
