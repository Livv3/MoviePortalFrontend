import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovielistbygenrePageComponent } from './movielistbygenre-page.component';

describe('MovielistbygenrePageComponent', () => {
  let component: MovielistbygenrePageComponent;
  let fixture: ComponentFixture<MovielistbygenrePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovielistbygenrePageComponent]
    });
    fixture = TestBed.createComponent(MovielistbygenrePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
