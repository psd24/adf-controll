import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CameraTypePage } from './camera-type.page';

describe('CameraTypePage', () => {
  let component: CameraTypePage;
  let fixture: ComponentFixture<CameraTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraTypePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CameraTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
