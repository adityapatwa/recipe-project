import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { Response } from '@angular/http';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private dsService: DataStorageService) {
  }

  ngOnInit() {
  }

  onSave() {
    this.dsService.storeRecipes().subscribe((response: Response) => {
      console.log(response);
    });
  }

  onFetch() {
    this.dsService.getRecipes();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
  }

}
