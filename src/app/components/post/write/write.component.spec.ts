import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteComponent } from './write.component';

describe('CreateComponent', () => {
  let component: WriteComponent;
  let fixture: ComponentFixture<WriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should write', () => {
    expect(component).toBeTruthy();
  });
});
