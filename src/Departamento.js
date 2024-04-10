async function crearDepartamento(supabase,departamento) {
    try {
      const createdDepartamento = await supabase.insert('departamento', departamento);
      console.log('Departamento creado:', createdDepartamento);
    } catch (error) {
      console.error('Error al crear departamento:', error);
    }
  }
  
async function leerDepartamentos(supabase,filter = {}, options = {}) {
    try {
      const departamentos = await supabase.read('departamento', '*', filter, options);
      console.log('Departamentos leídos:', departamentos);
      return departamentos;
    } catch (error) {
      console.error('Error al leer departamentos:', error);
    }
  }

async function actualizarDepartamento(supabase,idDepartamento, departamentoData) {    
  try {
    const updatedDepartamento = await supabase.update('departamento', { id_departamento: idDepartamento }, departamentoData);
    console.log('Departamento actualizado:', updatedDepartamento);
  } catch (error) {
    console.error('Error al actualizar departamento:', error);
  }
}

async function eliminarDepartamento(supabase,idDepartamento) {    
  try {
    await supabase.delete('departamento', { id_departamento: idDepartamento });
    console.log('Departamento eliminado:', idDepartamento);
  } catch (error) {
    console.error('Error al eliminar departamento:', error);
  }
}