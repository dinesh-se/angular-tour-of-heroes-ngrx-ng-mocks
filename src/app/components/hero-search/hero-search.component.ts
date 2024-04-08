import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable, Subscription, fromEvent } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  tap
} from 'rxjs/operators';

import { Hero } from '@model/hero';
import { Store } from '@ngrx/store';
import { HeroesState } from '@store/hero.reducer';
import { searchHeroes } from '@store/hero.action';
import { selectQuery, selectSearchResults } from '@store/hero.selector';

@Component({
  selector: 'app-hero-search',
  standalone: true,
  imports: [NgFor, RouterLink, AsyncPipe, FormsModule, NgIf, ],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.scss'
})
export class HeroSearchComponent implements OnInit, AfterViewInit, OnDestroy {
  searchResults$!: Observable<Hero[]>;
  searchQuery$!: Observable<string>;

  @ViewChild('searchBox') searchBox!: ElementRef;

  private inputListener = new Subscription();

  constructor(private store: Store<HeroesState>) {}

  ngOnInit(): void {
    this.searchResults$ = this.store.select(selectSearchResults);
    this.searchQuery$ = this.store.select(selectQuery);
  }

  ngAfterViewInit(): void {
    this.inputListener = fromEvent(this.searchBox.nativeElement, 'input').pipe(
      map((event: any) => event.target.value),
      debounceTime(300),
      distinctUntilChanged(),
      tap((query: string) => {
        this.store.dispatch(searchHeroes({ query }));
      })).subscribe();
  }

  ngOnDestroy(): void {
    this.inputListener.unsubscribe();
  }
}
