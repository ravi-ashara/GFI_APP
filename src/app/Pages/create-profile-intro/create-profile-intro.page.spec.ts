import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateProfileIntroPage } from './create-profile-intro.page';

describe('CreateProfileIntroPage', () => {
  let component: CreateProfileIntroPage;
  let fixture: ComponentFixture<CreateProfileIntroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProfileIntroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProfileIntroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
