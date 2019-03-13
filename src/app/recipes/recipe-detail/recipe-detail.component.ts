import { Component, OnInit } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as fromRecipe from '../store/recipe.reducers';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Observable<Recipe>;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecipe.RecipeState>
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.store.select('recipes').pipe(take(1), map((recipeState: fromRecipe.State) => {
        return recipeState.recipes[this.id];
      }));
    });
  }

  onDelete() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['../'], {relativeTo: this.route})
      .catch(error => console.log(error));
  }

  toShoppingList() {
    this.recipe.subscribe((recipe) => {
      recipe.ingredients.forEach((ingredient: Ingredient) => {
        this.store.dispatch(new ShoppingListActions.AddIngredient({...ingredient}));
      });
    });
  }

}
