import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CategoryComponent } from './components/category/category.component'
import { ProductComponent } from './components/product/product.component'
import { HomeComponent } from './components/home/home.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category/:name', component: CategoryComponent },
  { path: 'product/:name', component: ProductComponent },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
