import { Component, OnInit } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { APIConnectionsService } from '../../core/services/login/apiconnections.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form = {
    name: null,
    username: null,
    password: null,
    password_confirmation: null
  }

  constructor(private backend: APIConnectionsService) { }

  public error: any = [];

  ngOnInit(): void {
  }

  submitSignup() {
    // console.log(this.form);
    return this.backend.signup(this.form).subscribe(
      data=>console.log(data),
      error=>this.handleError(error)
    );
    
  }

  handleError(error: any){
    this.error = error.error.errors;
  }

}
