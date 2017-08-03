import {Component, OnInit, OnDestroy} from '@angular/core';
import {PixabayService} from "../pixabay.service";
import {AppState} from "../app.service";

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
  providers: [PixabayService],
})
export class ImagesComponent implements OnInit, OnDestroy {
  pixabayToken:string = '';
  sub: any;
  imageResults: any;
  error: string = '';

  constructor(private pixabayService: PixabayService, private appState: AppState) {

  }

  ngOnInit() {
    var tokenFromState = this.appState.get('pixabay-token');
    if(tokenFromState){
      this.pixabayToken = tokenFromState;
      this.getImages();
    }
  }

  getImages() {
    if(!this.pixabayToken){
      this.error = 'Token is empty. Please enter a valid token.'
    }
    else {
      this.error = '';
      this.imageResults = [];
      if (this.sub) {
        this.sub.unsubscribe();
      }
      this.sub = this.pixabayService.get(this.pixabayToken)
        .subscribe(
          result => {
            console.log(result);
            this.imageResults = result.hits;
          },
          (error) => {
            this.error = 'Wrong token. Please enter a valid token.'
          }
        );
    }
  }

  ngOnDestroy() {
    this.appState.set('pixabay-token', this.pixabayToken);
  }
}
