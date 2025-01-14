import { Component, OnInit } from '@angular/core';
import { MetodosglobalesService } from './../../../core/metodosglobales.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CrearofertaService } from './../../../core/crearoferta.service'
import { ReporteService } from 'src/app/core/reporte.service';

@Component({
  selector: 'app-adminusuarios',
  templateUrl: './adminusuarios.component.html',
  styleUrls: ['./adminusuarios.component.css']
})
export class AdminusuariosComponent implements OnInit {

  constructor(private SeriviciosGenerales: MetodosglobalesService,
    private modalService: NgbModal,
    private rutas: Router,
    private ServiciosOferta: CrearofertaService,
    private serviciosreportes: ReporteService) { }

  UsucodigConsulta: string = '';

  // Variables Filtros
  ArrayTipUsuario: any = [];
  ArrayNombre: any = [];

  arregloListaPerfil: any;

  nombre: string = 'NOMBRES_PERSONA';
  CedulaBuscar: string = '';
  TelefonoBuscar: string = '';
  CorreoBuscar: string = '';
  TipoUsuarioBuscar: string = '0';

  Respuesta: string = '';

  TipoUsuario: string = '0';
  IdNombre: string = '0';
  IdTelefono: string = '0';
  IdCorreo: string = '0';
  IdCedula: string = '0';

  // Variables input Informacion perfil
  INPNombre: string = '';
  INPApellido: string = '';
  INPTipoDocumento: string = '';
  INPNumIdentidad: string = '';
  INPDireccion: string = '';
  INPCelular: string = '';
  INPCorreo: string = '';
  INPDescUno: string = '';
  INPDescDos: string = '';
  INPDescTres: string = '';
  INPObservacion: string = '';
  INPCompltDireccion: string = '';
  INPIdManychat: string = '';
  INPComentario: string = '';
  ArrayCiud: any = [];
  ArrayDepa: any = [];
  IdCiudad: string = '';
  IdDepartamento: string = '';

  ValidaMostrar: string;

  //Variables informacion adicional
  ImagenAdd: string = '../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png';
  NomImagen1: string = '0';
  RutaImagenes: string = '';



  ngOnInit(): void {
    this.RutaImagenes = this.SeriviciosGenerales.RecuperarRutasOtrasImagenes('6');
    this.ValidaMostrar = '0';
    this.CargaTipoUsuarios();
    this.CargarUbicaciones();
  }

  CargaTipoUsuarios() {
    //lista Tipo usuarios
    this.serviciosreportes.ConsultaUsuario('1').subscribe(Resultado => {
      this.ArrayTipUsuario = Resultado;
    })
  }

  SelTipoUser(idUser: string, modalmensaje: any) {
    this.TipoUsuarioBuscar = idUser;
    console.log(this.TipoUsuarioBuscar)

    if (this.TipoUsuarioBuscar != '1') {
      this.Respuesta = 'Estamos trabajando en esta funcionalidad.';
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } 
      
    
  }


