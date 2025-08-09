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
  
  // Message properties
  showLogoutMessage = false;
  showCreateMessage = false;
  showEditMessage = false;
  showDeleteMessage = false;
  showValidationMessage = false;
  showConfirmMessage = false;
  showErrorMessage = false;
  errorMessageText = '';
  materialToDelete: any = null;
  
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
    // Mostrar mensaje de logout exitoso
    this.showLogoutMessage = true;
    
    // Limpiar token y redirigir después de 3 segundos
    setTimeout(() => {
      localStorage.removeItem('token');
      this.showLogoutMessage = false;
      this.router.navigate(['/login']);
    }, 3000);
  }

  // Navigate to materiales page
  goToMateriales() {
    this.router.navigate(['/materiales']);
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
    
    // Scroll to form section
    this.scrollToForm();
  }

  cancelEdit() {
    this.isEditing = false;
    this.editingMaterialId = '';
    this.limpiarMaterial();
  }

  // Delete functionality
  confirmDelete(material: any) {
    this.materialToDelete = material;
    this.showConfirmMessage = true;
  }

  confirmDeleteAction() {
    const materialId = this.materialToDelete._id || this.materialToDelete.id;
    this.showConfirmMessage = false;
    this.materialToDelete = null;
    this.deleteMaterial(materialId);
  }

  cancelDeleteAction() {
    this.showConfirmMessage = false;
    this.materialToDelete = null;
  }

  deleteMaterial(materialId: string) {
    console.log('Eliminando material con ID:', materialId);
    
    this.materialesService.deleteMateriales(materialId).subscribe(
      res => {
        console.log('Respuesta del servidor (eliminar):', res);
        // Mostrar mensaje de éxito estilizado
        this.showDeleteMessage = true;
        
        // Ocultar mensaje después de 3 segundos
        setTimeout(() => {
          this.showDeleteMessage = false;
        }, 3000);
        
        this.showMateriales(); // Refresh the list
      },
      err => {
        console.error('Error al eliminar material:', err);
        let errorMessage = 'Error al eliminar el material';
        
        if (err.error && err.error.mensaje) {
          errorMessage += `: ${err.error.mensaje}`;
        } else if (err.status === 500) {
          errorMessage += ': Error interno del servidor';
        } else if (err.status === 404) {
          errorMessage += ': Material no encontrado';
        }
        
        this.showError(errorMessage);
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
          // Mostrar mensaje de éxito estilizado
          this.showCreateMessage = true;
          
          // Ocultar mensaje después de 3 segundos
          setTimeout(() => {
            this.showCreateMessage = false;
          }, 3000);
          
          this.limpiarMaterial();
          this.showMateriales(); // Refresh the list
        },
        err => {
          console.error('Error al crear material:', err);
          let errorMessage = 'Error al crear el material';
          
          if (err.error && err.error.mensaje) {
            errorMessage += `: ${err.error.mensaje}`;
          } else if (err.status === 500) {
            errorMessage += ': Error interno del servidor';
          }
          
          this.showError(errorMessage);
        }
      );
    } else {
      this.showValidation();
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
          // Mostrar mensaje de éxito estilizado
          this.showEditMessage = true;
          
          // Ocultar mensaje después de 3 segundos
          setTimeout(() => {
            this.showEditMessage = false;
          }, 3000);
          
          this.isEditing = false;
          this.editingMaterialId = '';
          this.limpiarMaterial();
          this.showMateriales(); // Refresh the list
        },
        err => {
          console.error('Error al actualizar material:', err);
          let errorMessage = 'Error al actualizar el material';
          
          if (err.error && err.error.mensaje) {
            errorMessage += `: ${err.error.mensaje}`;
          } else if (err.status === 404) {
            errorMessage += ': Material no encontrado';
          } else if (err.status === 500) {
            errorMessage += ': Error interno del servidor';
          }
          
          this.showError(errorMessage);
        }
      );
    } else {
      this.showValidation();
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

  // Show validation message
  showValidation() {
    this.showValidationMessage = true;
    setTimeout(() => {
      this.showValidationMessage = false;
    }, 3000);
  }

  // Show error message
  showError(message: string) {
    this.errorMessageText = message;
    this.showErrorMessage = true;
    setTimeout(() => {
      this.showErrorMessage = false;
      this.errorMessageText = '';
    }, 4000);
  }

  // Scroll to form section
  private scrollToForm() {
    // Small delay to ensure the form is updated
    setTimeout(() => {
      const formSection = document.getElementById('materialForm');
      if (formSection) {
        // Smooth scroll to form with offset
        const offset = 80; // 80px offset from top
        const elementPosition = formSection.offsetTop - offset;
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
        
        // Add a subtle highlight effect
        formSection.classList.add('form-highlight');
        setTimeout(() => {
          formSection.classList.remove('form-highlight');
        }, 2000);
      }
    }, 150);
  }
}
