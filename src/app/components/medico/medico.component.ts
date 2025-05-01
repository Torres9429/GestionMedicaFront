import { Component, OnInit } from '@angular/core';
import { Medico, MedicoService } from '../../service/medico.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-medico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './medico.component.html',
  styleUrl: './medico.component.css'
})
export class MedicoComponent implements OnInit {
  medicos: Medico[] = [];
  selectedMedico: Medico = { nombre: '', especialidad: '' };
  isEditing: boolean = false;
  modalVisible: boolean = false;

  constructor(private medicoService: MedicoService) {}

  ngOnInit(): void {
    this.getMedicos();
  }

  getMedicos() {
    this.medicoService.getMedicos().subscribe(
      (response: any) => {
        this.medicos = response.result;
        console.log('Médicos obtenidos:', this.medicos);
      },
      (error) => {
        console.error('Error al obtener los médicos:', error);
      }
    );
  }

  openModal(medico?: Medico): void {
    if (medico) {
      this.isEditing = true;
      this.selectedMedico = { ...medico }; // Copia para no modificar directamente
    } else {
      this.isEditing = false;
      this.selectedMedico = { nombre: '', especialidad: '' }; // Limpiar para nuevo
    }
    this.modalVisible = true;
  }

  saveMedico(): void {
    if (this.isEditing && this.selectedMedico.id) {
      // Actualizar
      this.medicoService.updateMedico( this.selectedMedico).subscribe(() => {
        this.getMedicos();
        this.closeModal();
      });
    } else {
      // Crear
      this.medicoService.addMedico(this.selectedMedico).subscribe(() => {
        this.getMedicos();
        this.closeModal();
      });
    }
  }

  deleteMedico(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este médico?')) {
      this.medicoService.deleteMedico(id!).subscribe(
        () => {
        this.getMedicos();
      },
        (error) => {
          console.error('Error al eliminar el médico:', error);
        }
      );
    }
  }

  closeModal(): void {
    this.modalVisible = false;
    this.selectedMedico = { nombre: '', especialidad: '' };
    this.isEditing = false;
  }
}
