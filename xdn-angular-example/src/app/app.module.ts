import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './components/header/header.component'
import { CategoryComponent } from './components/category/category.component'
import { ProductComponent } from './components/product/product.component'
import { HomeComponent } from './components/home/home.component'
import { RatingComponent } from './components/rating/rating.component'
import { PrefetchComponent } from './components/prefetch/prefetch.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoryComponent,
    ProductComponent,
    HomeComponent,
    RatingComponent,
    PrefetchComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
