import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const ADD_RECIPE = 'ADD_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const FETCH_RECIPES = 'FETCH_RECIPES';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const SET_RECIPES = 'SET_RECIPES';
export const STORE_RECIPES = 'STORE_RECIPES';

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;
  constructor(public payLoad: Recipe) {
  }
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;
  constructor(public payLoad: number) {
  }
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;
  constructor(public payLoad: {id: number, updatedRecipe: Recipe}) {
  }
}

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;
  constructor(public payLoad: Recipe[]) {
  }
}

export class StoreRecipes implements Action {
  readonly type = STORE_RECIPES;
}

export type RecipeActions = AddRecipe | DeleteRecipe | FetchRecipes | UpdateRecipe | SetRecipes | StoreRecipes;
