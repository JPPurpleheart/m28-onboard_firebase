import { Component, OnInit } from '@angular/core';
import { APIConnectionsService } from '../../core/services/login/apiconnections.service';
import { TokenHandlerService } from '../../core/services/login/token-handler.service';
import { AuthHandlerService } from 'src/app/core/services/login/auth-handler.service';
import{ Router } from '@angular/router';
import { AfterLoginService } from 'src/app/core/services/login/after-login.service';
import { UsuarioService } from 'src/app/core/services/usuarios/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
    username: '',
    password: null
  }
  username:string = "";

  constructor(private apiconnection: APIConnectionsService, private tokenHandler: TokenHandlerService, private authHandler: AuthHandlerService, private router: Router, public afterLoginService: AfterLoginService, public userService: UsuarioService) { }

  public error = null;

  ngOnInit(): void {
  }

  submitLogin() {
    this.userService.findUserIdByUsername(this.form.username).subscribe(
      (user:any = {
        id: '',
        userType: ''
      }) => {
        this.afterLoginService.setLoggedInUser(user.id, user.userType);
      });
    return this.apiconnection.login(this.form).subscribe(
      data=>this.handleResponse(data),
      error=>this.handleError(error)
    );
  }

  handleResponse(data:any) {
    this.tokenHandler.handle(data.access_token);
    this.authHandler.changeAuthStatus(true);
    this.router.navigateByUrl('/pathway');
  }

  handleError(error: any) {
    this.error = error.error.error;
  }

}
