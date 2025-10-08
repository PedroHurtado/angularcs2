import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Parent} from './parent/parent'
import { Counter } from './counter/counter';
import { Timer } from './timer/timer';
import { InputParent } from './input-parent/input-parent';
import { Calendar } from './calendar/calendar';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Parent,Counter, Timer, InputParent,Calendar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-app');
}
