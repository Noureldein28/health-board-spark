import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { DataTable } from '../../components/ui/DataTable';
import { AddMedicineModal } from '../../components/modals/AddMedicineModal';
import { User } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  address: string;
  age: number;
  bloodType: string;
  dateOfAppointment: string;
  avatar?: string;
}

export const PatientsPage: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      // Replace with your .NET API endpoint
      // const response = await fetch('http://your-dotnet-api/api/patients');
      // const data = await response.json();
      
      // Sample data for demonstration
      const sampleData: Patient[] = [
        {
          id: '1',
          name: 'Ghoniem',
          address: '1st street 28 taqseem_elnasr (WadiHof)',
          age: 21,
          bloodType: '--',
          dateOfAppointment: '15-07-2025'
        }
      ];
      
      setPatients(sampleData);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMedicine = async (medicineData: { name: string; instructions: string; patientId?: string }) => {
    try {
      // Call your .NET API to add medicine
      // const response = await fetch('http://your-dotnet-api/api/medicines', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(medicineData),
      // });
      
      console.log('Adding medicine:', medicineData);
      // Handle success - maybe show a toast notification
      
    } catch (error) {
      console.error('Error adding medicine:', error);
    }
  };

  const openMedicineModal = (patientId: string) => {
    setSelectedPatient(patientId);
    setIsModalOpen(true);
  };

  const columns = [
    {
      header: 'Patient Name',
      accessor: 'name',
      render: (name: string, row: Patient) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-muted-foreground" />
          </div>
          <span>{name}</span>
        </div>
      )
    },
    { header: 'Address', accessor: 'address' },
    { header: 'Age', accessor: 'age' },
    { header: 'Blood Type', accessor: 'bloodType' },
    { header: 'Date of Appointment', accessor: 'dateOfAppointment' },
    {
      header: 'Action',
      accessor: 'id',
      render: (id: string) => (
        <button
          onClick={() => openMedicineModal(id)}
          className="px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors text-sm font-medium"
        >
          Add Medicine
        </button>
      )
    }
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading patients...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">
          Patients Records
        </h1>
        
        <DataTable
          columns={columns}
          data={patients}
          className="shadow-lg"
        />

        <AddMedicineModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPatient(null);
          }}
          onSubmit={handleAddMedicine}
          patientId={selectedPatient || undefined}
        />
      </div>
    </AdminLayout>
  );
};