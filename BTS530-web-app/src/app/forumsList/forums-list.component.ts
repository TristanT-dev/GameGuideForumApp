import { Component, OnInit } from '@angular/core';


import { DataModelManagerService } from '../data-model-manager.service';
import { ApiForum } from "../data-model-classes";

@Component({
  selector: 'app-forums-list',
  templateUrl: './forums-list.component.html',
  styleUrls: ['./forums-list.component.css']
})
export class ForumsListComponent implements OnInit {

  constructor(private m: DataModelManagerService) { }
  forums: ApiForum[];
  forum: ApiForum;
  f: "";
  search: string;
  


  ngOnInit(): void {

    this.m.apiForumGetAll().subscribe(response => this.forums = response);
  }
  doSearch(){
    if(this.search.length >= 2){
      this.m.apiForumGetSome(this.search).subscribe(u => this.forums = u);
    }else{
      this.m.apiForumGetAll().subscribe(u => this.forums = u);
    }
  }

  clear(){
    this.search = "";
    this.m.apiForumGetAll().subscribe(u => this.forums = u);
  }


}
