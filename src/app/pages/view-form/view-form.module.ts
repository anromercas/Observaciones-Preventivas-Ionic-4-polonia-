import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewFormPage } from './view-form.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';
import { ViewQuestionPage } from '../view-question/view-question.page';
import { ViewQuestionPageModule } from '../view-question/view-question.module';

const routes: Routes = [
  {
    path: '',
    component: ViewFormPage
  }
];

@NgModule({
  entryComponents: [
    ViewQuestionPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ComponentsModule,
    ViewQuestionPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewFormPage]
})
export class ViewFormPageModule {}
