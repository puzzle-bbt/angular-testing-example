import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HeroService } from '../hero.service';
import { HEROES } from '../mock-heroes';
import { HeroDetailComponent } from './hero-detail.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';


describe('Example HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let heroService: jasmine.SpyObj<HeroService>;
  let locationSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    heroService = jasmine.createSpyObj('HeroService', ['getHero']);
    locationSpy = jasmine.createSpyObj('Location',['back']);

    TestBed
      .configureTestingModule({
        declarations: [HeroDetailComponent],
        imports: [FormsModule, RouterTestingModule.withRoutes(
          [ {path: '', component: HeroDetailComponent, data: {id: 11}} ]
        )],
        providers: [
          {provide: ActivatedRoute, useValue: {snapshot: {paramMap: convertToParamMap({id: '11'})}}},
          {provide: HeroService, useValue: heroService},
          {provide: Location, useValue: locationSpy}
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;

    heroService.getHero.and.returnValue(of(HEROES[0]));
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display the hero', waitForAsync(() => {
    expect(heroService.getHero).toHaveBeenCalledWith(11);

    // title
    expect(fixture.nativeElement.querySelector('h2').textContent).toEqual(HEROES[0].name.toUpperCase() + ' Details');
    // id
    expect(
      fixture.nativeElement.querySelector('div:nth-child(1) > div:nth-child(2)').textContent
    ).toEqual('id: 11');

    // input field
    fixture.whenStable().then(() => {
      const nameInput: HTMLInputElement = fixture.nativeElement.querySelector('#hero-name');
      expect(nameInput.value).toBe('Dr Nice');
    });
  }));

  it('should save a changed hero name', waitForAsync(() => {

  }));

  it('should save a unchanged hero name', waitForAsync(() => {

  }));

  it('should go back without save a changed hero name', waitForAsync(() => {

  }));

  it('should go back without save a unchanged hero name', waitForAsync(() => {

  }));
});
