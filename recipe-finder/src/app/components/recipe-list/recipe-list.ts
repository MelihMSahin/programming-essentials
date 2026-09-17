import { Component, inject } from '@angular/core';
import { Meal, Recipes } from '../../services/recipes';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-recipe-list',
  styleUrl: './recipe-list.css',
  templateUrl: './recipe-list.html',
})
export class RecipeList {
  meals: Meal[] = [];
  private cdr = inject(ChangeDetectorRef);

  private errorMessage: string = "";
  private loading: boolean = true;

  constructor(private recipes: Recipes) {}

  ngOnInit() {
    this.recipes.getMeals().subscribe({
      next: (data) => {
        this.meals = data; 
        this.loading = false; 
        this.cdr.markForCheck();},
      error: () => { 
        this.errorMessage = "Could not load students."; 
        this.cdr.markForCheck();}
    });
  }
}
