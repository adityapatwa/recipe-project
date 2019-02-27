import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { FormsModule } from '@angular/forms';
import { RecipeService } from './recipes/recipe.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { DataStorageService } from './shared/data-storage.service';
import { HttpModule } from '@angular/http';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { RecipesModule } from './recipes/recipes.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    HeaderComponent,
    ShoppingEditComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RecipesModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [AuthService, RecipeService, ShoppingListService, DataStorageService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
