import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Medico } from './medico.service';
import { Paciente } from './paciente.service';
export interface Cita {
  id?: number;
  fecha: string;
  idPaciente: number;
  idMedico: number;
  tratamiento?: string;
  diagnostico?: string;
  medico?: Medico;
  paciente?: Paciente;
}
@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private apiUrl = `${environment.apiUrl}/citas`; 
  constructor(private http : HttpClient) { }
  getCitas() {
    return this.http.get<Cita[]>(`${this.apiUrl}/all`);
  }
  getCita(id: number) { 
    return this.http.get<Cita>(`${this.apiUrl}/${id}`);
  }
  addCita(cita: Cita) {
    return this.http.post<Cita>(`${this.apiUrl}/save`, cita);
  }
  //Para agregar el tratamiento y diagnostico
  updateCita(cita: Cita) {
    return this.http.put<Cita>(`${this.apiUrl}/update`, cita);
  }
  deleteCita(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
  getCitasByPaciente(id: number) {
    return this.http.get<Cita[]>(`${this.apiUrl}/paciente/${id}`);
  }
  getCitasByMedico(id: number) {
    return this.http.get<Cita[]>(`${this.apiUrl}/medico/${id}`);
  }
}
