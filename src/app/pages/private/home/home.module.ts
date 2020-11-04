import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InboxChatComponent } from './components/inbox-chat/inbox-chat.component';
import { ChatAreaComponent } from './components/chat-area/chat-area.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ProfileBarComponent } from './components/profile-bar/profile-bar.component';

@NgModule({
  declarations: [
    HomeComponent,
    InboxChatComponent,
    ChatAreaComponent,
    ChatMessageComponent,
    ContactsComponent,
    ProfileBarComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class HomeModule {}
