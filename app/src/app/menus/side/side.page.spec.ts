import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SidePage } from './side.page';

describe('SidePage', () => {
  let component: SidePage;
  let fixture: ComponentFixture<SidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
