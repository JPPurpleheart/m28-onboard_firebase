import { Injectable } from '@angular/core';
import { TokenHandlerService } from './token-handler.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthHandlerService {

  private loggedIn = new BehaviorSubject<boolean>(this.tokenHandler.loggedIn());
  authStatus = this.loggedIn.asObservable();

  changeAuthStatus(value: boolean) {
    //
  }

  constructor(private tokenHandler: TokenHandlerService) { }
}
