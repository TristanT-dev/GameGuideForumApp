import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataModelManagerService } from '../data-model-manager.service';
import { ApiGameGuide } from "../data-model-classes";
import { AuthService } from '../auth.service';
import { GuardAuthService } from '../guard-auth.service';


@Component({
  selector: 'app-guide-detail',
  templateUrl: './guide-detail.component.html',
  styleUrls: ['./guide-detail.component.css']
})
export class GuideDetailComponent implements OnInit {

  guide: ApiGameGuide;
  author: string;

  constructor(public a: AuthService, private guard: GuardAuthService, private m: DataModelManagerService, private route: ActivatedRoute) { 
    this.guide = new ApiGameGuide();
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    //this.author = this.route.snapshot.params['author'];
    this.guard.checkUser(id);

    this.m.apiGameGuideGetById(id).subscribe(u => {
        this.guide = u;
    });
  }

}
