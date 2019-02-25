import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dsService: DataStorageService) {
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
}
