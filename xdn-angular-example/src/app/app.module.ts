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
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoryComponent,
    ProductComponent,
    HomeComponent,
    RatingComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('service-worker.js', { enabled: true }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
