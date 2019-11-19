import { Component, OnInit, Input } from '@angular/core';
import { Form, Pregunta } from 'src/app/pages/interfaces/interfaces';
/* import { QuestionService } from '../../services/question.service';
import { FormsService } from '../../services/forms.service';
import { NavController } from '@ionic/angular'; */
import { Router } from '@angular/router';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  @Input() form: Form = {};
  @Input() preguntas: Pregunta = {};

  slideSoloOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  };

   imgProduction = '../../assets/iconos-areas/listado/production.jpg';
   imgMagazine = '../../assets/iconos-areas/listado/magazine.jpg';
   imgServices = '../../assets/iconos-areas/listado/services.jpg';
   imgOffices = '../../assets/iconos-areas/listado/offices.jpg';

//  preguntas: Pregunta[] = [];

  constructor(  /* private questionService: QuestionService,
                private formService: FormsService,
                private navCtrl: NavController, */
                private router: Router ) { }

  ngOnInit() {
  //  console.log(this.form.area);

    /* this.questionService.getQuestionByIdForm(this.form._id)
                        .subscribe( (resp: any) => {
                          this.preguntas = resp.preguntas;
                          // console.log(this.preguntas);
                        });
 */
  }

  viewForm( id: string ) {
    console.log(id);
    this.router.navigate(['view-form', id]);
  }

}
