export class Product {
    id: number=0;
    nombre: string='';
    stock: number=0;
    precio: number=0;
    descripcion: string='';
    categoria: any;
    picture!: any;
    status: string = '';
}

export class ProductView {
  id: number=0;
  nombre: string='';
  stock: number=0;
  precio: number=0;
  descripcion: string='';
  picture!: any;
  categoria: string='';
  farmacia: string = '';
}
