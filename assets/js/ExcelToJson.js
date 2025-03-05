document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencias a los elementos del DOM
    const fileInput = document.getElementById('excelFile');
    const convertBtn = document.getElementById('convertBtn');
    const jsonOutput = document.getElementById('jsonOutput');
    const downloadBtn = document.getElementById('downloadBtn');
    const fileInfo = document.getElementById('fileInfo');
    
    // Variables para almacenar datos
    let workbook = null;
    let fileName = '';
    
    // Escuchar cambios en el input de archivo
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        
        if (file) {
            fileName = file.name.split('.')[0];
            fileInfo.textContent = `Archivo seleccionado: ${file.name} (${formatFileSize(file.size)})`;
        } else {
            fileInfo.textContent = '';
        }
    });
    
    // Evento para el botón de conversión
    convertBtn.addEventListener('click', function() {
        const file = fileInput.files[0];
        
        if (!file) {
            alert('Por favor, selecciona un archivo Excel primero.');
            return;
        }
        
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                const data = new Uint8Array(e.target.result);
                workbook = XLSX.read(data, { type: 'array' });
                
                // Convertir a JSON
                const result = [];
                workbook.SheetNames.forEach(function(sheetName) {
                    const worksheet = workbook.Sheets[sheetName];
                    result.push(...XLSX.utils.sheet_to_json(worksheet, {
                        defval: "", // Valor predeterminado para celdas vacías
                        raw: false  // Convertir fechas, etc.
                    }));
                });
                
                // Mostrar JSON formateado
                const jsonStr = JSON.stringify(result, null, 2);
                jsonOutput.value = jsonStr;
                
                // Habilitar botón de descarga
                downloadBtn.disabled = false;
            } catch (error) {
                jsonOutput.value = `Error al procesar el archivo: ${error.message}`;
                downloadBtn.disabled = true;
            }
        };
        
        reader.onerror = function() {
            jsonOutput.value = 'Error al leer el archivo.';
            downloadBtn.disabled = true;
        };
        
        reader.readAsArrayBuffer(file);
        Swal.fire({
            title: '¡Archivo convertido!',
            text: 'El archivo Excel ha sido convertido a JSON con éxito.',
            icon: 'success',
            confirmButtonText: '¡Entendido!'
        });
    });
    
    // Evento para el botón de descarga
    downloadBtn.addEventListener('click', function() {
        if (!jsonOutput.value) {
            alert('No hay datos JSON para descargar.');
            return;
        }
        
        const blob = new Blob([jsonOutput.value], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        a.href = url;
        a.download = `${fileName || 'excel'}_convertido.json`;
        document.body.appendChild(a);
        a.click();
        
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    });
    
    // Función para formatear el tamaño del archivo
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
});