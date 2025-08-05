import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { DataTable } from '../../components/ui/DataTable';

interface Appointment {
  id: string;
  patientName: string;
  date: string;
  day: string;
  time: string;
  status: string;
}

export const SchedulesPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch appointments from your .NET backend
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      // Replace with your .NET API endpoint
      // const response = await fetch('http://your-dotnet-api/api/appointments');
      // const data = await response.json();
      
      // Sample data for demonstration
      const sampleData: Appointment[] = [
        {
          id: '1',
          patientName: 'Ghoniem',
          date: '15-07-2025',
          day: 'Thursday',
          time: '11:00 AM to 2:00 PM',
          status: 'Upcoming'
        }
      ];
      
      setAppointments(sampleData);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { header: 'Patient Name', accessor: 'patientName' },
    { header: 'Date', accessor: 'date' },
    { header: 'Day', accessor: 'day' },
    { header: 'Time', accessor: 'time' },
    {
      header: 'Status',
      accessor: 'status',
      render: (status: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          status === 'Upcoming' 
            ? 'bg-warning/20 text-warning-foreground' 
            : 'bg-success/20 text-success-foreground'
        }`}>
          {status}
        </span>
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
        <h1 className="text-2xl font-semibold text-foreground">
          Appointments Of This Week
        </h1>
        
        <DataTable
          columns={columns}
          data={appointments}
          className="shadow-lg"
        />
      </div>
    </AdminLayout>
  );
};