import { Component, HostListener } from '@angular/core';
import { CalendarDay, generateCalendar } from './calendar-service';
@Component({
  selector: 'app-calendar',
  imports: [],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css'
})
export class Calendar {
  calendarDays:CalendarDay[] = [...generateCalendar()]

  @HostListener('click', ['$event'])
  handlerClickEventDelegation(ev:Event){
    //ev.stopPropagation()
    //Event delegation
    //https://dmitripavlutin.com/javascript-event-delegation/
    const element = ev.target as HTMLElement
    if(element?.dataset){
      const {index} = element.dataset
      if(index){
        console.log(this.calendarDays[Number(index)])
      }

    }
  }
  /*handlerClick(ev:Event,day:number){
    ev.stopPropagation()
    console.log(day)
  }*/
}
