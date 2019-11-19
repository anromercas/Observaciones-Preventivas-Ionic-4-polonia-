import { Component, OnInit } from '@angular/core';
import { FormsService } from '../../services/forms.service';
import { Form, Pregunta } from '../interfaces/interfaces';
import { Router, ActivatedRoute } from '@angular/router';
import { FactoryService } from '../../services/factory.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  forms: Form[] = [];
  preguntas: Pregunta[] = [];

  fabrica: string;

  habilitado = true;

  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor(  private formsService: FormsService,
                private factoryService: FactoryService,
                private router: Router,
                private route: ActivatedRoute ) {
    this.route.queryParams.subscribe( params => {
      if (this.router.getCurrentNavigation().extras.state) {
        let data = this.router.getCurrentNavigation().extras.state.fabrica;
        console.log(data);
        this.factoryService.factory = data;
        this.fabrica = data._id;
      }
    });
  }

  ngOnInit() {
    this.siguientes(null, true);

    this.formsService.nuevoForm
                    .subscribe( form => {
                      this.forms.unshift(form);
                    });
    this.formsService.deleteForm
                      .subscribe( form => {
                        this.forms.shift();
                      });
  }

  recargar( event ) {

    this.siguientes( event, true);
    this.habilitado = true;
    this.forms = [];
    this.completeRefresh(event);
  }

  siguientes( event?, pull: boolean = false ) {

    this.formsService.getForms( pull, this.fabrica )
    .subscribe( resp => {
      console.log(resp);
      this.forms.push( ...resp.forms );

      if ( event ) {
        event.target.complete();
        if ( resp.forms.length === 0 ) {
          this.habilitado = false;
        }
      }
    });

  }

  completeRefresh(event) {
    event.target.disabled = true;
//    event.target.complete();
    setTimeout(() => {
      event.target.disabled = false;
    }, 100);
  }

}
