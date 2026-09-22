import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-student-card',
  styleUrl: './student-card.css',
  templateUrl: './student-card.html',
})

export class StudentCard {
  @Input() id!: string;
  @Input() name!: string;
  @Input() score!: number;
  @Input() showDetails = false;
  @Input() isFavorite = false;
  @Output() deleteRequested = new EventEmitter<void>();
  @Output() favoriteToggled = new EventEmitter<void>();

  toggleFavorite() {
    this.favoriteToggled.emit();
  }

  requestDelete() {
    this.deleteRequested.emit();
  }

  get scoreClass(): "score-high" | "score-mid" | "score-low" {
    if (this.score > 80) { return "score-high"; }
    if (this.score > 40) { return "score-mid"; }
    return 'score-low'
  }

  get initial(): string {
    return this.name?.charAt(0).toUpperCase() ?? '?';
  }
}
