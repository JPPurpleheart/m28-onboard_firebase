import { Component, OnInit } from '@angular/core';
import { ItinerarioService } from 'src/app/core/services/cursos/itinerario.service';

@Component({
  selector: 'app-store-pathway',
  templateUrl: './store-pathway.component.html',
  styleUrls: ['./store-pathway.component.css']
})
export class StorePathwayComponent implements OnInit {

  form = {
    nombre: ''
  };

  constructor(public itinerarioService: ItinerarioService) { }

  ngOnInit(): void {
  }

  addPathway() {
    return this.itinerarioService.store(this.form).subscribe();
  }

}
