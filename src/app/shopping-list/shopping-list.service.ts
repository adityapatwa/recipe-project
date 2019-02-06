import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomato', 10)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    const index = this.ingredients.findIndex((value) => {
      return value.name === ingredient.name;
    });

    if (index !== -1) {
      this.ingredients[index].amount += ingredient.amount;
    } else {
      this.ingredients.push(ingredient);
    }
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
