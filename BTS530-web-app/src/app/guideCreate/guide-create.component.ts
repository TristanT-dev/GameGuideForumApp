import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { DataModelManagerService } from '../data-model-manager.service';
import { ApiGameGuide, GameGuideForm, GameGuideCategories } from '../data-model-classes';
import { AuthService } from '../auth.service';


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
  currentUser: string;

  singleImageUrl: string;
  imageUrls: string[];



  constructor(public a: AuthService, private m: DataModelManagerService, private router: Router) { 
    this.newGuideForm = new GameGuideForm();
    this.newGuideAdd = new ApiGameGuide();
    this.newGuideResult = new ApiGameGuide();
    this.categories = new GameGuideCategories();
    this.singleImageUrl = "";
    this.imageUrls = [];
  }

  ngOnInit(): void {
    this.currentUser = this.a.currentUser();
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

    let newGameGuide = new ApiGameGuide();
    let date = new Date();

    

    //newGameGuide.author = this.newGuideForm.author;
    newGameGuide.author = this.currentUser;
    newGameGuide.fullTitle = this.newGuideForm.fullTitle;
    newGameGuide.shortTitle = this.newGuideForm.shortTitle;
    newGameGuide.description = this.newGuideForm.description;
    newGameGuide.category = this.newGuideForm.category;
    newGameGuide.content = this.newGuideForm.content;

    newGameGuide.dateCreated = date.toISOString();

    newGameGuide.images = this.imageUrls;
    console.log(newGameGuide);

    this.newGuideAdd = newGameGuide;

    console.log(this.newGuideAdd);

    this.m.apiGameGuideAdd(this.newGuideAdd).subscribe(u => {
      this.newGuideResult = u;
      //this.router.navigate([`/game-guides/detail/${this.newGuideResult._id}/${this.newGuideResult.author}`]);
      this.router.navigate([`/game-guides/detail/${this.newGuideResult._id}`]);
    });

  }

}




