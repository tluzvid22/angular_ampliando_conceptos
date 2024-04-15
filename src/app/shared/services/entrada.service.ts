import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Entrada } from '../interfaces/entrada';

const entradasPath = 'assets/json/entradas.json';

@Injectable({
  providedIn: 'root',
})
export class EntradaService {
  constructor(private httpClient: HttpClient) {}

  public recuperarEntradas(): Observable<Entrada[]> {
    return this.httpClient.get<Entrada[]>(entradasPath);
  }

  public recuperarEntrada(id: number): Observable<Entrada> {
    return this.httpClient.get<Entrada[]>(entradasPath).pipe(
      map((entradas: Entrada[]) => {
        let entrada: Entrada = {
          userId: 0,
          id: 0,
          title: 'string',
          author: 'string',
          date: new Date(Date.now()),
          body: 'string',
        };

        entradas.forEach((entradaListado) => {
          if (entradaListado.id === id) {
            entrada = entradaListado;
          }
        });

        return entrada;
      })
    );
  }
}
