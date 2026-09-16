import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-student-card',
  styleUrl: './student-card.css',
  templateUrl: './student-card.html',
})

export class StudentCard {
  @Input() id!: number;
  @Input() name!: string;
  @Input() score!: number;
  @Input() showDetails = false;

  get scoreClass(): "score-high" | "score-mid" | "score-low" {
    if (this.score > 80) { return "score-high"; }
    if (this.score > 40) { return "score-mid"; }
    return 'score-low'
  }

  get initial(): string {
    return this.name?.charAt(0).toUpperCase() ?? '?';
  }
}
