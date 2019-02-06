import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({providedIn: 'root'})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is a test recipe',
      'https://upload.wikimedia.org/wikipedia/commons/8/89/7126_-_Luzern_-_Chicken_%26_pasta.JPG',
      [new Ingredient('Tomato', 5), new Ingredient('Chillies', 8)]),
    new Recipe('Another Test Recipe', 'This is another test recipe',
      'https://upload.wikimedia.org/wikipedia/commons/8/89/7126_-_Luzern_-_Chicken_%26_pasta.JPG',
      [new Ingredient('Bread', 2), new Ingredient('Cucumber', 4)])
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
