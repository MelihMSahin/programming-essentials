import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

export interface Meal{
  id: number,
  name?: string,
  category?: string,
  location?: string,
  instructions?: string,
  thumbmail?: string,
  youtubeURL?: string,
  imageURL?: string,
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
