import { Component, OnInit, Input } from '@angular/core';
import { Factory } from 'src/app/pages/interfaces/interfaces';

@Component({
  selector: 'app-factories',
  templateUrl: './factories.component.html',
  styleUrls: ['./factories.component.scss'],
})
export class FactoriesComponent implements OnInit {

  @Input() factories: Factory[] = [];

  fakeFactories: Factory[] = [
    {
      nombre: 'Köln',
      pais: 'Alemania',
      ciudad: 'Köln'
    },
    {
      nombre: 'Madrid',
      pais: 'Madrid',
      ciudad: 'Coslada'
    },
    {
      nombre: 'Brasil',
      pais: 'Brasil',
      ciudad: 'Sao Paulo - Atibaia'
    },
    {
      nombre: 'Palmera',
      pais: 'Portugal',
      ciudad: 'Lagoinha'
    },
    {
      nombre: 'Roanne',
      pais: 'Francia',
      ciudad: 'Quai du Canal'
    },

  ];

  constructor() { }

  ngOnInit() {}

}
