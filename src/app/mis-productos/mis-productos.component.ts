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

  imagen: any;

  formularioParaCrear = new FormGroup({
    titulo: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    peso: new FormControl('', Validators.required),
    altura: new FormControl('', Validators.required),
    volumen: new FormControl('', Validators.required),
    imagenUrl: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    Latitud: new FormControl('', [Validators.required, Validators.min(-90), Validators.max(90)]),
    Longitud: new FormControl('', [Validators.required, Validators.min(-180) , Validators.max(180)])
  })

  formularioParaEditar = new FormGroup({
    titulo: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    peso: new FormControl('', Validators.required),
    altura: new FormControl('', Validators.required),
    volumen: new FormControl('', Validators.required),
    imagenUrl: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    Latitud: new FormControl('', [Validators.required, Validators.min(-90), Validators.max(90)]),
    Longitud: new FormControl('', [Validators.required, Validators.min(-180) , Validators.max(180)])
  })

//Auxiliar de la base de datos filtrada
   auxiliarBaseDatos:any='' ;

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
      Latitud:6.621,
      Longitud:-64.501
    }
  ];

  constructor() { }

  filtrarTitulo = () => {
    if(this.auxiliarBaseDatos == '' && this.filtroDeBusqueda.get('tituloABuscar').value == '' ){
      console.log('no hago nada porque esta vacio')
    }else if(this.auxiliarBaseDatos == '' && this.filtroDeBusqueda.get('tituloABuscar').value != ''){
      this.auxiliarBaseDatos = this.productosEnVenta.map(value =>{
        return value
      })
      this.productosEnVenta = this.productosEnVenta.filter(item =>{
        return item.titulo.includes(this.filtroDeBusqueda.get('tituloABuscar').value)
      })
      console.log(this.productosEnVenta)
    }else if(this.auxiliarBaseDatos != '' && this.filtroDeBusqueda.get('tituloABuscar').value == ''){
      this.productosEnVenta = this.auxiliarBaseDatos
    }else if(this.auxiliarBaseDatos != '' && this.filtroDeBusqueda.get('tituloABuscar').value != ''){
      console.log('filtro nuevamente ')
      this.auxiliarBaseDatos = this.productosEnVenta.map(value =>{
        return value
      })
      this.productosEnVenta = this.productosEnVenta.filter(item =>{
        return item.titulo.includes(this.filtroDeBusqueda.get('tituloABuscar').value)
      })
    }
  
  }


  crearArticulo = () => {
    this.nuevaVenta = this.formularioParaCrear.value
    this.nuevaVenta.id = this.contadorDeVentas + 1
    this.nuevaVenta.imagenUrl = 'data:image/png;base64,' + btoa(this.imagen)
    this.productosEnVenta.push(this.nuevaVenta)
    this.contadorDeVentas++
  }

  abrirDescripcion = (id) => {
    this.descripcionDeVenta = this.productosEnVenta.filter(item =>{
      return item.id === id
    })
  }

  eliminarArticulo = (id) => {
    
    this.productosEnVenta = this.productosEnVenta.filter(item =>{
      return item.id != id
    })
  }

  botonEditar = () => {

    this.formularioParaEditar.setValue({
      titulo: this.descripcionDeVenta[0].titulo,
      precio: this.descripcionDeVenta[0].precio,
      peso: this.descripcionDeVenta[0].peso,
      altura: this.descripcionDeVenta[0].altura,
      volumen: this.descripcionDeVenta[0].volumen,
      descripcion: this.descripcionDeVenta[0].descripcion,
      Latitud:this.descripcionDeVenta[0].Latitud,
      Longitud:this.descripcionDeVenta[0].Longitud,
      imagenUrl: ''
    })
  }

  editarArticulo = () => {
    this.nuevaVenta = this.formularioParaEditar.value
    this.nuevaVenta.id = this.descripcionDeVenta[0].id
    this.nuevaVenta.imagenUrl = 'data:image/png;base64,' + btoa(this.imagen)
    let indice = this.productosEnVenta.indexOf(this.descripcionDeVenta[0])
    this.productosEnVenta.splice(indice , 1 , this.nuevaVenta)
  }

  editarImagenProducto = (event) => {

    const archivo = event.target.files[0];

    if (archivo) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoadedOurTeam.bind(this);
      reader.readAsBinaryString(archivo);
    }
  }

  handleReaderLoadedOurTeam(event) {
    this.imagen = event.target.result;
  }

  ngOnInit(): void {
  }

}
