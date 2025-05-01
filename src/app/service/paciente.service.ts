import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface Paciente {
  id?: number;
  nombre: string;
  edad: number;
  antecedentes: string;
}
@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private apiUrl = `${environment.apiUrl}/pacientes`; 
  constructor(private http : HttpClient) { }
  getPacientes() {
    return this.http.get<Paciente[]>(`${this.apiUrl}/all`);
  }
  getPaciente(id: number) {
    return this.http.get<Paciente>(`${this.apiUrl}/${id}`);
  }
  addPaciente(paciente: Paciente) {
    return this.http.post<Paciente>(`${this.apiUrl}/save`, paciente);
  }
  updatePaciente(paciente: Paciente) {
    return this.http.put<Paciente>(`${this.apiUrl}/update`, paciente);
  } 
  deletePaciente(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
