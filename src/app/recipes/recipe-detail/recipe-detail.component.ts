import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  paramSubscription: Subscription;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private shoppingListStore: Store<fromApp.AppState>
  ) {
  }

  ngOnInit() {
    this.paramSubscription = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  onDelete() {
    this.recipeService.delteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  toShoppingList() {
    this.recipe.ingredients.forEach((ingredient: Ingredient) => {
      this.shoppingListStore.dispatch(new ShoppingListActions.AddIngredient({...ingredient}));
    });
  }

}
