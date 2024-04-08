import { AsyncPipe, NgFor, NgIf, SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroSearchComponent } from '@components/hero-search/hero-search.component';
import { Hero } from '@model/hero';
import { Store } from '@ngrx/store';
import { HeroService } from '@services/hero.service';
import { loadHeroes } from '@store/hero.action';
import { HeroesState } from '@store/hero.reducer';
import { selectAllHeroes, selectHeroesError, selectHeroesLoading } from '@store/hero.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, RouterLink, HeroSearchComponent, AsyncPipe, NgIf, SlicePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
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
}
