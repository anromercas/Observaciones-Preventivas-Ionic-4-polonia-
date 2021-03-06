import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MagazinePage } from './magazine.page';
import { SalirRutaGuard } from 'src/app/guards/salir-ruta.guard';
import { PipesModule } from '../../../pipes/pipes.module';
import { ComponentsModule } from '../../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: MagazinePage,
    canDeactivate: [ SalirRutaGuard ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MagazinePage],
  providers: [SalirRutaGuard]
})
export class MagazinePageModule {}
