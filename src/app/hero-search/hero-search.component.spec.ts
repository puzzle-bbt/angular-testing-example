import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { HeroService } from '../hero.service';

import {HeroSearchComponent} from "./hero-search.component";
import {Hero} from "../hero";

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;
  let searchService;
  let getSearchSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    searchService = jasmine.createSpyObj('HeroService', ['searchHeroes']);
    getSearchSpy = searchService.searchHeroes;

    TestBed
      .configureTestingModule({
        declarations: [HeroSearchComponent],
        imports: [RouterTestingModule.withRoutes([])],
        providers: [{provide: HeroService, useValue: searchService}]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Top Heroes" as headline', () => {
    expect(fixture.nativeElement.querySelector('label').textContent).toEqual('Hero Search');
  });

  it('should display 1 Hero', waitForAsync(() => {
    getSearchSpy("Narco");
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('li').length).toEqual(0);
  }));

  it('should call searchservice', waitForAsync(() => {
    getSearchSpy("Narco");
    fixture.detectChanges();
    expect(getSearchSpy.calls.any()).toBe(true);
  }));

});
