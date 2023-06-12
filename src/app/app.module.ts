import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {FlexLayoutModule} from "@angular/flex-layout";
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {AuthGuard} from "./auth/auth.guard";
import {AuthService} from "./auth/auth.service";
import {AuthInterceptor} from "./auth/auth.interceptor";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSelectModule} from "@angular/material/select";
import {MatListModule} from "@angular/material/list";
import {MainComponent} from "./main/main.component";
import {MatTabsModule} from "@angular/material/tabs";
import {CongeComponent} from './conge/conge.component';
import {FormationComponent} from './formation/formation.component';
import {CahierDeTextComponent} from './cahier-de-text/cahier-de-text.component';
import {CoursComponent} from './cours/cours.component';
import {InscriptionComponent} from './inscription/inscription.component';
import {EnseignantComponent} from './enseignant/enseignant.component';
import {EtudiantComponent} from './etudiant/etudiant.component';
import {SalleComponent} from './salle/salle.component';
import {ProfilComponent} from './profil/profil.component';
import {UtilisateurComponent} from './utilisateur/utilisateur.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {CdkTableModule} from "@angular/cdk/table";
import {ProfilEditComponent} from './profil-edit/profil-edit.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {SettingComponent} from './setting/setting.component';
import {SettingService} from "./setting/setting.service";
import {ConfirmSuppressionComponent} from './confirm-suppression/confirm-suppression.component';
import {UtilisateurEditComponent} from './utilisateur-edit/utilisateur-edit.component';
import {SalleEditComponent} from './salle-edit/salle-edit.component';
import {PersonneEditComponent} from './personne-edit/personne-edit.component';
import {CoursEditComponent} from './cours-edit/cours-edit.component';
import {ResponsableComponent} from './responsable/responsable.component';
import {NotesComponent} from './notes/notes.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {EmargementComponent} from './emargement/emargement.component';
import {PlanningComponent} from './planning/planning.component';
import {FormationEditComponent} from './formation-edit/formation-edit.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {InscriptionEditComponent} from './inscription-edit/inscription-edit.component';
import {CongeEditComponent} from './conge-edit/conge-edit.component';
import {EdtEditComponent} from './edt-edit/edt-edit.component';
import {PresenceEditComponent} from './presence-edit/presence-edit.component';
import {CahierDeTextEditComponent} from './cahier-de-text-edit/cahier-de-text-edit.component';
import {MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatChipsModule} from "@angular/material/chips";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    CongeComponent,
    FormationComponent,
    CahierDeTextComponent,
    CoursComponent,
    InscriptionComponent,
    EnseignantComponent,
    EtudiantComponent,
    SalleComponent,
    ProfilComponent,
    UtilisateurComponent,
    ProfilEditComponent,
    ProfilComponent,
    SettingComponent,
    ConfirmSuppressionComponent,
    UtilisateurEditComponent,
    SalleEditComponent,
    PersonneEditComponent,
    CoursEditComponent,
    ResponsableComponent,
    NotesComponent,
    DashboardComponent,
    EmargementComponent,
    PlanningComponent,
    FormationEditComponent,
    InscriptionEditComponent,
    CongeEditComponent,
    EdtEditComponent,
    PresenceEditComponent,
    CahierDeTextEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    FlexLayoutModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    }),
    MatToolbarModule,
    MatTooltipModule,
    MatSidenavModule,
    MatSelectModule,
    MatListModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    CdkTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatChipsModule
  ],
  providers: [HttpClientModule, JwtHelperService, AuthGuard, AuthService, SettingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {'appearance': 'outline'}
    },
    {provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function tokenGetter() {
  return localStorage.getItem('access_token');
}
