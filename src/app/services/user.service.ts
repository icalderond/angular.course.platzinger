import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { User, State } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private angularFireDatabase: AngularFireDatabase) {
  }
 
  getUsers() {
    return this.angularFireDatabase.list('/users');
  }

  getUserById(uid) {
    return this.angularFireDatabase.object('/users/' + uid);
  }

  createUser(user) {
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }

  editUser(user) {
    return this.angularFireDatabase.object('/useres/' + user.uid).set(user);
  }
}
