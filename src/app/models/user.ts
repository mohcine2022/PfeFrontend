import {Profil} from "./profil";

export class User {
  constructor(public id?: number,
              public email?: string,
              public password?: string,
              public profil?: Profil,
              public nomDeProfil?: string,
              public personne?: any,) {
  }
}
