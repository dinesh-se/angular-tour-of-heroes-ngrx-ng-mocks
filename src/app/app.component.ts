import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeroesComponent } from './components/heroes/heroes.component';
import { MessagesComponent } from '@components/messages/messages.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeroesComponent,
    MessagesComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Tour of Heroes';
}
