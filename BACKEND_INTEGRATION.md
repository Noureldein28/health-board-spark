# Backend Integration Guide

This React medical clinic admin system is designed to connect with your .NET backend API. Here's how to integrate it:

## 🚀 Quick Setup

1. **Update API URL**: Change the `API_BASE_URL` in `src/services/api.ts` to point to your .NET API
2. **Configure CORS**: Make sure your .NET API allows requests from your React app
3. **Test Endpoints**: Verify your API endpoints match the expected structure

## 📡 Expected API Endpoints

### Authentication
```
POST /api/auth/login
POST /api/auth/logout
```

### Appointments
```
GET    /api/appointments          - Get all appointments
POST   /api/appointments          - Create new appointment
PUT    /api/appointments/{id}     - Update appointment
DELETE /api/appointments/{id}     - Delete appointment
```

### Patients
```
GET    /api/patients              - Get all patients
GET    /api/patients/{id}         - Get specific patient
POST   /api/patients              - Create new patient
PUT    /api/patients/{id}         - Update patient
DELETE /api/patients/{id}         - Delete patient
```

### Medicines
```
GET    /api/medicines             - Get all medicines
POST   /api/medicines             - Add new medicine
PUT    /api/medicines/{id}        - Update medicine
DELETE /api/medicines/{id}        - Delete medicine
```

## 📋 Data Models

### Appointment Model
```json
{
  "id": "string",
  "patientName": "string",
  "date": "string",
  "day": "string", 
  "time": "string",
  "status": "string"
}
```

### Patient Model
```json
{
  "id": "string",
  "name": "string",
  "address": "string",
  "age": "number",
  "bloodType": "string",
  "dateOfAppointment": "string"
}
```

### Medicine Model
```json
{
  "id": "string",
  "name": "string",
  "instructions": "string",
  "patientId": "string"
}
```

## 🔧 Implementation Steps

### Step 1: Update API Service
Edit `src/services/api.ts` and update the `API_BASE_URL`:

```typescript
const API_BASE_URL = 'https://your-dotnet-api.com/api';
```

### Step 2: Configure CORS in .NET
Add CORS configuration in your .NET `Startup.cs` or `Program.cs`:

```csharp
services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder =>
        {
            builder.WithOrigins("http://localhost:8080") // Your React app URL
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

app.UseCors("AllowReactApp");
```

### Step 3: Test API Connection
1. Start your .NET API
2. Start the React app (`npm run dev`)
3. Navigate to `/admin/schedules` or `/admin/patients`
4. Check browser console for any API errors

## 🔒 Authentication Integration

To add authentication:

1. Update the login logic in `src/components/layout/Sidebar.tsx`
2. Store authentication tokens (localStorage/sessionStorage)
3. Add token to API requests in `src/services/api.ts`

Example token addition:
```typescript
const config: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    ...options.headers,
  },
  ...options,
};
```

## 📁 File Structure

```
src/
├── components/
│   ├── layout/          # Sidebar, Header, AdminLayout
│   ├── modals/          # AddMedicineModal
│   └── ui/              # DataTable, other UI components
├── pages/
│   └── admin/           # SchedulesPage, PatientsPage, ChatsPage
├── services/
│   └── api.ts           # API service for .NET backend
└── App.tsx              # Main routing
```

## 🎯 Key Features Implemented

- ✅ Responsive sidebar navigation
- ✅ Data tables for appointments and patients
- ✅ Add medicine modal functionality
- ✅ Professional medical UI design
- ✅ Beginner-friendly React code
- ✅ Organized file structure
- ✅ .NET API integration ready

## 🚨 Next Steps

1. Connect your .NET API endpoints
2. Add authentication/authorization
3. Implement error handling and loading states
4. Add form validation
5. Extend functionality as needed

For any issues, check the browser console and network tab for API errors.