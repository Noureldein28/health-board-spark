// TypeScript interfaces matching C# backend DTOs

export interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
  errors?: string[];
}

// Authentication Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    fullName: string;
  };
}

// Appointment Types
export interface Appointment {
  id: number;
  sId: number;
  pId: string;
  pName: string;
  dId: string;
  dName: string;
  shift: number;
  day: string;
  date: string;
  medicine: string;
  status: string;
}

export interface BookAppointmentDTO {
  sId: number;
  id: string;
}

export interface AddMedicineDTO {
  sId: number;
  dId: string;
  medicine: string;
}

export interface RescheduleAppointmentDTO {
  appointmentId: number;
  newDate: string;
  newShift: number;
}

// Patient Types
export interface Patient {
  id: string;
  fullName: string;
  address: string;
  gender: string;
  birthDate: string;
  bloodType: string;
  imageUrl: string;
}

export interface CreatePatientRequest {
  fullName: string;
  address: string;
  gender: string;
  birthDate: string;
  bloodType: string;
  imageUrl?: string;
}

// Admin Types
export interface Admin {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
  createdAt: string;
}

export interface CreateAdminRequest {
  username: string;
  email: string;
  fullName: string;
  password: string;
  role: string;
}

export interface UpdateAdminRequest {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
}

// Chat Types
export interface ChatUser {
  id: string;
  username: string;
  fullName: string;
  isOnline: boolean;
  lastSeen?: string;
}

export interface Conversation {
  id: string;
  participants: ChatUser[];
  createdAt: string;
  lastMessage?: Message;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface CreateConversationRequest {
  participantIds: string[];
}

export interface SendMessageRequest {
  conversationId: string;
  content: string;
}

// Department Types
export interface Department {
  id: string;
  name: string;
  description: string;
  headId?: string;
  headName?: string;
  createdAt: string;
}

export interface CreateDepartmentRequest {
  name: string;
  description: string;
  headId?: string;
}

export interface UpdateDepartmentRequest {
  id: string;
  name: string;
  description: string;
  headId?: string;
}

// Schedule Types
export interface DoctorSchedule {
  id: number;
  doctorId: string;
  doctorName: string;
  day: string;
  date: string;
  shift: number;
  isAvailable: boolean;
}

export interface PatientSchedule {
  id: number;
  patientId: string;
  patientName: string;
  appointments: Appointment[];
}