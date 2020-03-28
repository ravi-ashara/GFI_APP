import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EventPrivacyPolicyPage } from './event-privacy-policy.page';

describe('EventPrivacyPolicyPage', () => {
  let component: EventPrivacyPolicyPage;
  let fixture: ComponentFixture<EventPrivacyPolicyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPrivacyPolicyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EventPrivacyPolicyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
