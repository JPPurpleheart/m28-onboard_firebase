import { Component, OnInit } from '@angular/core';
import { DocumentoService } from 'src/app/core/services/cursos/documento.service';
import { CursoService } from 'src/app/core/services/cursos/curso.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css']
})
export class EditClassComponent implements OnInit {

  form = {
    nombre:'',
    ruta_acceso: '',
    id_curso: '',
    video_duration: 0
  };
  id:Number = 0;
  cursoList:any = [];
  documentoData:any = {
    nombre:'',
    ruta_acceso: '',
    id_curso: '',
    video_duration: 0
  };

  constructor(public cursosService: CursoService, public documentoService: DocumentoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getClase();
    this.getCurso();
  }

  getCurso() {
    this.cursosService.index().subscribe(data =>{
      this.cursoList = data;
    });
  }

  getClase() {
    this.documentoService.show(this.id).subscribe(data => {
      this.documentoData.nombre = data.nombre;
      this.documentoData.ruta_acceso = data.ruta_acceso;
      this.documentoData.id_curso = data.id_curso;
      this.documentoData.video_duration = data.video_duration;
    });
  }

  editClass() {
    console.log(this.form)
    return this.documentoService.update(this.id, this.form).subscribe();
  }

}
