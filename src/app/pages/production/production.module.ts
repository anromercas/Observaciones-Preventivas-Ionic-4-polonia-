import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductionPage } from './production.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';
import { SalirRutaGuard } from '../../guards/salir-ruta.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductionPage,
    canDeactivate: [ SalirRutaGuard ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductionPage],
  providers: [SalirRutaGuard]
})
export class ProductionPageModule {}
