import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {

    this.authenticationService.getStatus()
      .subscribe((status) => {
        this.userService.getUserById(status.uid).valueChanges()
          .subscribe((data: User) => {
            this.user = data;
            console.log(this.user);
          }, (err) => {
            console.log(err);
          })
      }, (err) => {
        console.log(err);
      });
  }

  ngOnInit(): void {
  }

  saveSettings() {
    this.userService.editUser(this.user)
      .then(() => {
        alert('Cambios gurdardos');
      }).catch((err) => {
        alert('Hubo un error');
        console.log(err);
      });
  }

}
