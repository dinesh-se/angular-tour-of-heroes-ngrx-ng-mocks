import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Hero } from '@model/hero';
import { HeroDetailComponent } from '@components/hero-detail/hero-detail.component';
import { Store } from '@ngrx/store';
import { HeroesState } from 'src/app/store/hero.reducer';
import { addHero, deleteHero, loadHeroes } from 'src/app/store/hero.action';
import { Observable } from 'rxjs';
import { selectAllHeroes, selectHeroesError, selectHeroesLoading } from '@store/hero.selector';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    UpperCasePipe,
    FormsModule,
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
  loading$!: Observable<boolean>;
  error$!: Observable<any>;

  constructor(private store: Store<HeroesState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadHeroes());
    this.heroes$ = this.store.select(selectAllHeroes);
    this.loading$ = this.store.select(selectHeroesLoading);
    this.error$ = this.store.select(selectHeroesError);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.store.dispatch(addHero({ name }));
  }

  delete(hero: Hero): void {
    this.store.dispatch(deleteHero({ id: hero.id }))
  }
}
