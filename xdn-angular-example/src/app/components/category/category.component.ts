import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CMSService } from '../../service/cms.service'
import { IProduct } from '../../../xdn/cms'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CMSService],
})
export class CategoryComponent implements OnInit {
  products?: IProduct[]

  constructor(public cmsService: CMSService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cmsService
        .getProductsByCategory(params.name)
        .subscribe((data: any) => (this.products = data))
    })
  }
}
