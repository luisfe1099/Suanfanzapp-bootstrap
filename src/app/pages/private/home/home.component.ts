import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserI } from 'src/app/shared/interfaces/UserI';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChatService } from 'src/app/shared/services/chat.service';
import { PersonService } from 'src/app/shared/services/person.service';
import { ChatI } from './interfaces/ChatI';
import { MessageI } from './interfaces/MessageI';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  user: UserI = {
    email: '',
    lastname: '',
    name: '',
    number: 0,
    password: ''
  };
  chat2I: ChatI = {
    icon: '',
    isRead: false,
    lastMsg: '',
    msgPreview: '',
    msgs: [],
    title: ''
  };

  subscriptionList: {
    connection: Subscription;
    msgs: Subscription;
  } = {
      connection: undefined,
      msgs: undefined,
    };

  chats2: Array<ChatI> = [];

  chats: Array<ChatI> = [
    {
      title: 'Santi',
      icon: 'https://picsum.photos/200/300?random=1',
      isRead: true,
      msgPreview: 'entonces ando usando fotos reales hahaha',
      lastMsg: '11:13',
      msgs: [
        {
          content: 'Lorem ipsum dolor amet',
          isRead: true,
          isMe: true,
          time: '7:24',
        },
        { content: 'Qué?', isRead: true, isMe: false, time: '7:25' },
      ],
    },
    {
      title: 'Pablo Bejarano',
      icon: 'https://picsum.photos/200/300?random=2',
      isRead: true,
      msgPreview: 'Estrenando componente',
      lastMsg: '18:30',
      msgs: [
        {
          content: 'Lorem ipsum dolor amet',
          isRead: true,
          isMe: true,
          time: '7:24',
        },
        { content: 'Qué?', isRead: true, isMe: false, time: '7:25' },
      ],
    },
    {
      title: 'Pablo Bejarano 2',
      icon: 'https://picsum.photos/200/300?random=3',
      isRead: true,
      msgPreview: 'Nice front 😎',
      lastMsg: '23:30',
      msgs: [],
    },
  ];

  currentChat = {
    title: '',
    icon: '',
    msgs: [],
  };

  constructor(
    public authService: AuthService,
    public chatService: ChatService,
    public personService: PersonService
  ) { }

  ngOnInit(): void {
    this.initChat();
    this.user = JSON.parse(localStorage.getItem('user'));
    this.findContactList();
  }
  findContactList() {
    this.personService.contactList(this.user[0].number).subscribe(data => {
      console.log(data);
      data.forEach(res => {
        this.chat2I.title = res.tittle;
        this.chat2I.icon = res.icon;
        /*
        this.personService.lastMessage(res.chat_id).subscribe(data1 => {
          this.chat2I.msgPreview = data1[0].msgPreview;
          this.chat2I.lastMsg = data1[0].date;
          this.personService.allMessage(res.chat_id).subscribe(data2 => {
            this.chat2I.msgs = data2;
            //console.log(this.chat2I);;
          })
        })*/
        console.log(this.chat2I);
        this.chat2I = {
          icon: '',
          isRead: false,
          lastMsg: '',
          msgPreview: '',
          msgs: [],
          title: ''
        };
      });
    })
  }
  ngOnDestroy(): void {
    this.destroySubscriptionList();
    this.chatService.disconnect();
  }

  initChat() {
    if (this.chats.length > 0) {
      this.currentChat.title = this.chats[0].title;
      this.currentChat.icon = this.chats[0].icon;
      this.currentChat.msgs = this.chats[0].msgs;
    }
    this.subscriptionList.connection = this.chatService
      .connect()
      .subscribe((_) => {
        console.log('Nos conectamos');
        this.subscriptionList.msgs = this.chatService
          .getNewMsgs()
          .subscribe((msg: MessageI) => {
            msg.isMe = this.currentChat.title === msg.owner ? true : false;
            this.currentChat.msgs.push(msg);
          });
      });
  }

  onSelectInbox(index: number) {
    this.currentChat.title = this.chats[index].title;
    this.currentChat.icon = this.chats[index].icon;
    this.currentChat.msgs = this.chats[index].msgs;
  }

  doLogout() {
    this.authService.logout();
  }

  destroySubscriptionList(exceptList: string[] = []): void {
    for (const key of Object.keys(this.subscriptionList)) {
      if (this.subscriptionList[key] && exceptList.indexOf(key) === -1) {
        this.subscriptionList[key].unsubscribe();
      }
    }
  }
}
