import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, Subscription, fromEvent } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map
} from 'rxjs/operators';

import { Hero } from '@model/hero';
import { Store } from '@ngrx/store';
import { HeroesState } from '@store/hero.reducer';
import { HeroActions } from '@store/hero.action';
import { HeroSelectors } from '@store/hero.selector';

@Component({
  selector: 'app-hero-search',
  standalone: true,
  imports: [NgFor, RouterLink, AsyncPipe, NgIf],
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
    this.searchResults$ = this.store.select(HeroSelectors.selectSearchResults);
    this.searchQuery$ = this.store.select(HeroSelectors.selectQuery);
  }

  ngAfterViewInit(): void {
    this.inputListener = fromEvent(this.searchBox.nativeElement, 'input').pipe(
      map((event: any) => event.target.value),
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((query) => {
      console.log('CAME');
      this.store.dispatch(HeroActions.searchHeroes({ query }));
    });
  }

  ngOnDestroy(): void {
    this.inputListener.unsubscribe();
  }
}
