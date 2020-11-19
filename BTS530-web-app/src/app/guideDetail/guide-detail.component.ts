import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataModelManagerService } from '../data-model-manager.service';
import { ApiGameGuide } from "../data-model-classes";


@Component({
  selector: 'app-guide-detail',
  templateUrl: './guide-detail.component.html',
  styleUrls: ['./guide-detail.component.css']
})
export class GuideDetailComponent implements OnInit {

  guide: ApiGameGuide;

  constructor(private m: DataModelManagerService, private route: ActivatedRoute) { 
    this.guide = new ApiGameGuide();
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];

    this.m.apiGameGuideGetById(id).subscribe(u => {
        this.guide = u;
    });
  }

}
