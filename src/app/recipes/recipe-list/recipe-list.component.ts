import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is a test recipe', 'https://upload.wikimedia.org/wikipedia/commons/8/89/7126_-_Luzern_-_Chicken_%26_pasta.JPG')
  ];

  constructor() {
  }

  ngOnInit() {
  }
}
