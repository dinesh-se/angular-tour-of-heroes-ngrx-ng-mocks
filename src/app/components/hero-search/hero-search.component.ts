import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs/operators';

import { HeroService } from '@services/hero.service';
import { Hero } from '@model/hero';
import { Store } from '@ngrx/store';
import { HeroesState } from '@store/hero.reducer';
import { searchHeroes } from '@store/hero.action';
import { selectSearchResults } from '@store/hero.selector';

@Component({
  selector: 'app-hero-search',
  standalone: true,
  imports: [NgFor, RouterLink, AsyncPipe],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.scss'
})
export class HeroSearchComponent implements OnInit {
  searchResults$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private store: Store<HeroesState>) {}

  ngOnInit(): void {
    this.searchResults$ = this.store.select(selectSearchResults);
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged())
      .subscribe(query => {
        this.search(query);
      });
  }

    onInputChange(query: string) {
      this.searchTerms.next(query);
    }

    search(name: string): void {
      this.store.dispatch(searchHeroes({ name }));
    }
}
