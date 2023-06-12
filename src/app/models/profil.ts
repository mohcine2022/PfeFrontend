export class Profil {
  constructor(
    public id?: number,
    public titre?: string,
    public description?: string,
    public suiviIntervenant?: boolean,
    public voirCahierDeTexteInteractif?: boolean,
    public voirConge?: boolean,
    public voirCours?: boolean,
    public voirEmargement?: boolean,
    public voirEmploiDuTemps?: boolean,
    public voirNotes?: boolean,
  ) {
  }
}
