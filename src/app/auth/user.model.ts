export class User {
  sim: boolean = false;
  nao: boolean = false;
  tipoesc: string;

  constructor(public email?: string,
              public password?: string,
              public firstName?: string,
              public lastName?: string,
              public congregation?: string,
              public circuito?: string,
              public mobilephone?: number,
              public phone?: number,
              public datebirth?: Date,
              public responsable?: string,
              public conjuge?: string,
              public sex?: string,
              public privilege?: string,
              public eldermail?: string,
              public config?: String[],
              public released?: boolean,
              public userId?: string,
              public lastday?: Date,
              public role?: string,
              public agenda?: string[],
              public escala?: string[],
              public telegram?: string,
  ) {
  }

}
