import { Component, OnInit } from '@angular/core';
import { DocumentoService } from 'src/app/core/services/cursos/documento.service';
import { CursoService } from 'src/app/core/services/cursos/curso.service';
import { MatriculaService } from 'src/app/core/services/cursos/matricula.service';
import { SeguimientoService } from 'src/app/core/services/cursos/seguimiento.service';
import { ActivatedRoute, Router } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-show-class',
  templateUrl: './show-class.component.html',
  styleUrls: ['./show-class.component.css']
})

export class ShowClassComponent implements OnInit {

  cursoData:any = {
    id: '',
    nombre: ''
  };
  documentosData:any = {
    nombre: '',
    ruta_acceso: ''
  };
  isLinkClicked = false;
  videoUrl:any = "";
  documentosList:any = [];
  seguimientosList:any = [];
  id:number = 0;
  documentoId: number = 0;
  documentosUpdate: any = {
    id: '',
    id_alumno: '',
    id_documento: '',
    class_completed: ''
  };
  matriculaUpdate: any = {
    id: '',
    id_alumno: '',
    id_curso: '',
    class_completed: ''
  };

  constructor(public cursosService: CursoService, public documentoService: DocumentoService, public matriculaService: MatriculaService, public seguimientoService: SeguimientoService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.documentoId = Number(this.route.snapshot.paramMap.get('id_doc'));
    this.id = Number(this.route.snapshot.paramMap.get('id_course'));
    this.getClase();
    this.getCurso(this.id);
    this.getDocumentos();
    this.getSeguimientos();
  }

  getClase() {
    this.documentoService.show(this.documentoId).subscribe(data =>{
      this.id = data.id_curso;
      this.documentosData.nombre = data.nombre;
      this.documentosData.ruta_acceso = data.ruta_acceso;
      let dangerousVideoUrl = 'https://www.youtube.com/embed/' + this.documentosData.ruta_acceso;
      this.videoUrl =
          this.sanitizer.bypassSecurityTrustResourceUrl(dangerousVideoUrl);
    });
  }

  getDocumentos() {
    this.documentoService.index().subscribe(data =>{
      this.documentosList = data;
    });
  }

  getCurso(id: any) {
    this.cursosService.show(id).subscribe(data => {
      this.cursoData.id = data.id;
      this.cursoData.nombre = data.nombre;
    });
  }

  getSeguimientos() {
    this.seguimientoService.index().subscribe(data =>{
      this.seguimientosList = data;
    });
  }

  onClickedNextClass(idCurso: number, idDocumento: number, event: any) {
    event.preventDefault();
    try {
      this.documentoService.findByCourse(idCurso, idDocumento).subscribe((documentoData: any) => {
        if (!documentoData) {
          throw new Error('Documento data not found');
        }
        this.seguimientoService.findByDocument(documentoData.id).subscribe((seguimientoData: any) => {
          if (!seguimientoData) {
            throw new Error('Seguimiento data not found');
          }
          this.seguimientoService.show(seguimientoData.id).subscribe((seguimiento: any) => {
            if (!seguimiento) {
              throw new Error('Seguimiento not found');
            }
            this.documentosUpdate.id = seguimiento.id;
            this.documentosUpdate.id_alumno = seguimiento.id_alumno;
            this.documentosUpdate.id_documento = seguimiento.id_documento;
            this.documentosUpdate.class_completed = 1;
            this.seguimientoService.update(seguimiento.id, this.documentosUpdate).subscribe((data: any) => {
              this.router.navigateByUrl("/class/"+idDocumento+"/"+idCurso);
            });
          });
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  onClickedFinishCourse(idCurso: number, idDocumento: number) {
    try {
      this.seguimientoService.findByDocument(idDocumento).subscribe((seguimientoData: any) => {
        if (!seguimientoData) {
          throw new Error('Seguimiento data not found');
        }
        this.seguimientoService.show(seguimientoData.id).subscribe((seguimiento: any) => {
          if (!seguimiento) {
            throw new Error('Seguimiento not found');
          }
          if(seguimiento.class_completed != 1) {
            this.documentosUpdate.id = seguimiento.id;
            this.documentosUpdate.id_alumno = seguimiento.id_alumno;
            this.documentosUpdate.id_documento = seguimiento.id_documento;
            this.documentosUpdate.class_completed = 1;
            this.seguimientoService.update(seguimiento.id, this.documentosUpdate).subscribe((data: any) => {
              this.matriculaService.findMatricula(idCurso).subscribe((data: any) => {
                this.matriculaService.show(data.id).subscribe((matricula: any) => {
                  this.matriculaUpdate.id = matricula.id;
                  this.matriculaUpdate.id_alumno = matricula.id_alumno;
                  this.matriculaUpdate.id_curso = matricula.id_curso;
                  this.matriculaUpdate.class_completed = 1;
                  this.matriculaService.update(matricula.id, this.matriculaUpdate).subscribe((data: any) => {
                    this.router.navigateByUrl("/complete-course/"+idCurso);
                  })
                })
              });
            });
          } else {
            this.router.navigateByUrl("/complete-course/"+idCurso);
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

}

