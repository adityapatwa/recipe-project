import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({providedIn: 'root'})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is a test recipe',
      'https://upload.wikimedia.org/wikipedia/commons/8/89/7126_-_Luzern_-_Chicken_%26_pasta.JPG'),
    new Recipe('Another Test Recipe', 'This is another test recipe',
      'https://upload.wikimedia.org/wikipedia/commons/8/89/7126_-_Luzern_-_Chicken_%26_pasta.JPG')
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
