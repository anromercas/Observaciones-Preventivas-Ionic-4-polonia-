import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ServicesPage } from './services.page';
import { ComponentsModule } from '../../components/components.module';
import { SalirRutaGuard } from 'src/app/guards/salir-ruta.guard';
import { PipesModule } from '../../pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: ServicesPage,
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
  declarations: [ServicesPage],
  providers: [SalirRutaGuard]
})
export class ServicesPageModule {}
