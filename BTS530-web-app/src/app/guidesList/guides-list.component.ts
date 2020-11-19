import { Component, OnInit } from '@angular/core';

import { DataModelManagerService } from '../data-model-manager.service';
import { ApiGameGuide } from "../data-model-classes";


@Component({
  selector: 'app-guides-list',
  templateUrl: './guides-list.component.html',
  styleUrls: ['./guides-list.component.css']
})
export class GuidesListComponent implements OnInit {

  guides: ApiGameGuide[];
  guide: ApiGameGuide;
  searchTerm: string;

  constructor(private m: DataModelManagerService) { 
    this.searchTerm = "";
  }

  ngOnInit(): void {  
    this.m.apiGameGuideGetAll().subscribe(u => this.guides = u);
  }

  doSearch(){
    if(this.searchTerm.length >= 2){
      this.m.apiGameGuideGetSome(this.searchTerm).subscribe(u => this.guides = u);
    }else{
      this.m.apiGameGuideGetAll().subscribe(u => this.guides = u);
    }
  }

  clear(){
    this.searchTerm = "";
    this.m.apiGameGuideGetAll().subscribe(u => this.guides = u);
  }

}
