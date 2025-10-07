import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.css'
})
export class Counter {
  counter = signal(0)
  increment() {
    this.counter.update(value=>++value)
  }
  decrement() {
    if (this.counter() > 0) {
      this.counter.update(value=>--value)
    }
  }
}
