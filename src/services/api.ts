// API service to connect with C# .NET backend

import {
  ApiResponse,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  Appointment,
  BookAppointmentDTO,
  AddMedicineDTO,
  RescheduleAppointmentDTO,
  Patient,
  CreatePatientRequest,
  Admin,
  CreateAdminRequest,
  UpdateAdminRequest,
  ChatUser,
  Conversation,
  Message,
  CreateConversationRequest,
  SendMessageRequest,
  Department,
  CreateDepartmentRequest,
  UpdateDepartmentRequest,
  DoctorSchedule,
  PatientSchedule,
} from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

class ApiService {
  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json() as ApiResponse<T>;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication API
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Appointments API
  async getAppointments(): Promise<ApiResponse<Appointment[]>> {
    return this.request<Appointment[]>('/appointment');
  }

  async bookAppointment(appointmentData: BookAppointmentDTO): Promise<ApiResponse<Appointment>> {
    return this.request<Appointment>('/appointment', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  }

  async addMedicine(medicineData: AddMedicineDTO): Promise<ApiResponse<Appointment>> {
    return this.request<Appointment>('/appointment/AddMedicine', {
      method: 'PUT',
      body: JSON.stringify(medicineData),
    });
  }

  async deleteAppointment(id: number): Promise<ApiResponse<void>> {
    return this.request<void>(`/appointment/${id}`, {
      method: 'DELETE',
    });
  }

  async rescheduleAppointment(rescheduleData: RescheduleAppointmentDTO): Promise<ApiResponse<Appointment>> {
    return this.request<Appointment>('/appointment/ReSchedule', {
      method: 'PUT',
      body: JSON.stringify(rescheduleData),
    });
  }

  async getDoctorSchedules(doctorId: string): Promise<ApiResponse<DoctorSchedule[]>> {
    return this.request<DoctorSchedule[]>(`/appointment/GetDoctorSchedules${doctorId}`);
  }

  async getPatientSchedules(patientId: string): Promise<ApiResponse<PatientSchedule[]>> {
    return this.request<PatientSchedule[]>(`/appointment/GetPatientSchedules${patientId}`);
  }

  // Admin API
  async getAdmins(): Promise<ApiResponse<Admin[]>> {
    return this.request<Admin[]>('/admin');
  }

  async getAdmin(id: string): Promise<ApiResponse<Admin>> {
    return this.request<Admin>(`/admin/${id}`);
  }

  async createAdmin(adminData: CreateAdminRequest): Promise<ApiResponse<Admin>> {
    return this.request<Admin>('/admin', {
      method: 'POST',
      body: JSON.stringify(adminData),
    });
  }

  async updateAdmin(adminData: UpdateAdminRequest): Promise<ApiResponse<Admin>> {
    return this.request<Admin>('/admin', {
      method: 'PUT',
      body: JSON.stringify(adminData),
    });
  }

  async deleteAdmin(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/admin/${id}`, {
      method: 'DELETE',
    });
  }

  // Chat API
  async getChatUsers(): Promise<ApiResponse<ChatUser[]>> {
    return this.request<ChatUser[]>('/chat/users');
  }

  async createConversation(conversationData: CreateConversationRequest): Promise<ApiResponse<Conversation>> {
    return this.request<Conversation>('/chat/conversation', {
      method: 'POST',
      body: JSON.stringify(conversationData),
    });
  }

  async getMessages(conversationId: string): Promise<ApiResponse<Message[]>> {
    return this.request<Message[]>(`/chat/messages/${conversationId}`);
  }

  async sendMessage(messageData: SendMessageRequest): Promise<ApiResponse<Message>> {
    return this.request<Message>('/chat/send-message', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  }

  // Departments API
  async getDepartments(): Promise<ApiResponse<Department[]>> {
    return this.request<Department[]>('/department');
  }

  async createDepartment(departmentData: CreateDepartmentRequest): Promise<ApiResponse<Department>> {
    return this.request<Department>('/department', {
      method: 'POST',
      body: JSON.stringify(departmentData),
    });
  }

  async updateDepartment(departmentData: UpdateDepartmentRequest): Promise<ApiResponse<Department>> {
    return this.request<Department>('/department', {
      method: 'PUT',
      body: JSON.stringify(departmentData),
    });
  }

  async deleteDepartment(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/department/${id}`, {
      method: 'DELETE',
    });
  }

  // Patients API (if available in backend)
  async getPatients(): Promise<ApiResponse<Patient[]>> {
    return this.request<Patient[]>('/patients');
  }

  async getPatient(id: string): Promise<ApiResponse<Patient>> {
    return this.request<Patient>(`/patients/${id}`);
  }

  async createPatient(patientData: CreatePatientRequest): Promise<ApiResponse<Patient>> {
    return this.request<Patient>('/patients', {
      method: 'POST',
      body: JSON.stringify(patientData),
    });
  }

  async updatePatient(id: string, patientData: CreatePatientRequest): Promise<ApiResponse<Patient>> {
    return this.request<Patient>(`/patients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(patientData),
    });
  }

  async deletePatient(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/patients/${id}`, {
      method: 'DELETE',
    });
  }

  // Token management
  setAuthToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  removeAuthToken(): void {
    localStorage.removeItem('authToken');
  }

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }
}

export const apiService = new ApiService();