import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-mis-productos',
  templateUrl: './mis-productos.component.html',
  styleUrls: ['./mis-productos.component.css']
})
export class MisProductosComponent implements OnInit {
  //Controladores de los formularios
  filtroDeBusqueda = new FormGroup({
    tituloABuscar: new FormControl('')
  })

  formularioParaCrear = new FormGroup({
    titulo: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    peso: new FormControl('', Validators.required),
    altura: new FormControl('', Validators.required),
    volumen: new FormControl('', Validators.required),
    imagenUrl: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    ubicacion: new FormControl('', Validators.required)
  })

  formularioParaEditar = new FormGroup({
    titulo: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    peso: new FormControl('', Validators.required),
    altura: new FormControl('', Validators.required),
    volumen: new FormControl('', Validators.required),
    imagenUrl: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    ubicacion: new FormControl('', Validators.required)
  })

  

//Variable para almacenar nuevas ventas y editadas
  nuevaVenta:any;

  //generador de ID
  contadorDeVentas:number = 0;

  //Array de descripcion
  descripcionDeVenta:any;

//array para guardas las ventas
  productosEnVenta:any = [
    {
      id: 0 ,
      titulo:'Iphone 12 pro 2020',
      precio:'1200',
      descripcion:'Es un telefono muy bonito, está completamente nuevo y trae todos sus accesorios',
      imagenUrl:'./../../assets/iphone12.jpeg',
      peso:'5',
      altura:'20',
      volumen:'62.47',
      ubicacion:'Ciudad Guayana'
    }
  ];

  constructor() { }

  

  crearArticulo = () =>{
    this.nuevaVenta = this.formularioParaCrear.value
    this.nuevaVenta.id = this.contadorDeVentas + 1
    this.productosEnVenta.push(this.nuevaVenta)
    this.contadorDeVentas++
    this.formularioParaCrear.reset()
    
  }

  abrirDescripcion = (id) =>{
    this.descripcionDeVenta = this.productosEnVenta.filter(item =>{
      return item.id === id
    })
  }

  eliminarArticulo = (id) =>{
    
    this.productosEnVenta = this.productosEnVenta.filter(item =>{
      return item.id != id
    })
  }

  botonEditar = () =>{

    this.formularioParaEditar.setValue({
      titulo: this.descripcionDeVenta[0].titulo,
      precio: this.descripcionDeVenta[0].precio,
      peso: this.descripcionDeVenta[0].peso,
      altura: this.descripcionDeVenta[0].altura,
      volumen: this.descripcionDeVenta[0].volumen,
      descripcion: this.descripcionDeVenta[0].descripcion,
      ubicacion: this.descripcionDeVenta[0].ubicacion,
      imagenUrl: '',
    })
  }

  editarArticulo = () =>{
    this.nuevaVenta = this.formularioParaEditar.value
    this.nuevaVenta.id = this.descripcionDeVenta[0].id
    this.productosEnVenta.splice(this.descripcionDeVenta[0].id , 1 , this.nuevaVenta)
  }

  ngOnInit(): void {
  }

}