  BuscarPerfil(modalBuscar: any, modalmensaje: any) {

    const body = {
      CD_TPO_PRSNA: this.TipoUsuarioBuscar,
      CORREO_PERSONA: this.CorreoBuscar,
      CELULAR_PERSONA: this.TelefonoBuscar,
      DOCUMENTO_USUARIO: this.CedulaBuscar,
      NOMBRES_PERSONA: this.IdNombre
    }
    this.serviciosreportes.ConsultaListaPersona('3', body).subscribe(Resultado => {
      if (Resultado.length == 0) {
        this.Respuesta = 'No hay resultados.';
        this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      } else {
        this.arregloListaPerfil = Resultado;
        this.modalService.open(modalBuscar, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      }
    })
  }

  //Carga los filtros de usuario
  ConsultaPerfilUser(arregloPerfil: any) {
    console.log(arregloPerfil)
    this.UsucodigConsulta = arregloPerfil.USUCODIG;
    this.modalService.dismissAll();
    this.CargaPerfil()
  }

  CargaPerfil() {
    this.serviciosreportes.ConsultaPerfil(this.UsucodigConsulta).subscribe(Resultado => {
      this.arregloListaPerfil = Resultado;
      console.log(this.arregloListaPerfil)
      this.INPNombre = Resultado[0].NOMBRES_PERSONA;
      this.INPApellido = Resultado[0].APELLIDOS_PERSONA;
      this.INPTipoDocumento = Resultado[0].TIPO_DOCUMENTO;
      this.INPNumIdentidad = Resultado[0].DOCUMENTO_USUARIO;
      this.IdDepartamento = Resultado[0].CD_DPTO;
      this.IdCiudad = Resultado[0].CD_CDAD;
      this.INPDireccion = Resultado[0].DRCCION;
      this.INPCompltDireccion = Resultado[0].CMPLMNTO_DRRCCION;
      this.INPCelular = Resultado[0].CELULAR_PERSONA;
      this.INPCorreo = Resultado[0].CORREO_PERSONA;
      this.INPIdManychat = Resultado[0].id_manychat;
      this.INPComentario = Resultado[0].CMNTRIO;
      this.INPDescUno = Resultado[0].DscripUno;
      this.INPDescDos = Resultado[0].DscripDos;
      this.INPDescTres = Resultado[0].DscripTres;
      this.INPObservacion = Resultado[0].Observacion;

      if (Resultado[0].Imagen == null || Resultado[0].Imagen == '') {
        this.ImagenAdd = '../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png';
      } else {
        this.ImagenAdd = this.RutaImagenes + Resultado[0].Imagen;
      }
      this.NomImagen1 = Resultado[0].Imagen;
      this.ValidaMostrar = '1';
    })
  }



  CargarUbicaciones() {
    this.ServiciosOferta.ConsultaDepartamento('5').subscribe(Resultado => {
      this.ArrayDepa = Resultado;
      this.IdDepartamento = '269';
      this.ServiciosOferta.ConsultaCiudad(this.IdDepartamento).subscribe(Resultado => {
        this.ArrayCiud = Resultado;
        this.IdCiudad = '0';
      })
    })
  }

  SelDepa() {
    if (this.IdDepartamento == '0') {
      this.IdCiudad = '0';
      this.ArrayCiud = [];
      this.INPDireccion = 'Dirección *';
    }
    else {
      this.ServiciosOferta.ConsultaCiudad(this.IdDepartamento).subscribe(Resultado => {
        this.ArrayCiud = Resultado;
      })
    }
  }

  //Inserta informacion del perfil
  InsertPerfil(modalmensaje: any) {
    if (this.INPNombre == undefined || this.INPNombre == null || this.INPNombre == '') {
      this.Respuesta = 'El campo nombre es obligatorio.';
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.INPApellido == undefined || this.INPApellido == null || this.INPApellido == '') {
      this.Respuesta = 'El campo apellido es obligatorio.';
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.IdDepartamento == undefined || this.IdDepartamento == null || this.IdDepartamento == '') {
      this.Respuesta = 'El campo departamento es obligatorio.';
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.IdCiudad == undefined || this.IdCiudad == null || this.IdCiudad == '') {
      this.Respuesta = 'El campo ciudad es obligatorio.';
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.INPDireccion == undefined || this.INPDireccion == null || this.INPDireccion == '') {
      this.Respuesta = 'El campo dirección es obligatorio.';
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.INPCelular == undefined || this.INPCelular == null || this.INPCelular == '') {
      this.Respuesta = 'El campo número celular es obligatorio.';
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.INPDescUno == undefined || this.INPDescUno == null || this.INPDescUno == '') {
      this.Respuesta = 'El campo descripción uno es obligatorio.';
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.INPDescDos == undefined || this.INPDescDos == null || this.INPDescDos == '') {
      this.Respuesta = 'El campo descripción dos es obligatorio.';
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.INPDescTres == undefined || this.INPDescTres == null || this.INPDescTres == '') {
      this.Respuesta = 'El campo descripción tres es obligatorio.';
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.INPObservacion == undefined || this.INPObservacion == null || this.INPObservacion == '') {
      this.Respuesta = 'El campo observación es obligatorio.';
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.INPComentario == undefined || this.INPComentario == null || this.INPComentario == '') {
      this.Respuesta = 'El campo comentario es obligatorio.';
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.INPCompltDireccion == undefined || this.INPCompltDireccion == null || this.INPCompltDireccion == '') {
      this.Respuesta = 'El campo complemento dirección es obligatorio.';
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.IdDepartamento == undefined || this.IdDepartamento == null || this.IdDepartamento == '') {
      this.Respuesta = 'El campo departamento es obligatorio.';
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.IdCiudad == undefined || this.IdCiudad == null || this.IdCiudad == '') {
      this.Respuesta = 'El campo ciudad es obligatorio.';
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.ImagenAdd == '../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png') {
      this.Respuesta = 'El campo imagen es obligatorio.';
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else {
      const BodyInsert = {
        Usucodig: this.UsucodigConsulta,
        CorreoPersona: this.INPCorreo,
        NombrePersona: this.INPNombre,
        ApellidoPersona: this.INPApellido,
        CelularPersona: this.INPCelular,
        TipoDocumento: this.INPTipoDocumento,
        DocumentoUsuario: this.INPNumIdentidad,
        IdDepto: this.IdDepartamento,
        IdCiudad: this.IdCiudad,
        Direccion: this.INPDireccion,
        Comentario: this.INPComentario,
        complementoDireccion: this.INPCompltDireccion,
        IdManychat: this.INPIdManychat,
        DescripUno: this.INPDescUno,
        DescripDos: this.INPDescDos,
        DescripTres: this.INPDescTres,
        Observacion: this.INPObservacion,
        Imagen: this.NomImagen1
      }

      this.serviciosreportes.AgregaInfoPerfil('3', BodyInsert).subscribe(Resultado => {
        console.log(Resultado)
        this.Respuesta = Resultado;

        this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
        this.ValidaMostrar = '0';
      })
    }
  }

  Limpiar() {
    this.ValidaMostrar = '0';
    this.CorreoBuscar = '';
    this.CedulaBuscar = '';
  }
  public CargaImagen(event: any) {

    console.log(event.target.files[0])
    this.ServiciosOferta.postFileImgUsers(event.target.files[0]).subscribe(
      response => {
        console.log(response);
        this.ImagenAdd = this.RutaImagenes + event.target.files[0].name;
        this.NomImagen1 = event.target.files[0].name;
      },
      error => {
      }
    );
  }


}
