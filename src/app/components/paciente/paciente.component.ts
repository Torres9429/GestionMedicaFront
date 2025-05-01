import { Component, OnInit } from '@angular/core';
import { Paciente, PacienteService } from '../../service/paciente.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css'
})
export class PacienteComponent implements OnInit {
  pacientes: Paciente[] = [];
  selectedPaciente: Paciente = { nombre: '', edad: 0, antecedentes: '' };
  isEditing: boolean = false;
  modalVisible: boolean = false;

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.getPacientes();
  }

  getPacientes(): void {
    this.pacienteService.getPacientes().subscribe(
      (response: any) => {
        this.pacientes = response.result;
        console.log('Pacientes obtenidos:', this.pacientes);
      },
      (error) => {
        console.error('Error al obtener los pacientes:', error);
      }
    );
  }

  openModal(paciente?: Paciente): void {
    if (paciente) {
      this.isEditing = true;
      this.selectedPaciente = { ...paciente };
    } else {
      this.isEditing = false;
      this.selectedPaciente = { nombre: '', edad: 0, antecedentes: '' };
    }
    this.modalVisible = true;
  }

  savePaciente(): void {
    if (this.isEditing && this.selectedPaciente.id) {
      this.pacienteService.updatePaciente(this.selectedPaciente).subscribe(() => {
        this.getPacientes();
        this.closeModal();
      });
    } else {
      this.pacienteService.addPaciente(this.selectedPaciente).subscribe(() => {
        this.getPacientes();
        this.closeModal();
      });
    }
  }

  deletePaciente(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este paciente?')) {
      this.pacienteService.deletePaciente(id).subscribe(
        () => {
          this.getPacientes();
        },
        (error) => {
          console.error('Error al eliminar el paciente:', error);
          alert('Error al eliminar el paciente. Por favor, inténtelo de nuevo. \n' +
            'Recuerde que no se puede eliminar un paciente si tiene citas programadas.');
        }
      );
    }
  }

  closeModal(): void {
    this.modalVisible = false;
    this.selectedPaciente = { nombre: '', edad: 0, antecedentes: '' };
    this.isEditing = false;
  }
}
