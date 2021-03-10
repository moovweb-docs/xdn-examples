import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent {
  @Input() rating?: string

  get value(): number {
    return Math.round(Number(this.rating))
  }
}
