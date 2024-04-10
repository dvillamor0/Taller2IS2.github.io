async function crearPersona(supabase,persona) {
    try {
      const createdPersona = await supabase.insert('persona', persona);
      console.log('Persona creada:', createdPersona);
    } catch (error) {
      console.error('Error al crear persona:', error);
    }
  }
  async function leerPersonas(supabase,filter = {}, options = {}) {
    try {
      const personas = await supabase.read('persona', '*', filter, options);
      console.log('Personas leídas:', personas);
    } catch (error) {
      console.error('Error al leer Personas:', error);
    }
}
async function actualizarPersona(supabase,idPersona, personaData) {  
    try {
      const updatedPersona = await supabase.update('persona', { id_persona: idPersona }, personaData);
      console.log('Persona actualizada:', updatedPersona);
    } catch (error) {
      console.error('Error al actualizar persona:', error);
    }
  }
  async function eliminarPersona(supabase,idPersona) {  
    try {
      await supabase.delete('persona', { id_persona: idPersona });
      console.log('Persona eliminada:', idPersona);
    } catch (error) {
      console.error('Error al eliminar persona:', error);
    }
  }