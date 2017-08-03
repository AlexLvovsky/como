import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FileDropDirective } from './file-drop.directive';
import { ImageUploadComponent } from './upload/image-upload.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [
    ImageUploadComponent,
    FileDropDirective
  ],
  exports: [ ImageUploadComponent ]
})
export class ImageUploadModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ImageUploadModule
    };
  }
}
