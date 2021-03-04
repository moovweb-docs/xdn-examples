import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CMSService } from '../../service/cms.service'
import { ICategory } from '../../../xdn/cms'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [CMSService],
})
export class HeaderComponent implements OnInit {
  categories: Array<ICategory> = []
  activeCategory: string = ''

  constructor(public cmsService: CMSService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.activeCategory = params.name
    })
    this.cmsService.getCategories().subscribe((data: any) => (this.categories = data))
  }
}
