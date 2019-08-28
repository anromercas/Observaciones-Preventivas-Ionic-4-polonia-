import { Component, OnInit, Input } from '@angular/core';
import { Pregunta } from '../interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.page.html',
  styleUrls: ['./view-question.page.scss'],
})
export class ViewQuestionPage implements OnInit {

  @Input() img;
  @Input() idUsuarioForm;

  pregunta: Pregunta;
  idQuestion: string;

  constructor(  private questionService: QuestionService,
                private modalCtrl: ModalController ) { }

  ngOnInit() {
  }


  backModal() {
    this.modalCtrl.dismiss();

  }
}
