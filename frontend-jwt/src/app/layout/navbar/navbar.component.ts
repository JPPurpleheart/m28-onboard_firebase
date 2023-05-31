import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenHandlerService } from 'src/app/core/services/login/token-handler.service';
import { AfterLoginService } from 'src/app/core/services/login/after-login.service';
import { AuthHandlerService } from 'src/app/core/services/login/auth-handler.service';
import { LoginComponent } from 'src/app/public/login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public loggedIn: boolean = false;
  public emptyUsername: any = "";
  public username:any = "";

  constructor(private authHandler: AuthHandlerService, private tokenHandler: TokenHandlerService, private router: Router, private afterLoginService: AfterLoginService, private getUser: LoginComponent) { }

  ngOnInit(): void {
    this.authHandler.authStatus.subscribe(
      value => {
        this.loggedIn = value;
      }
    );
  }

  getUsername() {
    this.username = this.getUser.form.username;
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.tokenHandler.remove();
    this.afterLoginService.removeLoggedInUser();
    this.authHandler.changeAuthStatus(false);
    this.router.navigateByUrl("/login");
  }

}
