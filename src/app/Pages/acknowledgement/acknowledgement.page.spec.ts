import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AcknowledgementPage } from './acknowledgement.page';

describe('AcknowledgementPage', () => {
  let component: AcknowledgementPage;
  let fixture: ComponentFixture<AcknowledgementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcknowledgementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AcknowledgementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
