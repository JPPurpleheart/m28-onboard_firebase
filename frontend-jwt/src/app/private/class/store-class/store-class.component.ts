import { Component, OnInit } from '@angular/core';
import { DocumentoService } from 'src/app/core/services/cursos/documento.service';
import { CursoService } from 'src/app/core/services/cursos/curso.service';

@Component({
  selector: 'app-store-class',
  templateUrl: './store-class.component.html',
  styleUrls: ['./store-class.component.css']
})
export class StoreClassComponent implements OnInit {

  form = {
    nombre:'',
    ruta_acceso: '',
    id_curso: '',
    video_duration: 0,
  };
  cursoList:any = [];

  constructor(public cursosService: CursoService, public documentoService: DocumentoService) { }

  ngOnInit(): void {
    this.getCurso();
  }

  getCurso() {
    this.cursosService.index().subscribe(data =>{
      this.cursoList = data;
    });
  }

  addClass() {
    console.log(this.form)
    return this.documentoService.store(this.form).subscribe();
  }

}
