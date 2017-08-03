import { Component, OnInit } from '@angular/core';
import {StyleService} from "../style.service";

@Component({
  selector: 'app-custom-styling',
  templateUrl: './custom-styling.component.html',
  styleUrls: ['./custom-styling.component.scss']
})
export class CustomStylingComponent implements OnInit {

  constructor(private styleService: StyleService) { }

  ngOnInit() {
  }

  imageFinishedUploading(file) {
    // console.log(JSON.stringify(file));
    // Retrieve posts from the API
    this.styleService.getStyle(file.src).subscribe(posts => {
      console.log(posts);
      this.styleService.publishData(posts);
    });
  }
}
