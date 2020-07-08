import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { ConversationService } from '../services/conversation.service';
import { AuthenticationService } from '../services/authentication.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

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
  conversation: any;
  shake: boolean = false;

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
        // Actualizar el uid de la conversacion
        const ids = [this.user.uid, this.friend.uid].sort();
        console.log('me', this.user);
        console.log('friend', this.friend);
        this.conversationId = ids.join('|');
        this.getConversations();
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
      reciver: this.friend.uid,
      type: 'text'
    };

    this.conversationService.createConversation(message)
      .then((data) => {
        this.textMessage = '';
      }).catch((err) => {
        console.log(err);
      });
  }

  getConversations() {
    this.conversationService.getConversation(this.conversationId).valueChanges()
      .subscribe((data) => {
        this.conversation = data;
        this.conversation.forEach(message => {

          message.seen = true;
          this.conversationService.editConversation(message);

          if (message.type == 'text') {
            if (!message.seen) {
              const audio = new Audio('assets/sound/new_message.m4a');
              audio.play();
            }
          } else if (message == 'zumbido') {
            this.doZumbido();
          }

        });
        console.log(data);
      }, (err) => {
        console.log(err);
      })
  }

  getUserNickById(uid) {
    if (uid === this.friend.uid) {
      return this.friend.nick;
    } else {
      return this.user.nick;
    }
  }

  sendZumbido() {
    const message = {
      uid: this.conversationId,
      timestamp: Date.now(),
      text: null,
      sender: this.user.uid,
      reciver: this.friend.uid,
      type: 'zumbido'
    };

    this.conversationService.createConversation(message).then((data) => { }).catch((err) => { });
    this.doZumbido();
    this.shake = true;
    window.setTimeout(() => {
      this.shake = false;
    }, 1000);
  }

  doZumbido() {
    const audio = new Audio('assets/sound/zumbido.m4a');
    audio.play();
  }
}
