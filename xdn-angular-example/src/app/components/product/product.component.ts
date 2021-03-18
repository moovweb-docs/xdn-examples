import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CMSService } from '../../service/cms.service'
import { IProduct } from '../../../xdn/cms'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [CMSService],
})
export class ProductComponent implements OnInit {
  product?: IProduct
  constructor(private cmsService: CMSService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cmsService.getProductById(params.name).subscribe((data: any) => (this.product = data))
    })
  }
}
