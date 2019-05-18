import {Hora} from '../setup/hora.model';
import {Ponto} from '../setup/ponto.model';

export class Escala {
  constructor(
    dia: string,
    diasemana: string,
    datainicio: string,
    datafim: string,
    data: Date,
    hora: Hora[],
    pontos: Ponto[],
    escalaid?: string
  ) {
  }

}
