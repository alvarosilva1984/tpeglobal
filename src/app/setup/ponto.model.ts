import { User } from "../auth/user.model";

export class Ponto {

    constructor(public name: string,
                public npubs: number,
                public date?: string,
                public id?: string,
                public pubs?: User[],
                public config?: any,
                public address?: string,
                public obs?: string,
                public fileimg?: File

            ) {}

}
