import { Ctcguard } from './ctc-guard.service';
import { SignupComponent } from "./signup.component";
import { SigninComponent } from "./signin.component";
import { LogoutComponent } from "./logout.component";
import { ListusersComponent } from "./listusers.component";
import { PerfilComponent } from "./perfil.component";
import { GeneralComponent } from "./general.component";
import { SuccessComponent } from "../success/success.component";
import { SendpassComponent } from "./sendpass.component";
import { MsgresetmailComponent } from "../success/msgresetmail.component";
import { NewpassComponent } from "./newpass.component";
import { StatisticComponent } from "./statistic.component";
import { Authguard } from "./auth-guard.service";
import { Adminguard } from "./admin-guard.service";
import { Commonguard } from './common-guard.service';
import { Logisticguard } from "./logistic-guard.service";
import { Normalguard } from "./normal-guard.service";
import { DesignationsComponent } from "./designations.component";
import { ScheduleComponent } from "../schedule/schedule.component";
import { Schedule2Component } from "../schedule2/schedule2.component";
import { NewscheduleComponent } from "../newschedule/newschedule.component";
import { SetupComponent } from "../setup/setup.component";
import { NewpontoComponent } from "../setup/newponto.component";
import { CircuitoComponent } from "../setup/circuito.component";
import { CongregationComponent } from '../setup/congregation.component';
import { ShowpontosComponent } from "../showpontos/showpontos.component";
import { TestsmsComponent } from "../testsms/testsms.component";
import { TesttelegramComponent } from "../testtelegram/testtelegram.component";
import { TelegramapiComponent } from "../telegram/telegramapi.component";
import { HoraComponent } from "../setup/hora.component";
import { ValidityComponent } from "../setup/validity.component";
import { FeriadoComponent } from "../setup/feriado.component";
import { EspecialComponent } from "../setup/especial.component";
import { ExcelComponent } from "../setup/excel.component";
import { HelpComponent } from "../help/help.component";
import { ReportComponent } from "../report/report.component";
import { AnuncioComponent } from "../anuncio/anuncio.component";
import { AnunciouserComponent } from "../anunciouser/anunciouser.component";
import { PerfilroleComponent } from "../perfilrole/perfilrole.component";
export const AUTH_ROUTES = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent, canActivate: [Authguard] },
    { path: 'logout', component: LogoutComponent, canActivate: [Normalguard] },
    { path: 'listusers', component: ListusersComponent, canActivate: [Commonguard] },
    { path: 'perfil', component: PerfilComponent, canActivate: [Normalguard] },
    { path: 'help', component: HelpComponent, canActivate: [Normalguard] },
    { path: 'general', component: GeneralComponent, canActivate: [Authguard] },
    { path: 'success', component: SuccessComponent, canActivate: [Authguard] },
    { path: 'sendpass', component: SendpassComponent },
    { path: 'msgresetmail', component: MsgresetmailComponent },
    { path: 'newpass', component: NewpassComponent, canActivate: [Normalguard] },
    { path: 'statistic', component: StatisticComponent, canActivate: [Commonguard] },
    { path: 'designations', component: DesignationsComponent, canActivate: [Normalguard] },
    { path: 'schedule', component: ScheduleComponent, canActivate: [Adminguard] },
    { path: 'schedule2', component: Schedule2Component, canActivate: [Normalguard] },
    { path: 'setup', component: SetupComponent, canActivate: [Logisticguard] },
    { path: 'newponto', component: NewpontoComponent, canActivate: [Logisticguard] },
    { path: 'circuito', component: CircuitoComponent, canActivate: [Logisticguard] },
    { path: 'congregation', component: CongregationComponent, canActivate: [Logisticguard] },
    { path: 'hora', component: HoraComponent, canActivate: [Logisticguard] },
    { path: 'especial', component: EspecialComponent, canActivate: [Logisticguard] },
    { path: 'feriado', component: FeriadoComponent, canActivate: [Logisticguard] },
    { path: 'excel', component: ExcelComponent, canActivate: [Logisticguard] },
    { path: 'validity', component: ValidityComponent, canActivate: [Logisticguard] },
    { path: 'showpontos', component: ShowpontosComponent, canActivate: [Normalguard] },
    { path: 'testsms', component: TestsmsComponent, canActivate: [Adminguard] },
    { path: 'testtelegram', component: TesttelegramComponent, canActivate: [Adminguard] },
    { path: 'newschedule', component: NewscheduleComponent, canActivate: [Ctcguard] },
    { path: 'telegram', component: TelegramapiComponent, canActivate: [Normalguard] },
    { path: 'report', component: ReportComponent, canActivate: [Ctcguard] },
    { path: 'anuncio', component: AnuncioComponent, canActivate: [Logisticguard] },
    { path: 'anunciouser', component: AnunciouserComponent, canActivate: [Normalguard] },
    { path: 'perfilrole', component: PerfilroleComponent, canActivate: [Logisticguard] },
];
