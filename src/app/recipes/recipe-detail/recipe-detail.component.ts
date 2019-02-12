import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  paramSubscription: Subscription;
  id: number;

  constructor(private shoppingListService: ShoppingListService, private recipeService: RecipeService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.paramSubscription = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  toShoppingList() {
    this.recipe.ingredients.forEach((ingredient: Ingredient) => {
      this.shoppingListService.addIngredient({...ingredient});
    });
  }

}
