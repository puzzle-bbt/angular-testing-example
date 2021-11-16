import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { HeroService } from '../hero.service';
import { HEROES } from '../mock-heroes';

import { DashboardComponent } from './dashboard.component';

describe('Example Component Tests', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let heroService: jasmine.SpyObj<HeroService>;
  let getHeroesSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    heroService = jasmine.createSpyObj('HeroService', ['getHeroes']);
    getHeroesSpy = heroService.getHeroes.and.returnValue(of(HEROES));
    TestBed
      .configureTestingModule({
        declarations: [DashboardComponent, HeroSearchComponent],
        imports: [RouterTestingModule.withRoutes([])],
        providers: [{provide: HeroService, useValue: heroService}]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('test with the SpyObj', waitForAsync(() => {
    expect(heroService.getHeroes).toHaveBeenCalled();
    expect(heroService.getHeroes).toHaveBeenCalledWith(); // with zero parameters
    expect(heroService.getHeroes).toHaveBeenCalledTimes(1);
    expect(heroService.getHeroes).not.toHaveBeenCalledTimes(35);

    // Check whether this spy has been invoked.
    expect(heroService.getHeroes.calls.any()).toBe(true);
    // Get the number of invocations of this spy.
    expect(heroService.getHeroes.calls.count()).toBe(1);
  }));

  it('test with a specific Spy', waitForAsync(() => {
    expect(getHeroesSpy).toHaveBeenCalled();
    expect(getHeroesSpy).toHaveBeenCalledWith(); // with zero parameters
    expect(getHeroesSpy).toHaveBeenCalledTimes(1);
    expect(getHeroesSpy).not.toHaveBeenCalledTimes(35);

    // Check whether this spy has been invoked.
    expect(getHeroesSpy.calls.any()).toBe(true);
    // Get the number of invocations of this spy.
    expect(getHeroesSpy.calls.count()).toBe(1);
  }));

  it('demonstrate the spy.reset()', waitForAsync(() => {
    // Get the number of invocations of this spy.
    expect(getHeroesSpy.calls.count()).toBe(1);
    getHeroesSpy.calls.reset();
    expect(getHeroesSpy.calls.count()).toBe(0);
  }));

  xit('this test is disabled', () => {
    expect(true).toBe(false);
  });

  // use 'fit' for focus
  it('If specs are focused with fit, only those that are focused will be executed.', () => {
    expect(true).toBe(true);
  });

  // use 'fdescribe' for focus
  describe('If suites are focused fdescrible, only those that are focused will be executed.', () => {
    it('a test in the focused describe', () => {
      expect(true).toBe(true);
    });
  });
});
