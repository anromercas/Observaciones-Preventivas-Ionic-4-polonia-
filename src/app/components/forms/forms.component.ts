import { Component, OnInit, Input } from '@angular/core';
import { Form, Pregunta } from '../../pages/interfaces/interfaces';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {

  @Input() forms: Form[] = [];
  @Input() preguntas: Pregunta[] = [];

  constructor() { }

  ngOnInit() {
    console.log(this.forms);
  }

}
