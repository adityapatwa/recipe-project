import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import { AppState } from '../../store/app.reducers';

export interface RecipeState extends AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
    new Recipe('A Test Recipe', 'This is a test recipe',
      'https://upload.wikimedia.org/wikipedia/commons/8/89/7126_-_Luzern_-_Chicken_%26_pasta.JPG',
      [new Ingredient('Tomato', 5), new Ingredient('Chillies', 8)]),
    new Recipe('Another Test Recipe', 'This is another test recipe',
      'https://upload.wikimedia.org/wikipedia/commons/8/89/7126_-_Luzern_-_Chicken_%26_pasta.JPG',
      [new Ingredient('Bread', 2), new Ingredient('Cucumber', 4)])
  ],
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case RecipeActions.ADD_RECIPE: {
      return {
        ...state,
        recipes: [...state.recipes, action.payLoad]
      };
    }
    case RecipeActions.DELETE_RECIPE: {
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payLoad);
      return {
        ...state,
        recipes: oldRecipes
      };
    }
    case RecipeActions.UPDATE_RECIPE: {
      const oldRecipe = state.recipes[action.payLoad.id];

      const updatedRecipe = {
        ...oldRecipe,
        ...action.payLoad.updatedRecipe
      };

      const recipes = [...state.recipes];
      recipes[action.payLoad.id] = updatedRecipe;

      return {
        ...state,
        recipes: recipes
      };
    }
    case RecipeActions.SET_RECIPES: {
      return {
        ...state,
        recipes: [...action.payLoad]
      };
    }
    default:
      return state;

  }

}
