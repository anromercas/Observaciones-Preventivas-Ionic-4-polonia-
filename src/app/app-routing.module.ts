import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';

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
    redirectTo: 'fabricas'
    // redirectTo: 'main/tabs/tab1'
  },
  { path: 'production', loadChildren: './pages/polonia/production/production.module#ProductionPageModule' },
  { path: 'magazine', loadChildren: './pages/polonia/magazine/magazine.module#MagazinePageModule' },
  { path: 'services', loadChildren: './pages/polonia/services/services.module#ServicesPageModule' },
  { path: 'offices', loadChildren: './pages/polonia/offices/offices.module#OfficesPageModule' },
  { path: 'view-form/:id', loadChildren: './pages/view-form/view-form.module#ViewFormPageModule' },
  { path: 'fabricas', loadChildren: './pages/fabricas/fabricas.module#FabricasPageModule', canLoad: [ UsuarioGuard ] },
  { path: 'perfil', loadChildren: './pages/perfil/perfil.module#PerfilPageModule' },
  // { path: 'view-question/:id', loadChildren: './pages/view-question/view-question.module#ViewQuestionPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
