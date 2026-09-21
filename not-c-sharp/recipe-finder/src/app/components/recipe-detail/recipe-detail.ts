import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meal, Recipes } from '../../services/recipes';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-recipe-detail',
  styleUrl: './recipe-detail.css',
  templateUrl: './recipe-detail.html',
})
export class RecipeDetail {
  private route = inject(ActivatedRoute);
  private recipes = inject(Recipes);
  private cdr = inject(ChangeDetectorRef);

  meal: Meal | undefined;
  notes: string[] = [];
  noteText: string = '';

  loading = true;
  errorMessage = '';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.errorMessage = 'Recipe ID is missing.';
      this.loading = false;
      return;
    }

    this.recipes.getMealById(id).subscribe({
      next: (data) => {
        this.meal = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.errorMessage = 'Could not load recipe.';
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  addNote() {
    const note = this.noteText.trim();

    if (!note) {
      return;
    }

    this.notes.push(note);
    this.noteText = '';
  }
}
