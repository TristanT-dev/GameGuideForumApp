import { Injectable } from '@angular/core';

import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { ApiGameGuide } from './data-model-classes';
import { DataModelManagerService } from './data-model-manager.service';

@Injectable()
export class GuardAuthService implements CanActivate {

  // Initialization

  constructor(
    private auth: AuthService,
    private router: Router,
    private m: DataModelManagerService,
    private guide: ApiGameGuide
  ) { 
    this.guide = new ApiGameGuide();
  }

  // Methods
  async checkUser(id: string) {
    let results = await this.m.apiGameGuideGetById(id);
    results.subscribe(u => {
      this.guide = u;
    });
  }
  

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const id = route.paramMap.get('id');
    
    if(id){
      console.log("id present");
      this.checkUser(id);
    }

    if(!this.auth.isAuthenticated()){
      this.router.navigate(['/login']);
      console.log("failed auth");
      return false;
    }else if(this.auth.currentUser() !== this.guide.author && id){
      this.router.navigate(['/login']);
      console.log("failed username compare");
      return false;
    }else{
      console.log("passed");
      return true;
    }
      
    //console.log(!this.auth.isAuthenticated());
    //console.log(this.auth.getActiveUser() !== this.guide.author);
    //console.log(this.auth.getActiveUser());
    //console.log(this.guide.author);
    /*if (!this.auth.isAuthenticated() || this.auth.getActiveUser() !== this.guide.author) {
      // The following assumes that you have a route named "login"
      this.router.navigate(['/login']);
      return false;
    }
    return true;*/
  }
}
