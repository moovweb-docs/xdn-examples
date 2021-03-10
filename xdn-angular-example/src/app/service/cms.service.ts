import { from, defer } from 'rxjs'
import * as cms from '../../xdn/cms'
export class CMSService {
  getCategories() {
    return defer(() => from(cms.getCategories()))
  }

  getProductsByCategory(categoryName: string) {
    return defer(() => from(cms.getProductsByCategory(categoryName)))
  }

  getProductById(productId: string) {
    return defer(() => from(cms.getProductById(productId)))
  }

  getApiUrl = cms.getApiUrl
  getApiPath = cms.getApiPath
  getOptimizedImageUrl = cms.getOptimizedImageUrl
}
