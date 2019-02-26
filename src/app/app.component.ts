import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'recipe-project';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBHou6EgjhCqX6RT56pop32ED9BitSqxz8',
      authDomain: 'ng-recipe-book-63da1.firebaseapp.com'
    });
  }
}
