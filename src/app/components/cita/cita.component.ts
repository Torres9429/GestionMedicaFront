import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Cita, CitaService } from '../../service/cita.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Medico, MedicoService } from '../../service/medico.service';
import { Paciente, PacienteService } from '../../service/paciente.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-cita',
  imports: [CommonModule, FormsModule, DataTablesModule],
  templateUrl: './cita.component.html',
  styleUrl: './cita.component.css'
})
export class CitaComponent implements OnInit {
  citas: Cita[] = [];
  selectedCita: Cita = { fecha: '', idPaciente: 0, idMedico: 0 };
  medicos: Medico[] = [];
  pacientes: Paciente[] = [];
  isEditing: boolean = false;
  modalVisible: boolean = false;
  idFiltro: number = 0;
  tipoFiltro: 'paciente' | 'medico' = 'paciente';
  filtroMedico: string = '';
  filtroPaciente: string = '';

  constructor(
    private citaService: CitaService,
    private medicoService: MedicoService,
    private pacienteService: PacienteService,

  ) { }

  ngOnInit(): void {
    this.getCitas();
    this.getMedicos();
    this.getPacientes();
  }
  getCitas() {
    this.citaService.getCitas().subscribe(
      (response: any) => {
        this.citas = response.result;
        console.log('Citas obtenidas:', this.citas);
      },
      (error) => {
        console.error('Error al obtener las citas:', error);
      }
    );
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
  openModal(cita?: Cita): void {
    if (cita) {
      this.isEditing = true;
      this.selectedCita = { ...cita }; // Copia para no modificar directamente
    } else {
      this.isEditing = false;
      this.selectedCita = { fecha: '', idPaciente: 0, idMedico: 0 }; // Limpiar para nuevo
    }
    this.modalVisible = true;
  }
  saveCita(): void {
    if (this.isEditing && this.selectedCita.id) {
      // Actualizar
      this.citaService.updateCita(this.selectedCita).subscribe(() => {
        this.getCitas();
        this.closeModal();
      });
    } else {
      // Crear
      this.citaService.addCita(this.selectedCita).subscribe(() => {
        this.getCitas();
        this.closeModal();
      });
    }
  }
  deleteCita(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta cita?')) {
      this.citaService.deleteCita(id!).subscribe(
        () => {
          this.getCitas();
        },
        (error) => {
          console.error('Error al eliminar la cita:', error);
        }
      );
    }
  }

  closeModal(): void {
    this.modalVisible = false;
    this.selectedCita = { fecha: '', idPaciente: 0, idMedico: 0 };
  }

  filtrarCitas() {
    if (this.tipoFiltro === 'paciente') {
      this.citaService.getCitasByPaciente(this.idFiltro).subscribe(citas => {
        this.citas = citas;
      });
    } else if (this.tipoFiltro === 'medico') {
      this.citaService.getCitasByMedico(this.idFiltro).subscribe(citas => {
        this.citas = citas;
      });
    }
  }
  filterCitas(id: number | 0, tipo: 'paciente' | 'medico'): void {
    // Resetear filtro dependiendo del tipo
    if (tipo === 'medico') {
      this.filtroPaciente = '';
    } else {
      this.filtroMedico = '';
    }
  
    if (tipo === 'medico' && id) {
      this.citaService.getCitasByMedico(id).subscribe(
        (citas) => {
          //@ts-ignore
          this.citas = citas.result;
        },
        (error) => {
          console.error('Error al filtrar citas por médico:', error);
        }
      );
    } else if (tipo === 'paciente' && id) {
      this.citaService.getCitasByPaciente(id).subscribe(
        (citas) => {
          //@ts-ignore
          this.citas = citas.result;
        },
        (error) => {
          console.error('Error al filtrar citas por paciente:', error);
        }
      );
    } else {
      this.getCitas();
    }
  }
  

}
