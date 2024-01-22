import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../product.interface';
import { ProductComponent } from '../product/product.component';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductComponent],
  template: `
    <div>
      @defer (when products()) { @for (product of products(); track product.id)
      {

      <app-product [product]="product" />

      } } @loading () {
      <p>Loading....</p>
      } @placeholder (minimum 300ms) {
      <p>No product details</p>
      }
    </div>
  `,
  styles: [
    `
      div {
        display: flex;
        flex-wrap: wrap;
        align-content: stretch;
      }

      app-product {
        flex-basis: 250px;
        height: 300px;
        margin-bottom: 1rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  products = toSignal(inject(ProductService).products$, {
    initialValue: [] as Product[],
  });
}
