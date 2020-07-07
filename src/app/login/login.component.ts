import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  operation: string = 'login';
  Email: string = null;
  Password: string = null;
  Nick: string = null;
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logIn() {

    this.authenticationService.loginWithEmail(this.Email, this.Password)
      .then((data) => {
        alert('Accedió correctamente');
        console.log(data);
        this.router.navigate(['home'])
      }).catch((err) => {
        alert('Ocurrió un error');
        console.log(err);
      });
  }

  register() {
    this.authenticationService.registerWithEmail(this.Email, this.Password)
      .then((data) => {

        const user = {
          uid: data.user.uid,
          email: this.Email,
          nick: this.Nick
        };
        this.userService.createUser(user)
          .then(() => {
            alert('Registrado correctamente');
            console.log(data);
          }).catch((err) => {
            alert('Ocurrió un error');
            console.log(err);
          });

      }).catch((err) => {
        alert('Ocurrió un error');
        console.log(err);
      });
  }
}
