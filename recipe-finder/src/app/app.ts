import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

export interface Meal{
  idMeal: number,
  strMeal?: string,
  strCategory?: string,
  strArea?: string,
  strInstructions?: string,
  strMealThumb?: string,
  strYoutube?: string,
  strImageSource?: string,
}

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('recipe-finder');
}
