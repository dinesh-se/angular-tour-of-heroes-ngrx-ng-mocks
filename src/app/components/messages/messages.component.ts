import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

import { MessageService } from '@services/message.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {

  constructor(public messageService: MessageService) {}

}
