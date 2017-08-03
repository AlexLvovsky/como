import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {AppState} from "../../app.service";

export class FileHolder {

  constructor(public src: string, public file: File) {
  }
}

@Component({
  selector: 'image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  @Input() max: number = 100;
  @Input() preview: boolean = true;
  @Input() maxFileSize: number;

  @Output()
  onFileUploadFinish: EventEmitter<FileHolder> = new EventEmitter<FileHolder>();
  @Output()
  onRemove: EventEmitter<FileHolder> = new EventEmitter<FileHolder>();

  files: FileHolder[] = [];
  showFileTooLargeMessage: boolean = false;
  fileCounter: number = 0;
  isFileOver: boolean = false;

  @Input()
  buttonCaption: string = 'Select Images';
  @Input()
  dropBoxMessage: string = 'Drop your images here!';
  @Input()
  fileTooLargeMessage: string;
  @Input('extensions')
  supportedExtensions: string[];

  @ViewChild('input')
  private inputElement: ElementRef;

  constructor() {
  }

  ngOnInit() {
    if (!this.fileTooLargeMessage) {
      this.fileTooLargeMessage = 'An image was too large and was not uploaded.' + (this.maxFileSize ? (' The maximum file size is ' + this.maxFileSize / 1024) + 'KiB.' : '');
    }

    this.supportedExtensions = this.supportedExtensions ? this.supportedExtensions.map((ext) => 'image/' + ext) : ['image/*'];
  }

  fileChange(files: FileList) {
    // let remainingSlots = this.countRemainingSlots();
    this.files.splice(0, 1);
    // this.fileCounter--;
    // let filesToUploadNum = files.length > remainingSlots ? remainingSlots : files.length;

    // this.fileCounter += filesToUploadNum;
    this.showFileTooLargeMessage = false;
    this.uploadFiles(files, 1);
  }
  deleteFile(file: FileHolder): void {
    let index = this.files.indexOf(file);
    this.files.splice(index, 1);
    this.fileCounter--;
    this.inputElement.nativeElement.value = '';

    this.onRemove.emit(file);
  }

  deleteAll() {
    this.files.forEach(f => this.onRemove.emit(f));

    this.files = [];
    this.fileCounter = 0;
    this.inputElement.nativeElement.value = '';
  }

  fileOver(isOver) {
    this.isFileOver = isOver;
  }

  private uploadFiles(files: FileList, filesToUploadNum: number) {
    for (let i = 0; i < filesToUploadNum; i++) {
      let file = files[i];

      if (this.maxFileSize && file.size > this.maxFileSize) {
        this.showFileTooLargeMessage = true;
        continue;
      }

      let img = document.createElement('img');
      img.src = window.URL.createObjectURL(file);

      let reader = new FileReader();
      reader.addEventListener('load', (event: any) => {
        let fileHolder: FileHolder = new FileHolder(event.target.result, file);

        this.uploadSingleFile(fileHolder);

        this.files.push(fileHolder);

      }, false);


      reader.readAsDataURL(file);
    }
  }

  private uploadSingleFile(fileHolder: FileHolder) {
      this.fileCounter = 1;
      this.onFileUploadFinish.emit(fileHolder);
  }

  private countRemainingSlots() {
    return this.max - this.fileCounter;
  }
}
