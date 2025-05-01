import { Routes } from '@angular/router';
import { PacienteComponent } from './components/paciente/paciente.component';
import { MedicoComponent } from './components/medico/medico.component';
import { CitaComponent } from './components/cita/cita.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'pacientes', component: PacienteComponent},
    { path: 'medicos', component: MedicoComponent},
    { path: 'citas', component: CitaComponent}
];
