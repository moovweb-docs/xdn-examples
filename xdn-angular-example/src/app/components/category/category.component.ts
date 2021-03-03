import { Component, OnInit } from '@angular/core'

import { ActivatedRoute } from '@angular/router'
import { CMSService, IProduct } from '../../service/cms.service'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CMSService],
})
export class CategoryComponent implements OnInit {
  products?: IProduct[]

  constructor(private cmsService: CMSService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cmsService
        .getProductsByCategory(params.name)
        .subscribe((data: any) => (this.products = data))
    })
  }
}
