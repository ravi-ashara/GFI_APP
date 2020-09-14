import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TermofServicePage } from './termof-service.page';

describe('TermofServicePage', () => {
  let component: TermofServicePage;
  let fixture: ComponentFixture<TermofServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermofServicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TermofServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
