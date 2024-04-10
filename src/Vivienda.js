async function crearVivienda(supabase,vivienda) {  
    try {
      const createdVivienda = await supabase.insert('vivienda', vivienda);
      console.log('Vivienda creada:', createdVivienda);
    } catch (error) {
      console.error('Error al crear vivienda:', error);
    }
  }
  
  async function leerViviendas(supabase,filter = {}, options = {}) {  
    try {
      const viviendas = await supabase.read('vivienda', '*', filter, options);
      console.log('Viviendas leídas:', viviendas);
    } catch (error) {
      console.error('Error al leer viviendas:', error);
    }
  }

  async function actualizarVivienda(supabase,idVivienda, viviendaData) {  
    try {
      const updatedVivienda = await supabase.update('vivienda', { id_vivienda: idVivienda }, viviendaData);
      console.log('Vivienda actualizada:', updatedVivienda);
    } catch (error) {
      console.error('Error al actualizar vivienda:', error);
    }
  }

  async function eliminarVivienda(supabase,idVivienda) {  
    try {
      await supabase.delete('vivienda', { id_vivienda: idVivienda });
      console.log('Vivienda eliminada:', idVivienda);
    } catch (error) {
      console.error('Error al eliminar vivienda:', error);
    }
  }