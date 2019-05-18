export class Hora {
  vagas = 0;
  dispo = 0;

  constructor(
    public code: string,
    public hora: string,
    public idhora?: string,
  ) {
  }

}
