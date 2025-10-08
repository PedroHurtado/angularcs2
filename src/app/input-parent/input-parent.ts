import { Component, signal, DoCheck,ChangeDetectorRef, effect } from '@angular/core';
import { InputChild } from '../input-child/input-child';

@Component({
  selector: 'app-input-parent',
  imports: [InputChild],
  templateUrl: './input-parent.html',
  styleUrl: './input-parent.css'
})
export class InputParent implements DoCheck {
  name = signal("Pedro")
  //name:string ="Pedro"
  private _renderCounter: number = 0

  ngDoCheck(): void {
    this._renderCounter++
    console.log(`RenderCounter ${this._renderCounter}`)
  }

  handlerClick() {
    //this.name = "Pedro Hurtado"
    this.name.set( "Pedro Hurtado")
  }
  constructor(private changeDetector:ChangeDetectorRef){

    effect(()=>{
      //console.log(`Parent Component->${this.name()}`)
      console.log(`Effect->Parent Component->${this.name}`)
    })

    Promise.resolve().then(()=>{
      //this.name="Pedro Hurtado Candel"
      //this.changeDetector.markForCheck()
      this.name.set("Pedro Hurtado Candel")

    })

  }




}
