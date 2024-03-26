import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, UpperCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '@model/hero';
import { Store } from '@ngrx/store';
import { HeroesState } from '@store/hero.reducer';
import { updateHero } from '@store/hero.action';
import { selectHeroById } from '@store/hero.selector';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [FormsModule, UpperCasePipe, NgIf],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss'
})
export class HeroDetailComponent implements OnInit {
  hero!: Hero;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<HeroesState>
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.store.select(selectHeroById(+id)).subscribe(hero => {
      if(hero) {
        this.hero = {
          id: hero.id,
          name: hero.name
        };
      }
    })
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.store.dispatch(updateHero({ hero: this.hero }));
      //TODO: refactor to go back when the state update is completed
      this.goBack();
    }
  }
}
