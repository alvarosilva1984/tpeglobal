import { Routes, RouterModule } from '@angular/router';
import { Ctcguard } from './auth/ctc-guard.service';
import { AuthenticationComponent } from './auth/authentication.component';
import { AUTH_ROUTES } from './auth/auth.routes';
import { SuccessComponent } from './success/success.component';
import { PerfilComponent } from './auth/perfil.component';
import { GeneralComponent } from './auth/general.component';
import { NewpassComponent } from './auth/newpass.component';
import { ListusersComponent } from './auth/listusers.component';
import { SendpassComponent } from './auth/sendpass.component';
import { MsgresetmailComponent } from './success/msgresetmail.component';
import { StatisticComponent } from './auth/statistic.component';
import { DesignationsComponent } from './auth/designations.component';
import { Authguard } from './auth/auth-guard.service';
import { Adminguard } from './auth/admin-guard.service';
import { Commonguard } from './auth/common-guard.service';
import { Logisticguard } from './auth/logistic-guard.service';
import { Normalguard } from './auth/normal-guard.service';
import { ScheduleComponent } from './schedule/schedule.component';
import { Schedule2Component } from './schedule2/schedule2.component';
import { NewscheduleComponent } from './newschedule/newschedule.component';
import { SetupComponent } from './setup/setup.component';
import { NewpontoComponent } from './setup/newponto.component';
import { CircuitoComponent } from './setup/circuito.component';
import { CongregationComponent } from './setup/congregation.component';
import { ShowpontosComponent } from './showpontos/showpontos.component';
import { TelegramapiComponent } from './telegram/telegramapi.component';
import { TestsmsComponent } from './testsms/testsms.component';
import { TesttelegramComponent } from './testtelegram/testtelegram.component';
import { SignupComponent } from './auth/signup.component';
import { SigninComponent } from './auth/signin.component';
import { HoraComponent } from './setup/hora.component';
import { ValidityComponent } from './setup/validity.component';
import { FeriadoComponent } from './setup/feriado.component';
import { EspecialComponent } from './setup/especial.component';
import { ExcelComponent } from './setup/excel.component';
import { HelpComponent } from './help/help.component';
import { ReportComponent } from './report/report.component';
import { AnuncioComponent } from './anuncio/anuncio.component';
import { AnunciouserComponent } from './anunciouser/anunciouser.component';
import { PerfilroleComponent } from './perfilrole/perfilrole.component';



const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES},
    { path: 'signin', component: SigninComponent, children: AUTH_ROUTES},
    { path: 'signup', component: SignupComponent, canActivate: [Authguard], children: AUTH_ROUTES },
    { path: 'success', component: SuccessComponent, canActivate: [Authguard], children: AUTH_ROUTES },
    { path: 'perfil', component: PerfilComponent, canActivate: [Normalguard], children: AUTH_ROUTES },
    { path: 'help', component: HelpComponent, canActivate: [Normalguard], children: AUTH_ROUTES },
    { path: 'listusers', component: ListusersComponent, canActivate: [Commonguard], children: AUTH_ROUTES },
    { path: 'sendpass', component: SendpassComponent, children: AUTH_ROUTES},
    { path: 'msgresetmail', component: MsgresetmailComponent, children: AUTH_ROUTES},
    { path: 'newpass', component: NewpassComponent, canActivate: [Normalguard], children: AUTH_ROUTES},
    { path: 'general', component: GeneralComponent, canActivate: [Authguard], children: AUTH_ROUTES },
    { path: 'statistic', component: StatisticComponent, canActivate: [Commonguard], children: AUTH_ROUTES },
    { path: 'designations', component: DesignationsComponent, canActivate: [Normalguard], children: AUTH_ROUTES },
    { path: 'schedule', component: ScheduleComponent, canActivate: [Adminguard], children: AUTH_ROUTES },
    { path: 'schedule2', component: Schedule2Component, canActivate: [Normalguard], children: AUTH_ROUTES },
    { path: 'setup', component: SetupComponent, canActivate: [Logisticguard], children: AUTH_ROUTES },
    { path: 'newponto', component: NewpontoComponent, canActivate: [Logisticguard], children: AUTH_ROUTES },
    { path: 'circuito', component: CircuitoComponent, canActivate: [Logisticguard], children: AUTH_ROUTES },
    { path: 'congregation', component: CongregationComponent, canActivate: [Logisticguard], children: AUTH_ROUTES },
    { path: 'hora', component: HoraComponent, canActivate: [Logisticguard], children: AUTH_ROUTES },
    { path: 'especial', component: EspecialComponent, canActivate: [Logisticguard], children: AUTH_ROUTES },
    { path: 'feriado', component: FeriadoComponent, canActivate: [Logisticguard], children: AUTH_ROUTES },
    { path: 'excel', component: ExcelComponent, canActivate: [Logisticguard], children: AUTH_ROUTES },
    { path: 'validity', component: ValidityComponent, canActivate: [Logisticguard], children: AUTH_ROUTES },
    { path: 'showpontos', component: ShowpontosComponent, canActivate: [Normalguard], children: AUTH_ROUTES },
    { path: 'testsms', component: TestsmsComponent, canActivate: [Adminguard], children: AUTH_ROUTES },
    { path: 'testtelegram', component: TesttelegramComponent, canActivate: [Adminguard], children: AUTH_ROUTES },
    { path: 'newschedule', component: NewscheduleComponent, canActivate: [Ctcguard], children: AUTH_ROUTES },
    { path: 'telegram', component: TelegramapiComponent, canActivate: [Normalguard], children: AUTH_ROUTES },
    { path: 'report', component: ReportComponent, canActivate: [Ctcguard], children: AUTH_ROUTES },
    { path: 'anuncio', component: AnuncioComponent, canActivate: [Logisticguard], children: AUTH_ROUTES },
    { path: 'anunciouser', component: AnunciouserComponent, canActivate: [Normalguard], children: AUTH_ROUTES},
    { path: 'perfilrole', component: PerfilroleComponent, canActivate: [Logisticguard], children: AUTH_ROUTES },


];

export const routing = RouterModule.forRoot(APP_ROUTES);

