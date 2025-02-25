import { Component, signal, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}
@Component({
  selector: 'app-patient',
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    TagModule,
    InputIconModule,
    IconFieldModule,
    // ConfirmDialogModule,
    CheckboxModule
],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss'
})
export class PatientComponent {

  productDialog: boolean = false;

  products = signal<any[]>([]);

  product!: any;

  selectedProducts!: any[] | null;

  submitted: boolean = false;

  statuses!: any[];
  pizza:any

  @ViewChild('dt') dt!: Table;

  exportColumns!: ExportColumn[];

  cols!: Column[];

  constructor(
     
  ) {}

  dataAry:any = [  
  {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Ali',
      description: 'Ali is Admin',
      role: 'Admin',
      price: 65,
      email: 'test@gmail.com',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
  },
  {
      id: '1001',
      code: 'nvklal433',
      name: 'User1',
      description: 'User1 is our super...',
      role: 'Super Admin',
      price: 72,
      email: 'test@gmail.com',
      quantity: 61,
      inventoryStatus: 'INSTOCK',
      rating: 4
  },
  {
      id: '1002',
      code: 'zz21cz3c1',
      name: 'User1',
      description: 'User1 is our user',
      role: 'User',
      price: 79,
      email: 'test@gmail.com',
      quantity: 2,
      inventoryStatus: 'LOWSTOCK',
      rating: 3
  },  
  // {
  //     id: '1004',
  //     code: 'f230fh0g3',
  //     name: 'Bamboo Watch',
  //     description: 'Product Description',
  //     image: 'bamboo-watch.jpg',
  //     price: 65,
  //     category: 'Accessories',
  //     quantity: 24,
  //     inventoryStatus: 'INSTOCK',
  //     rating: 5
  // },
  // {
  //     id: '1005',
  //     code: 'nvklal433',
  //     name: 'Black Watch',
  //     description: 'Product Description',
  //     image: 'black-watch.jpg',
  //     price: 72,
  //     category: 'Accessories',
  //     quantity: 61,
  //     inventoryStatus: 'INSTOCK',
  //     rating: 4
  // },
  // {
  //     id: '1006',
  //     code: 'zz21cz3c1',
  //     name: 'Blue Band',
  //     description: 'Product Description',
  //     image: 'blue-band.jpg',
  //     price: 79,
  //     category: 'Fitness',
  //     quantity: 2,
  //     inventoryStatus: 'LOWSTOCK',
  //     rating: 3
  // }
  ]

  exportCSV() {
      this.dt.exportCSV();
  }

  ngOnInit() {
      this.loadDemoData();
  }

  loadDemoData() {
      this.products.set(this.dataAry);
      this.statuses = [
          { label: 'INSTOCK', value: 'instock' },
          { label: 'LOWSTOCK', value: 'lowstock' },
          { label: 'OUTOFSTOCK', value: 'outofstock' }
      ];

      this.cols = [
          { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
          { field: 'name', header: 'Name' },
          { field: 'image', header: 'Image' },
          { field: 'price', header: 'Price' },
          { field: 'category', header: 'Category' }
      ];

      this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }

  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
  }

  editProduct(product: any) {
      this.product = { ...product };
      this.productDialog = true;
  }

  deleteSelectedProducts() {
      // this.confirmationService.confirm({
      //     message: 'Are you sure you want to delete the selected products?',
      //     header: 'Confirm',
      //     icon: 'pi pi-exclamation-triangle',
      //     accept: () => {
      //         this.products.set(this.products().filter((val) => !this.selectedProducts?.includes(val)));
      //         this.selectedProducts = null;
      //         this.messageService.add({
      //             severity: 'success',
      //             summary: 'Successful',
      //             detail: 'Products Deleted',
      //             life: 3000
      //         });
      //     }
      // });
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }

  deleteProduct(product: any) {
      // this.confirmationService.confirm({
      //     message: 'Are you sure you want to delete ' + product.name + '?',
      //     header: 'Confirm',
      //     icon: 'pi pi-exclamation-triangle',
      //     accept: () => {
      //         this.products.set(this.products().filter((val) => val.id !== product.id));
      //         this.product = {};
      //         this.messageService.add({
      //             severity: 'success',
      //             summary: 'Successful',
      //             detail: 'Product Deleted',
      //             life: 3000
      //         });
      //     }
      // });
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.products().length; i++) {
          if (this.products()[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  createId(): string {
      let id = '';
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (var i = 0; i < 5; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }

  getSeverity(status: string) {
      switch (status) {
          case 'INSTOCK':
              return 'success';
          case 'LOWSTOCK':
              return 'warn';
          case 'OUTOFSTOCK':
              return 'danger';
          default:
              return 'info';
      }
  }

  saveProduct() {
      // this.submitted = true;
      // let _products = this.products();
      // if (this.product.name?.trim()) {
      //     if (this.product.id) {
      //         _products[this.findIndexById(this.product.id)] = this.product;
      //         this.products.set([..._products]);
      //         this.messageService.add({
      //             severity: 'success',
      //             summary: 'Successful',
      //             detail: 'Product Updated',
      //             life: 3000
      //         });
      //     } else {
      //         this.product.id = this.createId();
      //         this.product.image = 'product-placeholder.svg';
      //         this.messageService.add({
      //             severity: 'success',
      //             summary: 'Successful',
      //             detail: 'Product Created',
      //             life: 3000
      //         });
      //         this.products.set([..._products, this.product]);
      //     }

      //     this.productDialog = false;
      //     this.product = {};
      // }
  }
}

