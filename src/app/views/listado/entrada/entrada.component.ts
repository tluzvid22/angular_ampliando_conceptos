import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Entrada } from 'src/app/shared/interfaces/entrada';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css'],
})
export class EntradaComponent implements OnInit {
  // Atributos
  @Input()
  public entrada: Entrada;
  @Output()
  public doEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    this.entrada = {
      userId: 0,
      id: 0,
      title: 'string',
      author: 'string',
      date: new Date(Date.now()),
      body: 'string',
    };
  }

  ngOnInit(): void {}

  public enviarTitulo() {
    this.doEvent.emit(this.entrada.title);
  }

  public tipoDeClase(): string {
    return this.entrada.id % 2 == 0 ? 'claro' : 'oscuro';
  }
}
