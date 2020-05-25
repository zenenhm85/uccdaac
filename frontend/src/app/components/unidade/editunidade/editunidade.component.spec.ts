import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditunidadeComponent } from './editunidade.component';

describe('EditunidadeComponent', () => {
  let component: EditunidadeComponent;
  let fixture: ComponentFixture<EditunidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditunidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditunidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
