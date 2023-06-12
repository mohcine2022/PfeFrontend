import {Etudiant} from "./etudiant";
import {Formation} from "./formation";

export class Inscription {
  constructor(public id?: number,
              public dateInscription?: any,
              public fraisInscription?: number,
              public etudiant?: Etudiant | any,
              public formation?: Formation | any) {
  }
}
