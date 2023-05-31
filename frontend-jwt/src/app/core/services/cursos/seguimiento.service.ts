import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoService {

  private apiURL = "http://127.0.0.1:8000/api/seguimientos/";

  constructor(private http: HttpClient) { }

  index(): Observable < any[] >{
    return this.http.get<any>(this.apiURL);
  }
  
  show(id: any): Observable <any>{
    return this.http.get(this.apiURL+id);
  }

  findByDocument(idDocumento:number): Observable<any> {
    return this.http.get(this.apiURL+'findByDocument/'+idDocumento).pipe(
      catchError(error => {
        console.error('Doc error: '+error);
        return of(null);
      }));
  }

  store(id:number, alumnoId:number) {
    const documentoIds: number[] = []; // initialize an array to store documento IDs

    // Make API call to get documentos for curso
    this.http.get('http://127.0.0.1:8000/api/documentos?id_curso=' + id).subscribe((data:any) => {

      // Make API call to get seguimientos for alumno
      this.http.get('http://127.0.0.1:8000/api/seguimientos?alumno=' + alumnoId).subscribe((seguimientos:any) => {

        // Populate documentoIds array with id_documento values from seguimientos table
        for (const id in seguimientos) {
          if (seguimientos.hasOwnProperty(id)) {
            const seguimiento = seguimientos[id];
            documentoIds.push(seguimiento.id_documento);
          }
        }

        // Loop through documentos and associate with alumno if not already associated
        for (const id in data) {
          if (data.hasOwnProperty(id)) {
            const documento = data[id];

            // Check if documento ID already exists in the array
            if (!documentoIds.includes(documento.id)) {
              const payload = {
                id_alumno: alumnoId,
                id_documento: documento.id,
                class_completed: 0
              };
              this.http.post(this.apiURL+'create', payload).subscribe(() => {
                console.log('documento ' + documento.id + ' associated with alumno ' + alumnoId);
              });
            }
          }
        }

        // If no documentos were associated, log a message
        if (documentoIds.length === 0) {
          console.log('No documentos associated with alumno ' + alumnoId);
        }
      });
    }, (error) => {
      console.error('Error getting documentos:', error);
    });
  }

  update(id: any, data: any): Observable <any>{
    return this.http.put(this.apiURL+"update/"+id, data);
  }

}
