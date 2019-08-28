import { Injectable } from '@angular/core';
import { ProductionPage } from '../pages/production/production.page';
import { OfficesPage } from '../pages/offices/offices.page';
import { MagazinePage } from '../pages/magazine/magazine.page';
import { ServicesPage } from '../pages/services/services.page';
import { FormsService } from '../services/forms.service';
import { Observable } from 'rxjs';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
export interface PuedeDesactivar {
  permitirSalirDeRuta: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SalirRutaGuard implements CanDeactivate<PuedeDesactivar> {

  canDeactivate( component: PuedeDesactivar ) {
   // const salir = window.confirm( 'Will lose this data. Are you sure?');
   console.log(component);

   return component.permitirSalirDeRuta ? component.permitirSalirDeRuta() : true;
      /* if ( salir ) {
        this.formService.borrarUltimo();
      }

      return salir; */

  }

}
