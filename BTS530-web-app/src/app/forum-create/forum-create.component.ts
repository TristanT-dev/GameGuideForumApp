import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { DataModelManagerService } from '../data-model-manager.service';
import { ApiForum } from '../data-model-classes';



@Component({
  selector: 'app-forum-create',
  templateUrl: './forum-create.component.html',
  styleUrls: ['./forum-create.component.css']
})
export class ForumCreateComponent implements OnInit {


    
    newForumAdd: ApiForum;
    newForumResult: ApiForum;
   
  
  
    constructor(private m: DataModelManagerService, private router: Router) { 
     
      this.newForumAdd = new ApiForum();
      this.newForumResult = new ApiForum();
      
    }
  
    ngOnInit(): void {
    }
  
    forumSave(): void {
      
      let newForum = new ApiForum();
      let date = new Date();
  
      newForum.author = this.newForumAdd.author;
      newForum.subject = this.newForumAdd.subject;
      newForum.content = this.newForumAdd.content;
  
      newForum.dateCreated = date.toISOString();
  
      this.newForumAdd = newForum;
  
      this.m.apiForumAdd(this.newForumAdd).subscribe(u => {
        this.newForumResult = u;
        this.router.navigate([`/forums/detail/${this.newForumResult._id}`]);
      });
  
    }
  
  }
