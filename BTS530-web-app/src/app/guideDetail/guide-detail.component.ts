import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataModelManagerService } from '../data-model-manager.service';
import { ApiGameGuide, ApiGuideComment } from "../data-model-classes";
import { AuthService } from '../auth.service';
import { GuardAuthService } from '../guard-auth.service';
import { $ } from 'protractor';


@Component({
  selector: 'app-guide-detail',
  templateUrl: './guide-detail.component.html',
  styleUrls: ['./guide-detail.component.css']
})
export class GuideDetailComponent implements OnInit {

  guide: ApiGameGuide;
  author: string;
  guideComment: ApiGuideComment;
  commentUploadStatus: boolean;
  emptyComment: boolean;
  showAllComment: boolean;
  userComments: [];

  constructor(public a: AuthService, private guard: GuardAuthService, private m: DataModelManagerService, private route: ActivatedRoute) { 
    this.guide = new ApiGameGuide();
    this.guideComment = new ApiGuideComment();

    
    this.guideComment.content = '';
    this.guideComment.like = 0;
    this.guideComment.dislikes = 0;

    this.commentUploadStatus = null;
    this.showAllComment = false;
    this.emptyComment = this.guideComment.content === '' ? null : false;
    this.userComments = [];
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    //this.author = this.route.snapshot.params['author'];
    this.guard.checkUser(id);

    this.m.apiGameGuideGetById(id).subscribe(u => {
      console.log(u)
        this.guide = u;
    });

  }

  handleShowComments(): void{
    this.showAllComment = !this.showAllComment;
  }

  onSave(): void {

    if(this.guideComment.content){
      let user = this.a.currentUser()
      this.guideComment.author = user;
      console.log(this.guideComment.content,user)
      let id = this.route.snapshot.params['id'];
  
      this.m.apiGameGuideAddComment(id, this.guideComment).subscribe(u => {
        console.log(u)
        if(u?._id){
          this.handleUpadate(u);
          this.commentUploadStatus = true;
          this.emptyComment = null;
        }
        else{
          this.commentUploadStatus = true;
          this.emptyComment = null;
        }
        // this.router.navigate([`/game-guides/detail/${this.guideResult._id}`]);
      });
    }
    else{
      this.emptyComment = true;
    }

  }

  handleUpadate(u):void{
    console.log('hello',u)
    this.guide = u;
  }

  handleCommentDelete(event): void{
    console.log(event.target.id)

    let id = event.target.id;

    this.m.apiCommentGuideDeleteComment(id).subscribe(u => {
      console.log(u)
      if(u?._id){
        this.handleUpadate(u);
        // this.guide = u;
        // this.commentUploadStatus = true;
        // this.emptyComment = null;
      }
      else{
        // this.commentUploadStatus = true;
        // this.emptyComment = null;
      }
      // this.router.navigate([`/game-guides/detail/${this.guideResult._id}`]);
    });
  }

}
