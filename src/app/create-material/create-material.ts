import { Component } from '@angular/core';
import { Materiales } from '../servicios/materiales';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-material',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-material.html',
  styleUrl: './create-material.css'
})
export class CreateMaterial {
  materiales: any[] = [];
  filteredMaterials: any[] = [];
  paginatedMaterials: any[] = [];
  
  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  startIndex: number = 0;
  endIndex: number = 0;
  visiblePages: number[] = [];
  
  // Search properties
  searchTerm: string = '';
  
  // Edit properties
  isEditing: boolean = false;
  editingMaterialId: string = '';
  
  data = {
    celda: 0,
    materiales: [
      {
        nombre: '',
        descripcion: '',
        cantidad: 0,
        ubicacion: '',
        movimientos: [],
        movimientoSeleccionado: ''
      }
    ]
  };

  constructor(
    private materialesService: Materiales,
    private router: Router
  ) {}

  ngOnInit() {
    this.showMateriales();
  }

  // Logout functionality
  logout() {
    if (confirm('¿Está seguro de que desea cerrar sesión? / Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }

  verMaterialNombre() {
    this.materialesService.getMaterialNombre().subscribe(
      res => {
        this.materiales = res.materiales;
        this.filterMaterials();
      }
    );
  }

  showMateriales() {
    this.materialesService.getAllMateriales().subscribe(
      res => {
        this.materiales = res.materiales;
        this.filterMaterials();
      },
      err => {
        console.log(err);
      }
    );
  }

  // busqueda de materiales por nombre
  filterMaterials() {
    if (this.searchTerm.trim() === '') {
      this.filteredMaterials = [...this.materiales];
    } else {
      this.filteredMaterials = this.materiales.filter(material =>
        material.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.currentPage = 1;
    this.calculatePagination();
  }

  // Pagination methods
  calculatePagination() {
    this.totalPages = Math.ceil(this.filteredMaterials.length / this.itemsPerPage);
    this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.endIndex = Math.min(this.startIndex + this.itemsPerPage, this.filteredMaterials.length);
    
    this.paginatedMaterials = this.filteredMaterials.slice(this.startIndex, this.endIndex);
    
    this.calculateVisiblePages();
  }

  calculateVisiblePages() {
    const maxVisiblePages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    this.visiblePages = [];
    for (let i = startPage; i <= endPage; i++) {
      this.visiblePages.push(i);
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.calculatePagination();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.calculatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.calculatePagination();
    }
  }

  // Edit functionality
  editMaterial(material: any) {
    console.log('Editando material:', material);
    
    this.isEditing = true;
    this.editingMaterialId = material._id || material.id; // Usar ID del material
    
    // Fill form with material data
    this.data.celda = material.celda || 0;
    this.data.materiales[0] = {
      nombre: material.nombre || '',
      descripcion: material.descripcion || '',
      cantidad: material.cantidad || 0,
      ubicacion: material.ubicacion || '',
      movimientos: material.movimientos || [],
      movimientoSeleccionado: material.movimientoSeleccionado || ''
    };
    
    console.log('Formulario llenado con datos:', this.data);
    console.log('ID del material a editar:', this.editingMaterialId);
  }

  cancelEdit() {
    this.isEditing = false;
    this.editingMaterialId = '';
    this.limpiarMaterial();
  }

  // Delete functionality
  confirmDelete(material: any) {
    const materialId = material._id || material.id;
    if (confirm(`¿Está seguro de que desea eliminar el material "${material.id}"? / Are you sure you want to delete the material "${material.id}"?`)) {
      this.deleteMaterial(materialId);
    }
  }

  deleteMaterial(materialId: string) {
    console.log('Eliminando material con ID:', materialId);
    
    this.materialesService.deleteMateriales(materialId).subscribe(
      res => {
        console.log('Respuesta del servidor (eliminar):', res);
        alert('Material eliminado correctamente / Material deleted successfully');
        this.showMateriales(); // Refresh the list
      },
      err => {
        console.error('Error al eliminar material:', err);
        let errorMessage = 'Error al eliminar el material / Error deleting material';
        
        if (err.error && err.error.mensaje) {
          errorMessage += `: ${err.error.mensaje}`;
        } else if (err.status === 500) {
          errorMessage += ': Error interno del servidor / Internal server error';
        } else if (err.status === 404) {
          errorMessage += ': Material no encontrado / Material not found';
        }
        
        alert(errorMessage);
      }
    );
  }

  // Create functionality
  createMaterial() {
    if (this.validateForm()) {
      console.log('Datos a enviar (crear):', this.data);
      
      this.materialesService.createMateriales(this.data).subscribe(
        res => {
          console.log('Respuesta del servidor (crear):', res);
          alert('Material creado correctamente / Material created successfully');
          this.limpiarMaterial();
          this.showMateriales(); // Refresh the list
        },
        err => {
          console.error('Error al crear material:', err);
          let errorMessage = 'Error al crear el material / Error creating material';
          
          if (err.error && err.error.mensaje) {
            errorMessage += `: ${err.error.mensaje}`;
          } else if (err.status === 500) {
            errorMessage += ': Error interno del servidor / Internal server error';
          }
          
          alert(errorMessage);
        }
      );
    } else {
      alert('Por favor, complete todos los campos / Please fill in all fields');
    }
  }

  // Update functionality
  updateMaterial() {
    if (this.validateForm()) {
      // Use the original material ID for the update
      const originalId = this.editingMaterialId;
      
      console.log('Actualizando material con ID:', originalId);
      console.log('Datos a enviar:', this.data.materiales[0]);
      
      this.materialesService.updateMateriales(originalId, this.data.materiales[0]).subscribe(
        res => {
          console.log('Respuesta del servidor (actualizar):', res);
          alert('Material actualizado correctamente / Material updated successfully');
          this.isEditing = false;
          this.editingMaterialId = '';
          this.limpiarMaterial();
          this.showMateriales(); // Refresh the list
        },
        err => {
          console.error('Error al actualizar material:', err);
          let errorMessage = 'Error al actualizar el material / Error updating material';
          
          if (err.error && err.error.mensaje) {
            errorMessage += `: ${err.error.mensaje}`;
          } else if (err.status === 404) {
            errorMessage += ': Material no encontrado / Material not found';
          } else if (err.status === 500) {
            errorMessage += ': Error interno del servidor / Internal server error';
          }
          
          alert(errorMessage);
        }
      );
    } else {
      alert('Por favor, complete todos los campos / Please fill in all fields');
    }
  }

  // Form validation
  validateForm(): boolean {
    return this.data.celda !== null &&
      this.data.materiales[0].nombre.trim() !== '' &&
      this.data.materiales[0].descripcion.trim() !== '' &&
      this.data.materiales[0].cantidad > 0 &&
      this.data.materiales[0].ubicacion.trim() !== '' &&
      this.data.materiales[0].movimientoSeleccionado.trim() !== '';
  }

  // Clear form
  limpiarMaterial() {
    this.data.celda = 0;
    this.data.materiales[0] = {
      nombre: '',
      descripcion: '',
      cantidad: 0,
      ubicacion: '',
      movimientos: [],
      movimientoSeleccionado: ''
    };
  }
}
