import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { ConversationService } from '../services/conversation.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  friendId: any;
  friend: User;
  user: User;
  conversationId: string;
  textMessage: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private conversationService: ConversationService,
    private authenticationService: AuthenticationService) {

    this.friendId = this.activatedRoute.snapshot.params['uid'];

    // get my user
    this.authenticationService.getStatus().subscribe((session) => {
      this.userService.getUserById(session.uid).valueChanges()
        .subscribe((user: User) => {
          this.user = user;
          this.getFriend();
        });
    });
  }

  ngOnInit(): void {
  }

  getFriend() {
    this.userService.getUserById(this.friendId).valueChanges()
      .subscribe((data: User) => {
        this.friend = data;
        
        //Actualizar el uid de la conversacion
        const ids = [this.user.uid, this.friend.uid].sort();
        this.conversationId = ids.join('|');

      }, (err) => {
        console.log(err);
      });
  }

  sendMessage() {
    const message = {
      uid: this.conversationId,
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      reciver: this.friend.uid
    };

    this.conversationService.createConversation(message)
      .then((data) => {
        this.textMessage = '';
      }).catch((err) => {
        console.log(err);

      });
  }

}
