import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Formation} from "../models";
import {FORMATION_URL} from "../urls";

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  constructor(private http: HttpClient) { }

  getFormations(key: string=''): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${FORMATION_URL}/formations`, {params:{key}})
  }

  creerFormation(formation: Formation): Observable<Formation> {
    return this.http.post<Formation>(`${FORMATION_URL}/formations`, formation);
  }

  supprimerFormation(id: any): Observable<any> {
    return this.http.delete(`${FORMATION_URL}/formations/${id}`);
  }
}
