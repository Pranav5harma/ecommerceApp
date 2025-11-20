import { Component } from '@angular/core';
import { OrderHistoryService } from '../../services/order-history.service';
import { OrderHistory } from '../../common/order-history';

@Component({
  selector: 'app-order-history',
  standalone: false,
  templateUrl: './order-history.html',
  styleUrl: './order-history.css',
})
export class OrderHistoryComponent {

  orderHistoryList: OrderHistory[] = [];
  storage:Storage = sessionStorage

  constructor(private orderHistoryService: OrderHistoryService) { 
  }

  ngOnInit(): void {
    this.handleOrderHistory();
  }

  handleOrderHistory(): void {
    const theEmail = JSON.parse(this.storage.getItem('userEmail')!);

    this.orderHistoryService.getOrderHistory(theEmail).subscribe(
      data => {
        this.orderHistoryList = data._embedded.orders;
    });
  }

}
