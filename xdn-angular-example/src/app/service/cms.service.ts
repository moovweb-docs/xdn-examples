import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError, retry, map } from 'rxjs/operators'

const BUILD_ID = 'dev'

function cleanPath(path: string) {
  return path.replace(/^\//, '')
}

export interface ICategory {
  category: string
  categoryName: string
  href: string
  items: Array<IProduct>
}

export interface IProduct {
  _id: string
  description: string
  href: string
  name: string
  picture: string
  price: string
  rating: string
  reviews: number
}

@Injectable({
  providedIn: 'root',
})
export class CMSService {
  private origin = 'https://moovweb-docs-xdn-examples-api-default.moovweb-edge.io'

  constructor(private http: HttpClient) {}

  getApiUrl(path: string) {
    if (typeof window === 'undefined') {
      return `${this.origin}/${cleanPath(path)}`
    }

    return location.protocol + '//' + location.host + this.getApiPath(path)
  }

  getApiPath(path: string) {
    return `/api/${BUILD_ID}/${cleanPath(path)}`
  }

  getOptimizedImageUrl(path: string) {
    return `https://opt.moovweb.net?quality=30&height=250&width=250&app=angular&img=${encodeURIComponent(
      this.origin + path
    )}`
  }

  getCategories() {
    console.log('get categories')
    return this.http.get(this.getApiUrl('/category'))
  }

  getProductsByCategory(categoryName: string) {
    return this.http.get(this.getApiUrl(`/category/${categoryName}`)).pipe(
      map((data: any) => {
        return data.map((item: IProduct) => ({
          ...item,
          picture: this.getOptimizedImageUrl(item.picture),
        }))
      })
    )
  }

  getProductById(productId: string) {
    return this.http.get(this.getApiUrl(`/product/${productId}`)).pipe(
      map((data: any) => {
        data.picture = this.getOptimizedImageUrl(data.picture)
        return data
      })
    )
  }
}
