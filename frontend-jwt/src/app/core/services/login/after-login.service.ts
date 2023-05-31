import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenHandlerService } from './token-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AfterLoginService implements CanActivate {

  private loggedInUserId: number = 0;
  private loggedInUserType: string = "";

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.tokenHandler.loggedIn();    
  }

  constructor(private tokenHandler: TokenHandlerService) { }

  setLoggedInUser(id: number, userType: string) {
    this.loggedInUserId = id;
    this.loggedInUserType = userType;
  }

  getLoggedInUserId(): number {
    let result:number = 0;
    const LocalStorageSearch = localStorage.getItem('userId');
    if(LocalStorageSearch) {
      result = JSON.parse(LocalStorageSearch).id;
    } else {
      result = this.loggedInUserId;
    }
    return result;
  }

  getLoggedInUserType(): string {
    let result:string = "";
    const LocalStorageSearch = localStorage.getItem('userId');
    if(LocalStorageSearch) {
      result = JSON.parse(LocalStorageSearch).userType;
    } else {
      result = this.loggedInUserType;
    }
    return result;
  }

  removeLoggedInUser() {
    this.loggedInUserId = 0;
    this.loggedInUserType = "";
  }

}
