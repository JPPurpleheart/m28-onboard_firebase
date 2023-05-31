import { Component, OnInit } from '@angular/core';
import { DocumentoService } from 'src/app/core/services/cursos/documento.service';
import { CursoService } from 'src/app/core/services/cursos/curso.service';
import { ActivatedRoute } from '@angular/router';
import { AfterLoginService } from 'src/app/core/services/login/after-login.service';

@Component({
  selector: 'app-show-course',
  templateUrl: './show-course.component.html',
  styleUrls: ['./show-course.component.css']
})
export class ShowCourseComponent implements OnInit {

  cursoData:any = {
    id: '',
    nombre: ''
  };
  documentosList:any = [];
  cursoId: any = "";
  userType:string = "";
  userId:Number = 0;
  profesor: any = "profesor";

  constructor(public cursosService: CursoService, public documentoService: DocumentoService, public afterLoginService: AfterLoginService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.cursoId = Number(this.route.snapshot.paramMap.get('id'));
    this.getcursos();
    this.getDocumentos();
    this.userType = this.afterLoginService.getLoggedInUserType();
    this.userId = this.afterLoginService.getLoggedInUserId();
  }

  getcursos() {
    this.cursosService.show(this.cursoId).subscribe(data => {
      this.cursoData.id = data.id;
      this.cursoData.nombre = data.nombre;
    });
  }

  getDocumentos() {
    this.documentoService.index().subscribe(data =>{
      this.documentosList = data;
      console.log(this.documentosList);
    });
  }

}
