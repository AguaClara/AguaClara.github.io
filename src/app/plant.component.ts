import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>{{name}}</h1>`,
})
export class PlantComponent  { name = 'Plant Component'; }