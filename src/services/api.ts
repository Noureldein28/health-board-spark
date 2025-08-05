// API service to connect with your .NET backend

const API_BASE_URL = 'http://localhost:5000/api'; // Replace with your .NET API URL

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Appointments API
  async getAppointments() {
    return this.request('/appointments');
  }

  async createAppointment(appointmentData: any) {
    return this.request('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  }

  async updateAppointment(id: string, appointmentData: any) {
    return this.request(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(appointmentData),
    });
  }

  async deleteAppointment(id: string) {
    return this.request(`/appointments/${id}`, {
      method: 'DELETE',
    });
  }

  // Patients API
  async getPatients() {
    return this.request('/patients');
  }

  async getPatient(id: string) {
    return this.request(`/patients/${id}`);
  }

  async createPatient(patientData: any) {
    return this.request('/patients', {
      method: 'POST',
      body: JSON.stringify(patientData),
    });
  }

  async updatePatient(id: string, patientData: any) {
    return this.request(`/patients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(patientData),
    });
  }

  async deletePatient(id: string) {
    return this.request(`/patients/${id}`, {
      method: 'DELETE',
    });
  }

  // Medicines API
  async getMedicines() {
    return this.request('/medicines');
  }

  async addMedicine(medicineData: any) {
    return this.request('/medicines', {
      method: 'POST',
      body: JSON.stringify(medicineData),
    });
  }

  async updateMedicine(id: string, medicineData: any) {
    return this.request(`/medicines/${id}`, {
      method: 'PUT',
      body: JSON.stringify(medicineData),
    });
  }

  async deleteMedicine(id: string) {
    return this.request(`/medicines/${id}`, {
      method: 'DELETE',
    });
  }

  // Authentication API
  async login(credentials: { username: string; password: string }) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }
}

export const apiService = new ApiService();