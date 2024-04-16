const DataBaseUrl = "https://wljlghncphcbvilwisbe.supabase.co/rest";

export class DataBaseCRUD{

    static instancia = null;

    static getInstancia(apiKey){
      if (DataBaseCRUD.instancia == null) {
        DataBaseCRUD.instancia = new DataBaseCRUD(DataBaseUrl, apiKey);
      }
      return DataBaseCRUD.instancia;
    }

    constructor(supabaseUrl, apiKey) {
      this.supabaseUrl = supabaseUrl;
      this.apiKey = apiKey;
    }
  
    async read(entity, select = '*', filter = {}, options = {}) {
      const url = new URL(`${this.supabaseUrl}/v1/${entity}`);

      Object.entries(filter).map(([key, value]) => {
        const filterType = Object.keys(value)[0];
        const filterValue = value[filterType];
        const filtro = `${filterType}.${filterValue}`;
        url.searchParams.set(key, filtro);
      });
      url.searchParams.set('select', select);

      const headers = {
        'apikey': this.apiKey,
        'Authorization': `Bearer ${this.apiKey}`,
        ...options.headers,
      };
    
      const response = await axios.get(url.toString(), { headers });
      return response.data;
    }
  
  
    async insert(entity, data) {
      const url = new URL(`${this.supabaseUrl}/v1/${entity}`);
      const headers = {
        'apikey': this.apiKey,
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      };
  
      const response = await axios.post(url.toString(), data, { headers });
      return response.data;
    }
  
    async update(entity, filter, data) {
      const url = new URL(`${this.supabaseUrl}/v1/${entity}`);
    
      Object.entries(filter).map(([key, value]) => {
        const filterType = Object.keys(value)[0];
        const filterValue = value[filterType];
        const filtro = `${filterType}.${filterValue}`;
        url.searchParams.set(key, filtro);
      });
    
      const headers = {
        'apikey': this.apiKey,
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      };

      try {
        const response = await axios.patch(url.toString(), data, { headers });     
        return response.data;
      } catch (error) {
        console.error('Error al actualizar '+entidad+':', error);
        throw error;
      }
    }
  
    async delete(entity, filter) {
      const url = new URL(`${this.supabaseUrl}/v1/${entity}`);
  
      Object.entries(filter).map(([key, value]) => {
        const filterType = Object.keys(value)[0];
        const filterValue = value[filterType];
        const filtro = `${filterType}.${filterValue}`;
        url.searchParams.set(key, filtro);
      });
  
      const headers = {
        'apikey': this.apiKey,
        'Authorization': `Bearer ${this.apiKey}`,
      };
  
      const response = await axios.delete(url.toString(), { headers });
      return response.data;
    }
  }
  