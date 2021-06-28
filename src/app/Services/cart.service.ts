import { Injectable } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../Models/ProductModel';
import {map, filter, tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CartService {


  subtotalPrice = 0;
  totalDiscount = 0;
  totalPrice=0;
  products = [];
  isLoggedIn = false;
  constructor(private locals:LocalStorageService, private http:HttpClient, private userService: UserService) {
    this.userService.loggedIn().subscribe(res => {
      this.isLoggedIn =  res;
      this.calcTotals();
    })
   }

 
  whenLogOut(){
    this.getProductFromRequest().subscribe((res) => {
      const arr = res['result'];
      this.locals.store('cart', JSON.stringify(arr));
    })
  }


  uploadProductsToServer(){
    const arr:Array<any> =  JSON.parse(this.locals.retrieve('cart'));

    if(arr && arr.length && this.isLoggedIn){
      arr.forEach(e => {
        this.addItemToServerCart(e._id, e.quantity).subscribe(() => {
          this.deleteProductFromLocal(e._id);
        });
      })
    }

   setTimeout(() => {
    this.getProductFromRequest().subscribe(res => {
    this.locals.store('cart', JSON.stringify([]));
    this.products = res['result'];
    })
   }, 9000);
  }

  addItemToServerCart(id, quantity): Observable<any>{
   return this.http.post(`https://locage.herokuapp.com/api/v1/carts/product/${id}`, {quantity  });
  }

  clearCart(){
     return this.http.delete(`https://locage.herokuapp.com/api/v1/carts/emptyCart`)
  }

 

  addProduct(product: ProductModel, quantity: number){
    product.quantity = quantity || 0;

    if( this.locals.retrieve('cart')){
        const arr:Array<any> =  JSON.parse(this.locals.retrieve('cart'));
       
   arr.push(product);
   this.locals.store('cart', JSON.stringify(arr));
    }else{
      const arr = [];
      arr.push(product);
   this.locals.store('cart', JSON.stringify(arr));


    }

    this.uploadProductsToServer();
 
  }


  isInCart(product_id){
    
    return this.products.findIndex(e => e._id === product_id) === -1? false : true;
  }

  


  deleteProductFromLocal(_id: string){
    if( this.locals.retrieve('cart')){
      const arr:Array<any> =  JSON.parse(this.locals.retrieve('cart'));
      const index = arr.find(e => e._id == _id);
      if(index != undefined){
        arr.splice(index,1);
      }
      this.locals.store('cart', JSON.stringify(arr));
  }
  this.calcTotals()
  }

  deleteProductFromReq(_id: string){
   return this.http.delete(`https://locage.herokuapp.com/api/v1/carts/product/${_id}`).pipe(
    
    map(() => this.calcTotals())
);
  
  }




  updateProduct(product: ProductModel){
    if( this.locals.retrieve('cart') && !this.isLoggedIn){
      const arr:Array<any> =  JSON.parse(this.locals.retrieve('cart'));
      const index = arr.findIndex(e => e._id == product._id);
      if(index != -1){
        arr[index] = product;
      }
      this.locals.store('cart', JSON.stringify(arr));

      this.calcTotals()
  }else if(this.isLoggedIn){
    this.http.patch(`https://locage.herokuapp.com/api/v1/carts/product/${product._id}`, {"quantity": product.quantity}).subscribe(() => {
      this.calcTotals()

    })
  }
  }



  calcTotals(){
    this.totalDiscount = 0;
    this.subtotalPrice = 0;
    this.totalPrice=0;

    if( this.locals.retrieve('cart') && !this.isLoggedIn){
      this.products =  JSON.parse(this.locals.retrieve('cart'));
      this.products.map(e => {
        this.subtotalPrice += e.price * e.quantity;
        this.totalDiscount += e.discount || 0;
        this.totalPrice += this.subtotalPrice +19 || 0;

      })

  }else if(this.isLoggedIn){
    this.getProductFromRequest().subscribe(res => {
      this.products = res["result"];
      this.products.forEach(e => {
        this.subtotalPrice += e.price * e.quantity;
        this.totalDiscount += e.discount || 0;
        this.totalPrice += this.subtotalPrice +19 || 0;

      });
      console.log('===>', this.products)
    })
  }
  }

  getProductsFromLocal() :any{
    if( this.locals.retrieve('cart')){
        const arr:Array<any> =  JSON.parse(this.locals.retrieve('cart'));
        this.calcTotals()
      return arr
    }
    else{
      return [];
    }
 
  }




  getProductFromRequest(): Observable<any>{
    return this.http.get('https://locage.herokuapp.com/api/v1/carts/product')
  }


  removeAll(){
    this.totalDiscount = 0;
    this.subtotalPrice = 0;
    this.totalPrice=0;
    return this.clearCart();
    
}
}
