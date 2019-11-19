import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanDeactivate } from '@angular/router';
export interface PuedeDesactivar {
  permitirSalirDeRuta: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SalirRutaGuard implements CanDeactivate<PuedeDesactivar> {
  canDeactivate(component: PuedeDesactivar) {
    // const salir = window.confirm( 'Will lose this data. Are you sure?');
    console.log(component);

    return component.permitirSalirDeRuta
      ? component.permitirSalirDeRuta()
      : true;
    /* if ( salir ) {
        this.formService.borrarUltimo();
      }

      return salir; */
  }
}
