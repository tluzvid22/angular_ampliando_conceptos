import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Entrada } from 'src/app/shared/interfaces/entrada';
import { EntradaService } from 'src/app/shared/services/entrada.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalles-entrada',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalles-entrada.component.html',
  styleUrl: './detalles-entrada.component.css',
})
export class DetallesEntradaComponent implements OnInit {
  public id: number;
  public entrada: Entrada;

  constructor(
    private activatedRouter: ActivatedRoute,
    public entradaService: EntradaService
  ) {
    this.id = 0;
    this.entrada = {
      userId: 0,
      id: 0,
      title: 'string',
      author: 'string',
      date: new Date(Date.now()),
      body: 'string',
    };
    this.activatedRouter.params.subscribe((paramsUrl) => {
      this.id = +paramsUrl.id;
    });
  }

  ngOnInit(): void {
    this.recuperarEntrada();
  }

  private recuperarEntrada(): void {
    this.entradaService.recuperarEntrada(this.id).subscribe((data: Entrada) => {
      this.entrada = data;
    });
  }
}
