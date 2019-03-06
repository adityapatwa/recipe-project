import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes() {
    // return this.httpClient.put(
    //   'https://ng-recipe-book-63da1.firebaseio.com/recipes.json',
    //   this.recipeService.getRecipes(), {
    //     params: new HttpParams().set('auth', token)
    //   }
    // );
    const req = new HttpRequest(
      'PUT',
      'https://ng-recipe-book-63da1.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(),
      {reportProgress: true}
    );

    return this.httpClient.request(req);
  }

  getRecipes() {
    this.httpClient.get<Recipe[]>('https://ng-recipe-book-63da1.firebaseio.com/recipes.json')
      .pipe(map((recipes) => {
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      })).subscribe((recipes: Recipe[]) => {
      this.recipeService.setRecipes(recipes);
    });
  }
}
