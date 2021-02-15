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
  author: string;

  singleImageUrl: string;
  imageUrls: string[];

  constructor(private m: DataModelManagerService, private router: Router, private route: ActivatedRoute) { 
    this.guideEditForm = new GameGuideForm();
    this.oldGuideData = new ApiGameGuide();
    this.guideResult = new ApiGameGuide();
    this.categories = new GameGuideCategories();
    this.singleImageUrl = "";
    this.imageUrls = [];
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    //this.author = this.route.snapshot.params['author'];

    this.m.apiGameGuideGetById(this.id).subscribe(u =>  { 
      this.oldGuideData = u
      this.imageUrls = this.oldGuideData.images;
    });
    
  
  }

  addImage(): void {
    if(this.singleImageUrl !== "" && this.imageUrls.length < 3 ){
      this.imageUrls.push(this.singleImageUrl);
    }
    console.log(this.imageUrls);
    this.singleImageUrl = "";
  }

  clearImages(): void {
    this.imageUrls = [];
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

    updatedGuide.images = this.imageUrls;


    this.m.apiGameGuideEdit(this.id, updatedGuide).subscribe(u => {
      this.guideResult = u;
      this.router.navigate([`/game-guides/detail/${this.guideResult._id}`]);
    });

  }
  

}
