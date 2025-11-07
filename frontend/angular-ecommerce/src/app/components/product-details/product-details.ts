import { Component } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {

  product!: Product;

  constructor(private productService: ProductService,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void{
    this.route.paramMap.subscribe(()=>{
      this.handleProductDetails();
    })
  }

  handleProductDetails(){
    // get the "id" param string. convert the string to a number using the "+" symbol
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(theProductId).subscribe(
      data =>{
        this.product = data;
      }
    )
  }

}
