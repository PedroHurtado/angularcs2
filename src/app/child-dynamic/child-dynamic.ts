import { Component,effect,input, output } from '@angular/core';

@Component({
  selector: 'app-child-dynamic',
  imports: [],
  templateUrl: './child-dynamic.html',
  styleUrl: './child-dynamic.css'
})
export class ChildDynamic {
  value=input.required<number>()
  changeData=output<number>()
  constructor(){
    effect(()=>{
      this.changeData.emit(this.value())
    })
  }
}
