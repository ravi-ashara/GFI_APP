import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConferenceBookPage } from './conference-book.page';

describe('ConferenceBookPage', () => {
  let component: ConferenceBookPage;
  let fixture: ComponentFixture<ConferenceBookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConferenceBookPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConferenceBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
