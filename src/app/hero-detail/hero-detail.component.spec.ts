import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {Observable, of} from 'rxjs';

import { HeroService } from '../hero.service';
import {HeroDetailComponent} from "./hero-detail.component";
import { SpyLocation } from '@angular/common/testing';
import { Hero } from "../hero";
import {Location} from "@angular/common";
import {By} from "@angular/platform-browser";


describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let heroService;
  let updateSpy: jasmine.Spy;
  let getHeroSpy: jasmine.Spy;

  let location: SpyLocation;

  let fakeHero: Hero | undefined = undefined;
  let fakeGetHero: any;
  let fakeUpdateHero: any;


  beforeEach(waitForAsync(() => {

    fakeGetHero = function (id:number) {
      return of({id:id, name:"FakeHero"});
    }
    fakeUpdateHero = function(hero:Hero) {
      fakeHero = hero;
      return of(undefined);
    }

    heroService = jasmine.createSpyObj('HeroService',
      ['getHero', 'updateHero']);
    heroService.getHero.and.callFake(fakeGetHero);
    heroService.updateHero.and.callFake(fakeUpdateHero);


    TestBed
      .configureTestingModule({
        declarations: [HeroDetailComponent],
        imports: [RouterTestingModule.withRoutes([])],
        providers: [{provide: HeroService, useValue: heroService},
          {provide: Location, useClass: SpyLocation}]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should contain hero with name fakehero', () => {
    expect(fixture.nativeElement.textContent).toContain("FAKEHERO");
  });

  it('should save hero with name FakeHero', () => {
    let saveBtn = fixture.debugElement.query(By.css('.saveButton')).nativeElement;
    saveBtn.click();
    expect(fakeHero?.name).toBe("FakeHero");
  });

  it('change name if hero and save', () => {
    component.hero = {id:10,name:"NewName"};
    fixture.detectChanges();
    let saveBtn = fixture.debugElement.query(By.css('.saveButton')).nativeElement;
    saveBtn.click();
    expect(fakeHero?.name).toBe("NewName");
  });

  it('call go back', () => {
    location = TestBed.get(Location);
    spyOn(location, 'back');
    let backBtn = fixture.debugElement.query(By.css('.backButton')).nativeElement;
    backBtn.click();
    expect(location.back).toHaveBeenCalled();
  });

});
