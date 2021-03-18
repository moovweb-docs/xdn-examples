import { Component, Input, OnInit } from '@angular/core'
import { prefetch } from '@xdn/prefetch/window'

@Component({
  selector: 'app-prefetch',
  template: `<ng-content></ng-content>`,
})
export class PrefetchComponent implements OnInit {
  @Input() href: string = ''

  constructor() {}

  ngOnInit(): void {
    prefetch(this.href)
  }
}
