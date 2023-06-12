import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from "./auth/auth.guard";
import {MainComponent} from "./main/main.component";
import {FormationComponent} from "./formation/formation.component";
import {CahierDeTextComponent} from "./cahier-de-text/cahier-de-text.component";
import {CongeComponent} from "./conge/conge.component";
import {EtudiantComponent} from "./etudiant/etudiant.component";
import {InscriptionComponent} from "./inscription/inscription.component";
import {SettingComponent} from "./setting/setting.component";
import {NotesComponent} from "./notes/notes.component";
import {EmargementComponent} from "./emargement/emargement.component";
import {PlanningComponent} from "./planning/planning.component";
import {DashboardComponent} from "./dashboard/dashboard.component";


const routes: Routes = [

  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: '', canActivate: [AuthGuard], component: MainComponent,
    children: [
      {
        path: 'conge',
        component: CongeComponent
      }, {
        path: 'cahier-de-text',
        component: CahierDeTextComponent
      }, {
        path: 'formation',
        component: FormationComponent
      }, {
        path: 'etudiant',
        component: EtudiantComponent
      }, {
        path: 'inscription',
        component: InscriptionComponent
      }, {
        path: 'settings',
        component: SettingComponent
      }, {
        path: 'notes',
        component: NotesComponent
      }, {
        path: 'emargement',
        component: EmargementComponent
      }, {
        path: 'planning',
        component: PlanningComponent
      }, {
        path: 'dashboard',
        component: DashboardComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
