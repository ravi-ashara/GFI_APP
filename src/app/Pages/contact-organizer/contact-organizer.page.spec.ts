import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactOrganizerPage } from './contact-organizer.page';

describe('ContactOrganizerPage', () => {
  let component: ContactOrganizerPage;
  let fixture: ComponentFixture<ContactOrganizerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactOrganizerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactOrganizerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
