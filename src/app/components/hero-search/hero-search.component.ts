import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil
} from 'rxjs/operators';

import { Hero } from '@model/hero';
import { Store } from '@ngrx/store';
import { HeroesState } from '@store/hero.reducer';
import { searchHeroes } from '@store/hero.action';
import { selectQuery, selectSearchResults } from '@store/hero.selector';

@Component({
  selector: 'app-hero-search',
  standalone: true,
  imports: [NgFor, RouterLink, AsyncPipe, FormsModule, NgIf],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.scss'
})
export class HeroSearchComponent implements OnInit, OnDestroy {
  searchResults$!: Observable<Hero[]>;
  searchBoxQuery:string = '';

  private searchTerms = new Subject<string>();
  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store<HeroesState>) {}

  ngOnInit(): void {
    this.searchResults$ = this.store.select(selectSearchResults);
    this.store.select(selectQuery).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((query) => {
      this.searchBoxQuery = query;
    })
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged())
      .subscribe(query => {
        this.search(query);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onInputChange(event: Event) {
    this.searchTerms.next((event.target as HTMLInputElement).value);
  }

  search(query: string): void {
    this.store.dispatch(searchHeroes({ query }));
  }
}
