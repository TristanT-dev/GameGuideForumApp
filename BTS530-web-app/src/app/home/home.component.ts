import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DataModelManagerService } from '../data-model-manager.service';

import { ApiGameGuide } from "../data-model-classes";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  guides: ApiGameGuide[];


  constructor(public a: AuthService, private m: DataModelManagerService) { 

  }

  ngOnInit(): void {
    if(this.a.currentUser() != ''){
      this.m.apiGameGuideGetByAuthor(this.a.currentUser()).subscribe(u => {
        this.guides = u;
      });
    }
  }
}
