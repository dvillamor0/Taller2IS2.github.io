export class DataBaseCRUD{
    constructor(supabaseUrl, apiKey) {
      this.supabaseUrl = supabaseUrl;
      this.apiKey = apiKey;
    }
  
    async read(entity, select = '*', filter = {}, options = {}) {
      const url = new URL(`${this.supabaseUrl}/v1/${entity}`);
      url.searchParams.set('select', select);
  
      const filterParams = Object.entries(filter).map(([key, value]) => {
          return `${key}=${filterType[key]}.${value}`;
      });
      if (filterParams.length > 0) {
          url.searchParams.append('q', filterParams.join(','));
      }
  
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
  
      const filterParams = Object.entries(filter).map(([key, value]) => `${key}=eq.${value}`);
      if (filterParams.length === 0) {
        throw new Error('Update requires a filter to specify rows to update.');
      }
      url.searchParams.append('q', filterParams.join(','));
  
      const headers = {
        'apikey': this.apiKey,
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      };
  
      const response = await axios.patch(url.toString(), data, { headers });
      return response.data;
    }
  
    async delete(entity, filter) {
      const url = new URL(`${this.supabaseUrl}/v1/${entity}`);
  
      const filterParams = Object.entries(filter).map(([key, value]) => `${key}=eq.${value}`);
      if (filterParams.length === 0) {
        throw new Error('Delete requires a filter to specify rows to delete.');
      }
      url.searchParams.append('q', filterParams.join(','));
  
      const headers = {
        'apikey': this.apiKey,
        'Authorization': `Bearer ${this.apiKey}`,
      };
  
      const response = await axios.delete(url.toString(), { headers });
      return response.data;
    }
  }
  