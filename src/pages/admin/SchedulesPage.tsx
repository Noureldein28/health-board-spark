import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { DataTable } from '../../components/ui/DataTable';
import { apiService } from '../../services/api';
import { Appointment } from '../../types/api';

export const SchedulesPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch appointments from C# .NET backend
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getAppointments();
      
      if (response.statusCode === 200) {
        setAppointments(response.data);
      } else {
        setError(response.message || 'Failed to fetch appointments');
      }
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Failed to connect to the server. Please check if the backend is running.');
      
      // Fallback to sample data for development
      const sampleData: Appointment[] = [
        {
          id: 1,
          sId: 1,
          pId: 'P001',
          pName: 'Ghoniem',
          dId: 'D001',
          dName: 'Dr. Smith',
          shift: 1,
          day: 'Thursday',
          date: '15-07-2025',
          medicine: '',
          status: 'Upcoming'
        }
      ];
      setAppointments(sampleData);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAppointment = async (appointmentId: number) => {
    try {
      const response = await apiService.deleteAppointment(appointmentId);
      
      if (response.statusCode === 200) {
        // Remove the appointment from the local state
        setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
      } else {
        setError(response.message || 'Failed to delete appointment');
      }
    } catch (err) {
      console.error('Error deleting appointment:', err);
      setError('Failed to delete appointment');
    }
  };

  const columns = [
    { header: 'Patient Name', accessor: 'pName' },
    { header: 'Doctor Name', accessor: 'dName' },
    { header: 'Date', accessor: 'date' },
    { header: 'Day', accessor: 'day' },
    { header: 'Shift', accessor: 'shift' },
    { header: 'Medicine', accessor: 'medicine' },
    {
      header: 'Status',
      accessor: 'status',
      render: (status: unknown) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          status === 'Upcoming' 
            ? 'bg-warning/20 text-warning-foreground' 
            : 'bg-success/20 text-success-foreground'
        }`}>
          {String(status)}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: (id: unknown, row: Appointment) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleDeleteAppointment(row.id)}
            className="px-3 py-1 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors text-sm"
          >
            Delete
          </button>
        </div>
      )
    }
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading appointments...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-foreground">
            Appointments Of This Week
          </h1>
          <button
            onClick={fetchAppointments}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Refresh
          </button>
        </div>
        
        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}
        
        <DataTable
          columns={columns}
          data={appointments}
          className="shadow-lg"
        />
      </div>
    </AdminLayout>
  );
};