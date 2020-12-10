import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { NgForm } from '@angular/forms';

import { DataModelManagerService } from '../data-model-manager.service';
import { ApiGameGuide, GameGuideForm, GameGuideCategories } from '../data-model-classes';


@Component({
  selector: 'app-guide-edit',
  templateUrl: './guide-edit.component.html',
  styleUrls: ['./guide-edit.component.css']
})
export class GuideEditComponent implements OnInit {

  guideEditForm: GameGuideForm;
  oldGuideData: ApiGameGuide;
  guideResult: ApiGameGuide;
  categories:  GameGuideCategories;
  id: string;

  constructor(private m: DataModelManagerService, private router: Router, private route: ActivatedRoute) { 
    this.guideEditForm = new GameGuideForm();
    this.oldGuideData = new ApiGameGuide();
    this.guideResult = new ApiGameGuide();
    this.categories = new GameGuideCategories();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.m.apiGameGuideGetById(this.id).subscribe(u =>  { 
      this.oldGuideData = u
    });
     
    
  }

  guideSave(): void {
    
    let updatedGuide = new ApiGameGuide();
    let date = new Date();

    updatedGuide.author = this.oldGuideData.author;
    updatedGuide.fullTitle = this.oldGuideData.fullTitle;
    updatedGuide.shortTitle = this.oldGuideData.shortTitle;
    updatedGuide.description = this.oldGuideData.description;
    updatedGuide.category = this.oldGuideData.category;
    updatedGuide.content = this.oldGuideData.content;

    updatedGuide.dateCreated = this.oldGuideData.dateCreated;
    updatedGuide.dateUpdated = date.toISOString();


    this.m.apiGameGuideEdit(this.id, updatedGuide).subscribe(u => {
      this.guideResult = u;
      this.router.navigate([`/game-guides/detail/${this.guideResult._id}`]);
    });

  }
  

}
