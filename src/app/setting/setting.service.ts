import { Injectable } from '@angular/core';
import {SortDirection} from "@angular/material/sort";
import {HttpClient} from "@angular/common/http";
import {SETTING_URL} from "../urls";
import {Cours, Enseignant, Etudiant, Personne, Profil, Responsable, Salle, User} from "../models";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private http: HttpClient) { }

  getProfils(pageSize: number, pageIndex: number, active: string, direction: SortDirection) {
    let params = {page: String(pageIndex), size: String(pageSize), sort: `${active},${direction}`};
    return this.http.get(`${SETTING_URL}/profils`, {params});
  }

  getListeProfils(): Observable<Profil[]> {
    return this.http.get<Profil[]>(`${SETTING_URL}/liste-profils`);
  }

  enregistrerProfil(profil: Profil): Observable<any> {
    return this.http.post(`${SETTING_URL}/profils`, profil);
  }

  supprimerProfil(id: any): Observable<any> {
    return this.http.delete(`${SETTING_URL}/profils/${id}`)
  }

  enregistrerUtilisateur(value: User): Observable<any> {
    return this.http.post(`${SETTING_URL}/utilisateurs`, value)
  }

  getListePersonnes(): Observable<Personne[]> {
    return this.http.get<Personne[]>(`${SETTING_URL}/personnes`);
  }

  getUtilisateurs() {
    return this.http.get<User[]>(`${SETTING_URL}/utilisateurs`);
  }

  supprimerUtilisateur(id: any): Observable<any> {
    return this.http.delete(`${SETTING_URL}/utilisateurs/${id}`)
  }

  getSalles(): Observable<Salle[]> {
    return this.http.get<Salle[]>(`${SETTING_URL}/salles`)
  }

  supprimerSalle(id: any): Observable<any> {
    return this.http.delete(`${SETTING_URL}/salles/${id}`)
  }

  enregistrerSalle(value: Salle): Observable<any> {
    return this.http.post(`${SETTING_URL}/salles`, value)
  }

  enregistrerEnseignant(value: Enseignant): Observable<any> {
    return this.http.post(`${SETTING_URL}/enseignants`, value)
  }

  getEnseignants(): Observable<Enseignant[]> {
    return this.http.get<Enseignant[]>(`${SETTING_URL}/enseignants`)
  }

  supprimerEnseignant(id: any): Observable<any> {
    return this.http.delete(`${SETTING_URL}/enseignants/${id}`)
  }

  supprimerCours(id: any): Observable<any> {
    return this.http.delete(`${SETTING_URL}/courses/${id}`)
  }

  enregistrerCours(value: Cours): Observable<any> {
    return this.http.post(`${SETTING_URL}/courses`, value)
  }

  getCourses(): Observable<Cours[]> {
    return this.http.get<Cours[]>(`${SETTING_URL}/courses`)
  }

  supprimerResponsable(id: any): Observable<any> {
    return this.http.delete(`${SETTING_URL}/responsables/${id}`)
  }

  enregistrerResponsable(value: Responsable): Observable<any> {
    return this.http.post(`${SETTING_URL}/responsables`, value)
  }

  getResponsables(): Observable<Responsable[]> {
    return this.http.get<Responsable[]>(`${SETTING_URL}/responsables`)
  }

}
