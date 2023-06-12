import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CahierDeTextInteractif, Conge} from "./models";
import {RESOURCE_URL} from "./urls";

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient) { }

  getConges(key: string): Observable<Conge[]> {
    return this.http.get<Conge[]>(`${RESOURCE_URL}/conges`, {params:{key}});
  }

  supprimerConge(id: any) {
    return this.http.delete(`${RESOURCE_URL}/conges/${id}`);
  }

  creerConge(conge: Conge): Observable<Conge> {
    return this.http.post(`${RESOURCE_URL}/conges`, conge);
  }

  supprimerCahierDeTextInteractif(id: any) {
    return this.http.delete(`${RESOURCE_URL}/cahiers-de-texte/${id}`);
  }

  creerCahierDeTextInteractif(cdt: CahierDeTextInteractif): Observable<CahierDeTextInteractif> {
    return this.http.post(`${RESOURCE_URL}/cahiers-de-texte`, cdt);
  }

  getCahiersDeTexte(key: string = ''): Observable<CahierDeTextInteractif[]> {
    return this.http.get<CahierDeTextInteractif[]>(`${RESOURCE_URL}/cahiers-de-texte`, {params:{key}});
  }
}
