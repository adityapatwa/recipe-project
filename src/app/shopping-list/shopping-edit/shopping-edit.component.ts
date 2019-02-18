import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') ingredientForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemId: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe((id: number) => {
      this.editedItemId = id;
      this.editMode = true;
      this.editedItem = this.shoppingListService.getIngredient(id);
      this.ingredientForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }

  onAddOrEditItem() {
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemId,
        new Ingredient(
          this.ingredientForm.value.name,
          this.ingredientForm.value.amount
        )
      );
    } else {
      this.shoppingListService.addIngredient(new Ingredient(this.ingredientForm.value.name, this.ingredientForm.value.amount));
    }
    this.editMode = false;
    this.ingredientForm.resetForm();
  }

  onClear() {
    this.ingredientForm.resetForm();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemId);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
