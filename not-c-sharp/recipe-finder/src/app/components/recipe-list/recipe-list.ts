import { Component, inject } from '@angular/core';
import { Meal, Recipes } from '../../services/recipes';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-recipe-list',
  styleUrl: './recipe-list.css',
  templateUrl: './recipe-list.html',
  standalone: true,
})
export class RecipeList {
  meals: Meal[] = [];
  searchTerm = '';


  private cdr = inject(ChangeDetectorRef);
  errorMessage: string = "";
  loading: boolean = true;

  constructor(private recipes: Recipes) {}

  ngOnInit() {
    this.searchMeals();
  }

  searchMeals() {
    this.recipes.getMeals(this.searchTerm).subscribe({
      next: (data) => {
        this.meals = data; 
        this.loading = false; 
        this.cdr.markForCheck();},
      error: () => { 
        this.errorMessage = "Could not load meals."; 
        this.loading = false;
        this.cdr.markForCheck();}
    });
  }
}
