import {MessagesComponent} from "./messages.component";
import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {MessageService} from "../message.service";

class MockMessageService {
  messages: string[] =  [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let messageService: jasmine.SpyObj<MessageService>;
  //let clearSpy: jasmine.Spy;
  //let messagesSpy: jasmine.Spy;
  //let addSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {

    let stubMessages = ['message one', 'message two'];

    messageService = jasmine.createSpyObj('MessageService',
      ['clear', 'add'],
      {'messages': stubMessages});

    messageService.clear.and.identity;

    let mockMessageService = new MockMessageService();
    stubMessages.forEach(message => {
      mockMessageService.add(message);
    });

    TestBed
      .configureTestingModule({
        declarations: [MessagesComponent],
        imports: [RouterTestingModule.withRoutes([])],
        providers: [{provide: MessageService, useValue: mockMessageService}]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Messages" as headline', () => {
    expect(fixture.nativeElement.querySelector('h2').textContent).toEqual('Messages');
  });

  it('should display "Clear messages" as button', () => {
    expect(fixture.nativeElement.querySelector('button').textContent).toEqual('Clear messages');
  });

  it('should display 4 divs', waitForAsync(() => {
    expect(fixture.nativeElement.querySelectorAll('div').length).toEqual(3);
  }));

  it('should add message', waitForAsync(() => {
    expect(fixture.nativeElement.querySelectorAll('div').length).toEqual(3);
  }));

});
