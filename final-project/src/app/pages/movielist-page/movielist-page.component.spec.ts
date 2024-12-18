import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovielistPageComponent } from './movielist-page.component';

describe('MovielistPageComponent', () => {
  let component: MovielistPageComponent;
  let fixture: ComponentFixture<MovielistPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovielistPageComponent]
    });
    fixture = TestBed.createComponent(MovielistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
