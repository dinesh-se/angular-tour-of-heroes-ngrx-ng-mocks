import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AsyncPipe, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Hero } from '@model/hero';
import { HeroDetailComponent } from '@components/hero-detail/hero-detail.component';
import { Store } from '@ngrx/store';
import { HeroesState } from 'src/app/store/hero.reducer';
import { HeroActions } from '@store/hero.action';
import { Observable } from 'rxjs';
import { HeroSelectors } from '@store/hero.selector';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    UpperCasePipe,
    NgIf,
    NgFor,
    HeroDetailComponent,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss'
})
export class HeroesComponent implements OnInit {
  heroes$!: Observable<Hero[]>;

  @ViewChild('heroName') heroName!: ElementRef;

  constructor(private store: Store<HeroesState>) {}

  ngOnInit(): void {
    this.store.dispatch(HeroActions.loadHeroes());
    this.heroes$ = this.store.select(HeroSelectors.selectAllHeroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.store.dispatch(HeroActions.addHero({ name }));
    this.heroName.nativeElement.value = '';
  }

  delete(hero: Hero): void {
    this.store.dispatch(HeroActions.deleteHero({ id: hero.id }))
  }
}
