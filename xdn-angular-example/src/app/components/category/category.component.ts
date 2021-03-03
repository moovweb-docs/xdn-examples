import { Component, OnInit } from '@angular/core'
import { CMSService } from '../../service/cms.service'
import { IProduct } from '../../service/cms.service'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CMSService],
})
export class CategoryComponent implements OnInit {
  products?: IProduct[]

  constructor(private cmsService: CMSService) {}

  ngOnInit(): void {
    this.cmsService.getProductsByCategory('hats').subscribe((data: any) => (this.products = data))
  }
}
