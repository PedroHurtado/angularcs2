import { Component,input,effect } from '@angular/core';

@Component({
  selector: 'app-input-child',
  imports: [],
  templateUrl: './input-child.html',
  styleUrl: './input-child.css'
})
export class InputChild {

  name=input.required<string>()

  constructor(){
    effect(()=>{
      console.log(`name:${this.name()}`)
    })
  }
}
