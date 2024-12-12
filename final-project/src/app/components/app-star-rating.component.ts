import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  template: `
    <ng-container *ngIf="rating">
      <mat-icon *ngFor="let star of stars" [ngClass]="{'active': star <= rating}">star</mat-icon>
    </ng-container>
  `,
  styles: [
    `
    .active {
      color: yellow;
    }
    `,
  ],
})
export class StarRatingComponent {
  @Input() rating!: number;
  @Input() maxRating: number = 10;

  stars: number[];

  constructor() {
    this.stars = Array(this.maxRating).fill(0).map((_, i) => i + 1);
  }
}
