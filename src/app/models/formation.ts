import {Cours} from "./cours";

export class Formation {
  constructor(
    public id?: number,
    public titre?: string,
    public descriptions?: string,
    public dateDebut?: any,
    public dateFin?: any,
    public placesDisponibles?: number,
    public cours: Cours[] = []
  ) {
  }
}
