import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VoluntaryPage } from './voluntary.page';

describe('VoluntaryPage', () => {
  let component: VoluntaryPage;
  let fixture: ComponentFixture<VoluntaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoluntaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VoluntaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
