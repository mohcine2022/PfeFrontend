import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Etudiant, Inscription} from "../models";
import {INSCRIPTION_URL} from "../urls";

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  constructor(private http: HttpClient) { }

  supprimerEtudiant(id: any): Observable<any> {
    return this.http.delete(`${INSCRIPTION_URL}/etudiants/${id}`)
  }

  enregistrerEtudiant(value: Etudiant): Observable<any> {
    return this.http.post(`${INSCRIPTION_URL}/etudiants`, value)
  }

  getEtudiants(key: string = ''): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(`${INSCRIPTION_URL}/etudiants`, {params:{key}})
  }

  supprimerInscription(id: any): Observable<any> {
    return this.http.delete(`${INSCRIPTION_URL}/inscriptions/${id}`)
  }

  enregistrerInscription(value: Inscription): Observable<any> {
    return this.http.post(`${INSCRIPTION_URL}/inscriptions`, value)
  }
  getInscriptions(key: string = '') {
    return this.http.get<Inscription[]>(`${INSCRIPTION_URL}/inscriptions`, {params:{key}})
  }
}
