import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { FormsComponent } from './forms/forms.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './banner/banner.component';
import { FactoriesComponent } from './factories/factories.component';
import { FactoryComponent } from './factory/factory.component';
import { FakeFactoryComponent } from './fake-factory/fake-factory.component';

@NgModule({
  declarations: [
    FormComponent,
    FormsComponent,
    FactoriesComponent,
    FactoryComponent,
    FakeFactoryComponent,
    HeaderComponent,
    BannerComponent,
    AvatarSelectorComponent
  ],
  exports: [
    FormsComponent,
    FactoriesComponent,
    HeaderComponent,
    BannerComponent,
    AvatarSelectorComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
