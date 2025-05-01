import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Medico {
  id?: number;
  nombre: string;
  especialidad: string;
}

@Injectable({
  providedIn: 'root'
})

export class MedicoService {
  private apiUrl = `${environment.apiUrl}/medicos`;
  constructor(private http: HttpClient) { }
  getMedicos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(`${this.apiUrl}/all`);
  }

  getMedico(id: number): Observable<Medico> {
    return this.http.get<Medico>(`${this.apiUrl}/${id}`);
  }

  addMedico(medico: Medico): Observable<Medico> {
    return this.http.post<Medico>(`${this.apiUrl}/save`, medico);
  }

  updateMedico(medico: Medico): Observable<Medico> {
    return this.http.put<Medico>(`${this.apiUrl}/update`, medico);
  }

  deleteMedico(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}

  
