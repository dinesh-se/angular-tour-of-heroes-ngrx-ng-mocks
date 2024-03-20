import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MessageService } from '@services/message.service';
import { Hero } from '@model/hero';
import { HEROES } from '@mocks/heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');

    return heroes;
  }
}
