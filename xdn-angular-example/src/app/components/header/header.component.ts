import { Component, OnInit } from '@angular/core'

interface Category {
  name: string
  href: string
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  categories: Array<Category>
  constructor() {
    this.categories = [
      {
        name: 'Hats',
        href: 'category/hats',
      },
      {
        name: 'Shoes',
        href: '/category/shoes',
      },
    ]
  }

  ngOnInit(): void {}
}
