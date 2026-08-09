import { Routes } from '@angular/router';
import { Home } from './home/home';
import { HomePage } from './component/home-page/home-page';
import { AddProduct } from './component/add-product/add-product';

export const routes: Routes = [
      {path: '', component: Home},
      {path: 'products', component: HomePage},
      {path:'add-product',component:AddProduct}
];
