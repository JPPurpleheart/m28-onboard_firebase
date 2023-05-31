import { Component, OnInit } from '@angular/core';
import { ItinerarioService } from 'src/app/core/services/cursos/itinerario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-pathway',
  templateUrl: './edit-pathway.component.html',
  styleUrls: ['./edit-pathway.component.css']
})
export class EditPathwayComponent implements OnInit {

  form = {
    nombre: ''
  };
  itinerariosList:any = {
    id: '',
    nombre: ''
  };
  id:number = 0;

  constructor(public itinerarioService: ItinerarioService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getItinerario(this.id);
  }

  getItinerario(id: any) {
    this.itinerarioService.show(id).subscribe(data => {
      this.itinerariosList.id = data.id;
      this.itinerariosList.nombre = data.nombre;
    });
  }

  submitPathway() {
    return this.itinerarioService.update(this.id, this.form).subscribe();
  }

}
