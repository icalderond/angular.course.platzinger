import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  operation: string = 'login';
  Email: string = null;
  Password: string = null;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  logIn() {
    console.log("Email", this.Email);
    console.log("Password", this.Password);

    this.authenticationService.loginWithEmail(this.Email, this.Password)
      .then((data) => {
        alert('Accedió correctamente');
        console.log(data);
      }).catch((err) => {
        alert('Ocurrió un error');
        console.log(err);
      });
  }

  register() {
    console.log("Email", this.Email);
    console.log("Password", this.Password);

    this.authenticationService.registerWithEmail(this.Email, this.Password)
      .then((data) => {
        alert('Registrado correctamente');
        console.log(data);
      }).catch((err) => {
        alert('Ocurrió un error');
        console.log(err);
      });
  }
}
