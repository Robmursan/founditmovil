// Importamos las dependencias necesarias de Angular y la librería ZXing
import { Component, OnInit, OnDestroy } from '@angular/core';//ciclo de vida del componente 
import { BrowserQRCodeReader, NotFoundException } from '@zxing/library';

/**
 * Componente para escanear códigos QR usando la cámara del dispositivo
 * Este componente permite a los usuarios escanear códigos QR directamente
 * desde su cámara web o cámara del dispositivo móvil
 */
@Component({
  selector: 'app-codelector', // Selector CSS para usar en templates
  standalone: true, // Componente standalone (no necesita módulo)
  imports: [], // Array de imports (vacío por ahora)
  templateUrl: './codelector.html', // Template HTML del componente
  styleUrl: './codelector.css' // Archivo CSS del componente
})
export class Codelector implements OnInit, OnDestroy {

  // Instancia del lector de códigos QR de ZXing
  // Esta clase se encarga de procesar el video de la cámara y detectar códigos QR
  codeReader: BrowserQRCodeReader;
  
  // Bandera para controlar si está escaneando activamente
  // Evita que se inicien múltiples procesos de escaneo simultáneamente
  isScanning: boolean = false;

  /**
   * Constructor del componente
   * Se ejecuta cuando se crea una nueva instancia del componente
   */
  constructor() {
    // Inicializamos el lector de códigos QR
    // Esto prepara la librería ZXing para trabajar con la cámara
    this.codeReader = new BrowserQRCodeReader();
  }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente
   * Se ejecuta después del constructor y cuando el componente está listo
   */
  ngOnInit(): void {
    // Aquí puedes agregar lógica de inicialización si es necesaria
    // Por ejemplo: cargar configuraciones, hacer llamadas HTTP, etc.
    // Por ahora está vacío pero puedes agregar código aquí cuando lo necesites
  }

  /**
   * Inicia el proceso de escaneo de códigos QR
   * Este método activa la cámara y comienza a buscar códigos QR en tiempo real
   */
  startScanning(): void {
    // Si ya está escaneando, no hacemos nada (evita múltiples escaneos)
    // Esto es importante para no saturar la cámara o causar conflictos
    if (this.isScanning) return;
    
    // Marcamos que estamos escaneando
    // Cambiamos la bandera para indicar que el proceso está activo
    this.isScanning = true;
    
    // Iniciamos el escaneo desde la cámara del dispositivo
    // - Primer parámetro: deviceId (undefined = cámara por defecto)
    // - Segundo parámetro: videoElementId (ID del elemento video en el HTML)
    this.codeReader.decodeFromInputVideoDevice(undefined, 'videoElementId')
      .then((result) => {
        // Si se detecta un código QR exitosamente
        // 'result' contiene la información del código escaneado
        if (result) {
          // Mostramos el texto del código en la consola
          console.log('CODIGO LEIDO', result.getText());
          // Detenemos el escaneo automáticamente después de leer un código
          this.stopScanning();
        }
      })
      .catch((error) => {
        // Si hay un error durante el escaneo
        // Solo mostramos errores que no sean "NotFoundException" (código no encontrado)
        // NotFoundException es normal y no indica un problema real
        if (error && !(error instanceof NotFoundException)) {
          console.log('ERROR', error);
        }
      });
  }

  /**
   * Detiene el proceso de escaneo y limpia los recursos
   * Es importante llamar este método para liberar la cámara y ahorrar batería
   */
  stopScanning(): void {
    // Verificamos que el lector exista antes de intentar detenerlo
    // Esto evita errores si el método se llama antes de inicializar
    if (this.codeReader) {
      // Reseteamos el lector para liberar recursos de la cámara
      // Esto detiene el video y libera la cámara para otros usos
      this.codeReader.reset();
      // Marcamos que no estamos escaneando
      // Cambiamos la bandera para indicar que el proceso está inactivo
      this.isScanning = false;
    }
  }

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente
   * Se ejecuta cuando el componente se elimina de la página
   */
  ngOnDestroy(): void {
    // Es importante limpiar recursos al destruir el componente
    // Esto evita que la cámara siga activa en segundo plano
    // Llamamos a stopScanning para asegurar que todo esté limpio
    this.stopScanning();
  }
}
