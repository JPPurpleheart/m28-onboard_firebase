import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/core/services/usuarios/usuario.service';
import { ProfesorService } from 'src/app/core/services/usuarios/profesor.service';
import { ItinerarioService } from 'src/app/core/services/cursos/itinerario.service';
import { CursoService } from 'src/app/core/services/cursos/curso.service';

@Component({
  selector: 'app-store-course',
  templateUrl: './store-course.component.html',
  styleUrls: ['./store-course.component.css']
})
export class StoreCourseComponent implements OnInit {

  form = {
    nombre:'',
    profesor: '',
    itinerario: ''
  };
  usuarioList:any = [];
  profesorList:any = [];
  itinerarioList:any = [];

  constructor(public usuarioService: UsuarioService, public profesorService: ProfesorService, public itinerarioService: ItinerarioService, public cursoService: CursoService) { }

  ngOnInit(): void {
    this.getUsuario();
    this.getProfesor();
    this.getItinerario();
  }

  getUsuario() {
    this.usuarioService.index().subscribe(data =>{
      this.usuarioList = data;
    });
  }

  getProfesor() {
    this.profesorService.index().subscribe(data =>{
      this.profesorList = data;
    });
  }

  getItinerario() {
    this.itinerarioService.index().subscribe(data =>{
      this.itinerarioList = data;
    });
  }

  addCourse() {
    return this.cursoService.store(this.form).subscribe();
  }

}
