import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { map } from 'rxjs/operators'

const BUILD_ID = 'dev'

const origin = 'https://moovweb-docs-xdn-examples-api-default.moovweb-edge.io'

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
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get(getApiUrl('/category'))
  }

  getProductsByCategory(categoryName: string) {
    return this.http.get(getApiUrl(`/category/${categoryName}`)).pipe(
      map((data: any) => {
        return data.map((item: IProduct) => ({
          ...item,
          picture: getOptimizedImageUrl(item.picture),
        }))
      })
    )
  }

  getProductById(productId: string) {
    return this.http.get(getApiUrl(`/product/${productId}`)).pipe(
      map((data: any) => {
        data.picture = getOptimizedImageUrl(data.picture)
        return data
      })
    )
  }

  getApiUrl = getApiUrl
  getApiPath = getApiPath
  getOptimizedImageUrl = getOptimizedImageUrl
}

export function getApiUrl(path: string) {
  if (typeof window === 'undefined') {
    return `${origin}/${cleanPath(path)}`
  }

  return location.protocol + '//' + location.host + getApiPath(path)
}

export function getApiPath(path: string) {
  return `/api/${BUILD_ID}/${cleanPath(path)}`
}

export function getOptimizedImageUrl(path: string) {
  return `https://opt.moovweb.net?quality=30&height=250&width=250&app=angular&img=${encodeURIComponent(
    origin + path
  )}`
}
