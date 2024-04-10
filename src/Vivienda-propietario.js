async function crearViviendaPropietario(supabase, vivienda_propietario) {
    try {
      const nuevaViviendaPropietario = await supabase.insert('vivienda_propietario', vivienda_propietario);
      console.log('Relación Vivienda_Propietario creada:', nuevaViviendaPropietario);
    } catch (error) {
      console.error('Error al crear relación Vivienda_Propietario:', error);
    }
  }

  async function leerViviendaPropietarios(supabase, filter = {}, options = {}) {
    try {
      const viviendaPropietarios = await supabase.read('vivienda_propietario', '*', filter, options);
      console.log('Relaciones Vivienda_Propietario leídas:', viviendaPropietarios);
      return viviendaPropietarios;
    } catch (error) {
      console.error('Error al leer relaciones Vivienda_Propietario:', error);
    }
  }

  async function actualizarViviendaPropietario(supabase, vivienda_propietario) {
    try {
      const viviendaPropietarioActualizada = await supabase.update('vivienda_propietario', vivienda_propietario);
      console.log('Relación Vivienda_Propietario actualizada:', viviendaPropietarioActualizada);
    } catch (error) {
      console.error('Error al actualizar relación Vivienda_Propietario:', error);
    }
  }

  async function eliminarViviendaPropietario(supabase, vivienda_propietario) {
    try {
      await supabase.delete('vivienda_propietario',vivienda_propietario);
      console.log('Relación Vivienda_Propietario eliminada:', vivienda_propietario);
    } catch (error) {
      console.error('Error al eliminar relación Vivienda_Propietario:', error);
    }
  }