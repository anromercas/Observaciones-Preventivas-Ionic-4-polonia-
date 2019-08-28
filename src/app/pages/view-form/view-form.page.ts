import { Component, OnInit } from "@angular/core";
import { QuestionService } from "src/app/services/question.service";
import { Pregunta, Form } from '../interfaces/interfaces';
import { ActivatedRoute, Router } from "@angular/router";
import { FormsService } from "../../services/forms.service";
import { ModalController } from '@ionic/angular';
import { ViewQuestionPage } from '../view-question/view-question.page';

@Component({
  selector: "app-view-form",
  templateUrl: "./view-form.page.html",
  styleUrls: ["./view-form.page.scss"]
})
export class ViewFormPage implements OnInit {
  preguntas: Pregunta[] = [];
  idForm = null;
  form: Form;
  idUsuarioForm: string;
  imgNotAvailableUrl = '../../assets/no-img.png';
  areaForm: string;

  constructor(
    private questionService: QuestionService,
    private formService: FormsService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {

    this.idForm = this.activeRoute.snapshot.paramMap.get('id');

    this.getFormById();

    this.getQuestionByIdForm();

  }

  coloresRespuestas() {
    this.preguntas.forEach( pregunta => {
      if ( pregunta.ok ) {
        pregunta.color = 'success';
      } else {
        pregunta.color = 'danger';
      }
    });
    console.log(this.preguntas);
  }

  getFormById() {
    this.formService.getFormById( this.idForm )
                    .then( (resp: any) => {
                      console.log(resp);
                      this.form = resp.form;
                      this.idUsuarioForm = resp.form.usuario;
                      this.areaForm = resp.form.area;
                    });
  }

  getQuestionByIdForm() {
    this.questionService.getQuestionByIdForm(this.idForm)
                        .subscribe(resp => {
                          console.log(resp);
                          this.preguntas = resp.preguntas;
                          this.coloresRespuestas();
                        });
  }

  async verImg( img: string ) {
    console.log(img);

    const modal = await this.modalCtrl.create({
      component: ViewQuestionPage,
      componentProps: {
        'img': img,
        'idUsuarioForm': this.idUsuarioForm
      }
    });

    await modal.present();
  }
}
