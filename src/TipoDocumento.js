async function leerTiposDocumento(supabase,filter = {}, options = {}) {  
    try {
      const tiposDocumento = await supabase.read('tipo_documento', '*', filter, options);
      console.log('Tipos de documento leídos:', tiposDocumento);
    } catch (error) {
      console.error('Error al leer tipos de documento:', error);
    }
  }  