import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuemSouEuComponent } from './quem-sou-eu.component';

describe('QuemSouEuComponent', () => {
  let component: QuemSouEuComponent;
  let fixture: ComponentFixture<QuemSouEuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuemSouEuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuemSouEuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
