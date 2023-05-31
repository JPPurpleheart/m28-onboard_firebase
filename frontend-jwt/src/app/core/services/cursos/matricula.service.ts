import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SeguimientoService } from './seguimiento.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  private apiURL = "http://127.0.0.1:8000/api/matriculas/";

  constructor(private http: HttpClient, private seguimientoService: SeguimientoService) { }

  index(): Observable < any[] >{
    return this.http.get<any>(this.apiURL);
  }
  
  show(id: any): Observable <any>{
    return this.http.get(this.apiURL+id);
  }

  findMatricula(idCurso:number): Observable<any> {
    return this.http.get(this.apiURL+'findMatricula/'+idCurso).pipe(
      catchError(error => {
        console.error('Doc error: '+error);
        return of(null);
      }));
  }

  store(id:number, alumnoId:number) {
    const cursoIds: number[] = []; // initialize an array to store curso IDs

    // Make API call to get cursos for itinerario
    this.http.get('http://127.0.0.1:8000/api/cursos?itinerario=' + id).subscribe((data:any) => {

      // Make API call to get matriculas for alumno
      this.http.get('http://127.0.0.1:8000/api/matriculas?alumno=' + alumnoId).subscribe((matriculas:any) => {

        // Populate cursoIds array with id_curso values from matriculas table
        for (const id in matriculas) {
          if (matriculas.hasOwnProperty(id)) {
            const matricula = matriculas[id];
            cursoIds.push(matricula.id_curso);
          }
        }

        // Loop through cursos and associate with alumno if not already associated
        for (const id in data) {
          if (data.hasOwnProperty(id)) {
            const curso = data[id];

            // Check if curso ID already exists in the array
            if (!cursoIds.includes(curso.id)) {
              const payload = {
                id_alumno: alumnoId,
                id_curso: curso.id,
                course_completed: 0
              };
              this.seguimientoService.store(curso.id, alumnoId);
              this.http.post(this.apiURL+'create', payload).subscribe(() => {
                console.log('Curso ' + curso.id + ' associated with alumno ' + alumnoId);
              });
            }
          }
        }

        // If no cursos were associated, log a message
        if (cursoIds.length === 0) {
          console.log('No cursos associated with alumno ' + alumnoId);
        }
      });
    }, (error) => {
      console.error('Error getting cursos:', error);
    });
  }

  update(id: any, data: any): Observable <any>{
    return this.http.put(this.apiURL+"update/"+id, data);
  }

}
