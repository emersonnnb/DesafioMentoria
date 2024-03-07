import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ProductSearchService, RecommendedProductsService } from 'product-data-access';

export interface User {
  id: string;
  name: string;
  createdAt: Date;
  email: string;
  avatar: string;
  biography: string;
}

@Component({
  selector: 'lib-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  columnsToDisplay = ['id', 'name', 'email', 'createdAt'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: User;
  public users!: Array<User>;
  

  constructor(
    private recommendedProductsService: RecommendedProductsService, 
    private productSearchService: ProductSearchService) {}
  ngOnInit(): void {
    this.productSearchService.getUsers().subscribe(users => this.users = users)
  }

  products$ = this.recommendedProductsService.getProducts();
}