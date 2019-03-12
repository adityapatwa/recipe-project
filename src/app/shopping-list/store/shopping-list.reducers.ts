import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface AppState {
  shoppingList: State;
}

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apple', 5),
    new Ingredient('Tomato', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    // Add Ingredient
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

    // Delete Ingredient
    case ShoppingListActions.DELETE_INGREDIENT: {
      const oldIngredients = [...state.ingredients];
      oldIngredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: oldIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    }

    // Update Ingredient
    case ShoppingListActions.UPDATE_INGREDIENT: {
      const ingredient = state.ingredients[state.editedIngredientIndex];

      // Updating the existing ingredient with the new ingredient
      /* The method used below for updating the existing ingredient does not create a new
      * Ingredient object and modifies the existing ones*/
      const updatedIngredient = {
        ...ingredient,
        ...action.payLoad
      };

      const ingredients = [...state.ingredients];
      ingredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients: ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    }

    // Return the ingredient which needs to be edited
    case ShoppingListActions.START_EDIT_INGREDIENT: {
      const editedIngredient = {...state.ingredients[action.payLoad]};
      return {
        ...state,
        editedIngredient,
        editedIngredientIndex: action.payLoad
      };
    }

    // Reset the state of the shopping list component when navigating away from the Component
    case ShoppingListActions.STOP_EDIT_INGREDIENT: {
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    }
    default:
      return state;
  }
}
