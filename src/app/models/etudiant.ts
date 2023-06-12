export class Etudiant {
  constructor(
    public id?: number,
    public nom?: string,
    public prenom?: string,
    public email?: string,
    public numeroDeTelephone?: string,
    public adresse?: string,
    public niveau?: string,
    public classe?: string,
  ) {
  }
}
