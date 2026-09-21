import { Routes } from '@angular/router';
import { RecipeList } from './components/recipe-list/recipe-list';
import { RecipeDetail } from './components/recipe-detail/recipe-detail';

export const routes: Routes = [
    { path: '', component: RecipeList},
    { path: 'recipe/:id', component: RecipeDetail},    
];
