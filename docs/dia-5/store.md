# NgRx - Resumen con Ejemplo Counter

## ¿Qué es NgRx?

NgRx es una librería de gestión de estado para Angular basada en Redux. Proporciona un store centralizado e inmutable para toda la aplicación.

## Conceptos Principales

- **Store**: Almacén único del estado
- **Actions**: Eventos que describen qué pasó
- **Reducers**: Funciones puras que actualizan el estado
- **Selectors**: Consultas para leer el estado
- **Effects**: Manejo de operaciones asíncronas

---

## Ejemplo: Contador con NgRx + Signals

### 1. Actions (counter.actions.ts)

```typescript
import { createAction, props } from '@ngrx/store';

// Acciones síncronas
export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');
export const reset = createAction('[Counter] Reset');

// Acciones asíncronas (para Effects)
export const incrementAsync = createAction(
  '[Counter] Increment Async',
  props<{ delay: number }>()
);

export const incrementAsyncSuccess = createAction(
  '[Counter] Increment Async Success'
);
```

### 2. State Interface (counter.state.ts)

```typescript
export interface CounterState {
  count: number;
  loading: boolean;
}

export const initialState: CounterState = {
  count: 0,
  loading: false
};
```

### 3. Reducer (counter.reducer.ts)

```typescript
import { createReducer, on } from '@ngrx/store';
import * as CounterActions from './counter.actions';
import { initialState } from './counter.state';

export const counterReducer = createReducer(
  initialState,
  
  // Incrementar
  on(CounterActions.increment, (state) => ({
    ...state,
    count: state.count + 1
  })),
  
  // Decrementar
  on(CounterActions.decrement, (state) => ({
    ...state,
    count: state.count - 1
  })),
  
  // Reset
  on(CounterActions.reset, (state) => ({
    ...state,
    count: 0
  })),
  
  // Async - inicia loading
  on(CounterActions.incrementAsync, (state) => ({
    ...state,
    loading: true
  })),
  
  // Async - completa y incrementa
  on(CounterActions.incrementAsyncSuccess, (state) => ({
    ...state,
    count: state.count + 1,
    loading: false
  }))
);
```

### 4. Selectors (counter.selectors.ts)

```typescript
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './counter.state';

// Selector de la feature
export const selectCounterState = createFeatureSelector<CounterState>('counter');

// Selector del contador
export const selectCount = createSelector(
  selectCounterState,
  (state) => state.count
);

// Selector del loading
export const selectLoading = createSelector(
  selectCounterState,
  (state) => state.loading
);

// Selector computado (ejemplo)
export const selectIsPositive = createSelector(
  selectCount,
  (count) => count > 0
);
```

### 5. Effects (counter.effects.ts)

```typescript
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, delay, catchError } from 'rxjs/operators';
import * as CounterActions from './counter.actions';

@Injectable()
export class CounterEffects {
  
  // Effect para incremento asíncrono
  incrementAsync$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CounterActions.incrementAsync),
      delay(1000), // Simula operación async
      map(() => CounterActions.incrementAsyncSuccess()),
      catchError(() => of({ type: '[Counter] Error' }))
    )
  );

  constructor(private actions$: Actions) {}
}
```

### 6. Componente con Signals (counter.component.ts)

```typescript
import { Component, inject, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import * as CounterActions from './store/counter.actions';
import * as CounterSelectors from './store/counter.selectors';

@Component({
  selector: 'app-counter',
  template: `
    <div class="counter">
      <h2>Contador: {{ count() }}</h2>
      <p>¿Es positivo? {{ isPositive() ? 'Sí' : 'No' }}</p>
      
      <div class="buttons">
        <button (click)="increment()">+1</button>
        <button (click)="decrement()">-1</button>
        <button (click)="reset()">Reset</button>
        <button 
          (click)="incrementAsync()" 
          [disabled]="loading()">
          {{ loading() ? 'Cargando...' : '+1 Async (1s)' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .counter {
      text-align: center;
      padding: 2rem;
    }
    .buttons button {
      margin: 0.5rem;
      padding: 0.5rem 1rem;
    }
  `]
})
export class CounterComponent {
  private store = inject(Store);
  
  // Convertir Observables a Signals
  count: Signal<number> = toSignal(
    this.store.select(CounterSelectors.selectCount),
    { initialValue: 0 }
  );
  
  loading: Signal<boolean> = toSignal(
    this.store.select(CounterSelectors.selectLoading),
    { initialValue: false }
  );
  
  isPositive: Signal<boolean> = toSignal(
    this.store.select(CounterSelectors.selectIsPositive),
    { initialValue: false }
  );

  // Dispatch de acciones
  increment(): void {
    this.store.dispatch(CounterActions.increment());
  }

  decrement(): void {
    this.store.dispatch(CounterActions.decrement());
  }

  reset(): void {
    this.store.dispatch(CounterActions.reset());
  }

  incrementAsync(): void {
    this.store.dispatch(CounterActions.incrementAsync({ delay: 1000 }));
  }
}
```

### 7. Configuración del Store (app.config.ts)

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { counterReducer } from './store/counter.reducer';
import { CounterEffects } from './store/counter.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ counter: counterReducer }),
    provideEffects([CounterEffects]),
    provideStoreDevtools({ maxAge: 25 }) // DevTools
  ]
};
```

---

## Flujo de Datos

1. Usuario hace clic → **Component** dispara **Action**
2. **Action** llega al **Reducer** → actualiza **State**
3. Si es async → **Effect** intercepta, ejecuta lógica, dispara nueva **Action**
4. **Selector** + **toSignal()** convierte Observable a Signal
5. Component lee el **Signal** reactivamente

## Ventajas de Signals con NgRx

- Mejor performance (detección de cambios más eficiente)
- API más simple que Observables
- Integración nativa con Angular moderno
- Mantiene los beneficios de NgRx (estado centralizado, debugging)
