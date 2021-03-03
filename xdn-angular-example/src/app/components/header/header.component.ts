import { Component, OnInit } from '@angular/core'
import { CMSService } from '../../service/cms.service'
import { ICategory } from '../../service/cms.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [CMSService],
})
export class HeaderComponent implements OnInit {
  categories: Array<ICategory> = []

  constructor(private cmsService: CMSService) {}

  ngOnInit(): void {
    this.cmsService.getCategories().subscribe((data: any) => {
      console.log(data)
      this.categories = data
    })
  }
}
