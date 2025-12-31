import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/products';

  getProducts() {
    return this.httpClient.get<any>(this.apiUrl);
  }
}
