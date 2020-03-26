import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookMeetingPage } from './book-meeting.page';

describe('BookMeetingPage', () => {
  let component: BookMeetingPage;
  let fixture: ComponentFixture<BookMeetingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookMeetingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookMeetingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
