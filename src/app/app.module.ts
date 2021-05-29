import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideCartComponent } from './SharedComponent/Navbar/Navbar-Component/sideCart/sideCart.component';
import { SubNavbarComponent } from './SharedComponent/Navbar/Navbar-Component/sub-navbar/sub-navbar.component';
import { SearchComponent } from './SharedComponent/Navbar/Navbar-Component/search/search.component';
import { NavbarComponent } from './SharedComponent/Navbar/navbar/navbar.component';
 import { HomeComponent } from './HomePage/Home/Home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdvComponent } from './HomePage/Adv/Adv.component';
import { ProductCardComponent } from './SharedComponent/Proudactcard/product-card/product-card.component';
import { BarRatingModule } from 'ngx-bar-rating';
import { ProductContainerComponent } from './HomePage/ProudactContainer/productContainer/productContainer.component';
import { CategoryComponent } from './HomePage/Categories/category/category.component';
import { TopCategoriesComponent } from './HomePage/Categories/top-categories/top-categories.component';
import { FooterComponent } from './SharedComponent/Footer/footer/footer.component';
import { ProudactCardVerticalComponent } from './SharedComponent/Proudactcard/proudact-card-vertical/proudact-card-vertical.component';
import { LayoutProductComponent } from './SharedComponent/proudact-layout-vertical/layout-product/layout-product.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    SubNavbarComponent,
    SideCartComponent,
    AdvComponent,
    HomeComponent,
    ProductCardComponent,
    ProductContainerComponent,
    CategoryComponent,
    TopCategoriesComponent,
    FooterComponent,
    ProudactCardVerticalComponent,
    LayoutProductComponent


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    CarouselModule,
    BarRatingModule,
    MatTabsModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
