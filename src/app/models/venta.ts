export interface Venta {
    id: number;
    fecha: Date;
    idCliente: any;
    idFarmacia: any;
    idProducto: any;
    productName: string;
    precioUnit: number;
    cantidad: number;
    precioTotal: number;
}

export interface VentaView{
  id: number;
  fecha: Date;
  cliente: string;
  producto: string;
  precioUnit: number;
  cantidad: number;
  precioTotal: number;
}

