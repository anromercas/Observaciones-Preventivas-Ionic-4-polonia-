import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';
import { ImagenPipe } from './imagen.pipe';
import { ImagenObservationPipe } from './imagen-observation.pipe';

@NgModule({
  declarations: [
    DomSanitizerPipe,
    ImageSanitizerPipe,
    ImagenPipe,
    ImagenObservationPipe
  ],
  exports: [
    DomSanitizerPipe,
    ImageSanitizerPipe,
    ImagenPipe,
    ImagenObservationPipe
  ]
})
export class PipesModule { }
