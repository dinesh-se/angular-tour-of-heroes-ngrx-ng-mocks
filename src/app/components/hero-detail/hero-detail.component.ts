import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AsyncPipe, NgIf, UpperCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Hero } from '@model/hero';
import { HeroesState } from '@store/hero.reducer';
import { HeroActions } from '@store/hero.action';
import { HeroSelectors } from '@store/hero.selector';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [UpperCasePipe, NgIf, AsyncPipe],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss'
})
export class HeroDetailComponent implements OnInit {
  hero$!: Observable<Hero | undefined>;

  @ViewChild('heroName') heroName: ElementRef | undefined;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<HeroesState>
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.hero$ = this.store.select(HeroSelectors.selectHeroById(+id));
  }

  goBack(): void {
    this.location.back();
  }

  save(id: number): void {
    const name = this.heroName?.nativeElement.value;

    if (name) {
      const hero: Hero = { id, name };
      this.store.dispatch(HeroActions.updateHero({ hero }));
      //TODO: refactor to go back when the state update is completed
      this.goBack();
    }
  }
}
