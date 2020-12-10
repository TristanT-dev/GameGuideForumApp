import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { DataModelManagerService } from '../data-model-manager.service';
import { ApiGameGuide, GameGuideForm, GameGuideCategories } from '../data-model-classes';


@Component({
  selector: 'app-guide-create',
  templateUrl: './guide-create.component.html',
  styleUrls: ['./guide-create.component.css']
})
export class GuideCreateComponent implements OnInit {

  newGuideForm: GameGuideForm;
  newGuideAdd: ApiGameGuide;
  newGuideResult: ApiGameGuide;
  categories:  GameGuideCategories;


  constructor(private m: DataModelManagerService, private router: Router) { 
    this.newGuideForm = new GameGuideForm();
    this.newGuideAdd = new ApiGameGuide();
    this.newGuideResult = new ApiGameGuide();
    this.categories = new GameGuideCategories();
  }

  ngOnInit(): void {
  }

  guideSave(): void {
    
    let newGameGuide = new ApiGameGuide();
    let date = new Date();

    newGameGuide.author = this.newGuideForm.author;
    newGameGuide.fullTitle = this.newGuideForm.fullTitle;
    newGameGuide.shortTitle = this.newGuideForm.shortTitle;
    newGameGuide.description = this.newGuideForm.description;
    newGameGuide.category = this.newGuideForm.category;
    newGameGuide.content = this.newGuideForm.content;

    newGameGuide.dateCreated = date.toISOString();

    this.newGuideAdd = newGameGuide;

    this.m.apiGameGuideAdd(this.newGuideAdd).subscribe(u => {
      this.newGuideResult = u;
      this.router.navigate([`/game-guides/detail/${this.newGuideResult._id}`]);
    });

  }

}




