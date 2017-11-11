import { Component } from '@angular/core';


@Component({
  selector: 'my-app',

  styles: [`
        h1 {
    color:#545454;
    background:#87CEFA;
    padding:15px;
    box-shadow:2px 2px 2px 0 rgba(0, 0, 0, .3);
    }
    `],

  template: `<h1>{{title}}</h1>`,
})

export class AppComponent  {
  title= 'App Component'
  }
