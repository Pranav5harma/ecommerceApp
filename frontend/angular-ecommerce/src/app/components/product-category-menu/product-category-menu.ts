import { Component } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-category-menu',
  standalone: false,
  templateUrl: './product-category-menu.html',
  styleUrl: './product-category-menu.css',
})
export class ProductCategoryMenu {

  productCategories: ProductCategory[] = [];
  
  constructor(private ProductService:ProductService){
  }

  ngOnInit(){
    this.listProductCategories();
  }

  listProductCategories(){
    this.ProductService.getProductCategories().subscribe(
      data => {
        console.log('Product Categories' + JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }
}
