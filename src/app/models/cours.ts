import {Enseignant} from "./enseignant";

export class Cours {
  constructor(public id?: number,
              public titre?: string,
              public description?: string,
              public nomEnseignant?: string,
              public cout?: number,
              public enseignant?: Enseignant | any,) {
  }
}
