import { Component, signal } from '@angular/core';
import { InputChild } from '../input-child/input-child';

@Component({
  selector: 'app-input-parent',
  imports: [InputChild],
  templateUrl: './input-parent.html',
  styleUrl: './input-parent.css'
})
export class InputParent {
  //name="Pedro"
  handlerClick(){
    this.name.set("Pedro Hurtado")
    //this.name ="Pedro Hurtado"
  }

  name = signal('Pedro')

}
