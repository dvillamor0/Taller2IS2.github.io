async function crearMunicipio(supabase,municipio) {  
    try {
      const createdMunicipio = await supabase.insert('municipio', municipio);
      console.log('Municipio creado:', createdMunicipio);
    } catch (error) {
      console.error('Error al crear municipio:', error);
    }
  }

  async function leerMunicipios(supabase,filter = {}, options = {}) {  
    try {
      const municipios = await supabase.read('municipio', '*', filter, options);
      console.log('Municipios leídos:', municipios);
      return municipios;
    } catch (error) {
      console.error('Error al leer municipios:', error);
    }
  }

  async function actualizarMunicipio(supabase,idMunicipio, municipioData) {  
    try {
      const updatedMunicipio = await supabase.update('municipio', { id_municipio: idMunicipio }, municipioData);
      console.log('Municipio actualizado:', updatedMunicipio);
    } catch (error) {
      console.error('Error al actualizar municipio:', error);
    }
  }

  async function eliminarMunicipio(supabase,idMunicipio) {  
    try {
      await supabase.delete('municipio', { id_municipio: idMunicipio });
      console.log('Municipio eliminado:', idMunicipio);
    } catch (error) {
      console.error('Error al eliminar municipio:', error);
    }
  }