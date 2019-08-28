import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';
import { SalirRutaGuard } from './guards/salir-ruta.guard';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: './pages/tabs/tabs.module#TabsPageModule',
    canLoad: [ UsuarioGuard ]
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main/tabs/tab1'
  },
  { path: 'production', loadChildren: './pages/production/production.module#ProductionPageModule' },
  { path: 'magazine', loadChildren: './pages/magazine/magazine.module#MagazinePageModule' },
  { path: 'services', loadChildren: './pages/services/services.module#ServicesPageModule' },
  { path: 'offices', loadChildren: './pages/offices/offices.module#OfficesPageModule' },
  { path: 'view-form/:id', loadChildren: './pages/view-form/view-form.module#ViewFormPageModule' },
  // { path: 'view-question/:id', loadChildren: './pages/view-question/view-question.module#ViewQuestionPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
