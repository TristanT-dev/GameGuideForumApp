import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataModelManagerService } from '../data-model-manager.service';
import { ApiForum} from "../data-model-classes";

@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.component.html',
  styleUrls: ['./forum-detail.component.css']
})
export class ForumDetailComponent implements OnInit {

  forum: ApiForum;

  constructor(private m: DataModelManagerService, private route: ActivatedRoute) { 
    this.forum= new ApiForum();
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];

    this.m.apiForumByID(id).subscribe(u => {
        this.forum = u;
    });
  }

}

