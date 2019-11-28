import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const URL = environment.url;

@Pipe({
  name: 'imagenObservation'
})
export class ImagenObservationPipe implements PipeTransform {

  transform(img: string, userId: string): string {
    return `${ URL }/iobservation/imagen/${ userId }/${ img }`;
  }

}
