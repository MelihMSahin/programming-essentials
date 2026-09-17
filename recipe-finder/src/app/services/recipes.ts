import { Service, Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface MealResponse {
    meals: MealAPI[];
}

export interface MealAPI {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
}

export interface Meal{
  id: string,
  name?: string,
  category?: string,
  location?: string,
  instructions?: string,
  thumbnail?: string,
}

@Injectable({ providedIn: 'root' })
export class Recipes {
    private http = inject(HttpClient);
    private apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

    getMeals(): Observable<Meal[]> {
        return this.http.get<MealResponse>(this.apiUrl).pipe(
        map(response => response.meals.map(meal => ({
            id: meal.idMeal,
            name: meal.strMeal,
            category: meal.strCategory,
            location: meal.strArea,
            instructions: meal.strInstructions,
            thumbnail: meal.strMealThumb,
            }))
        )
    )};
}
