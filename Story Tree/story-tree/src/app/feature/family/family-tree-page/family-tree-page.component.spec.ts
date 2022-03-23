import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyTreePageComponent } from './family-tree-page.component';

describe('FamilyTreePageComponent', () => {
  let component: FamilyTreePageComponent;
  let fixture: ComponentFixture<FamilyTreePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyTreePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyTreePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
