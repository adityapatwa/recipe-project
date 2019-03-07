import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
const initialState = {
  ingredients: [
    new Ingredient('Apple', 5),
    new Ingredient('Tomato', 10)
  ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT: {
      const newIngredient = action.payLoad;
      const ingredients = [...state.ingredients];
      const index = ingredients.findIndex((value) => {
        return value.name === newIngredient.name;
      });

      // If Ingredient already exists then increment the value else add the new ingredient in the list
      if (index !== -1) {
        ingredients[index].amount += newIngredient.amount;
      } else {
        ingredients.push(newIngredient);
      }
      return {
        ...state,
        ingredients: ingredients
      };
    }
    default:
      return state;
  }
}
