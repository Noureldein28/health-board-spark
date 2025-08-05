import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { DataTable } from '../../components/ui/DataTable';
import { AddMedicineModal } from '../../components/modals/AddMedicineModal';
import { apiService } from '../../services/api';
import { Patient, AddMedicineDTO } from '../../types/api';
import { User } from 'lucide-react';

export const PatientsPage: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getPatients();
      
      if (response.statusCode === 200) {
        setPatients(response.data);
      } else {
        setError(response.message || 'Failed to fetch patients');
      }
    } catch (err) {
      console.error('Error fetching patients:', err);
      setError('Failed to connect to the server. Please check if the backend is running.');
      
      // Fallback to sample data for development
      const sampleData: Patient[] = [
        {
          id: 'P001',
          fullName: 'Ghoniem',
          address: '1st street 28 taqseem_elnasr (WadiHof)',
          gender: 'Male',
          birthDate: '2003-01-15',
          bloodType: 'O+',
          imageUrl: ''
        }
      ];
      setPatients(sampleData);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMedicine = async (medicineData: { name: string; instructions: string; patientId?: string }) => {
    try {
      if (!selectedPatient) {
        setError('No patient selected');
        return;
      }

      // Create AddMedicineDTO for the backend
      const addMedicineDto: AddMedicineDTO = {
        sId: 1, // This should be the schedule ID - you may need to get this from context
        dId: 'D001', // This should be the doctor ID - you may need to get this from context
        medicine: `${medicineData.name} - ${medicineData.instructions}`
      };

      const response = await apiService.addMedicine(addMedicineDto);
      
      if (response.statusCode === 200) {
        console.log('Medicine added successfully:', response.data);
        // You might want to show a success message or refresh data
        setIsModalOpen(false);
        setSelectedPatient(null);
      } else {
        setError(response.message || 'Failed to add medicine');
      }
    } catch (err) {
      console.error('Error adding medicine:', err);
      setError('Failed to add medicine');
    }
  };

  const openMedicineModal = (patientId: string) => {
    setSelectedPatient(patientId);
    setIsModalOpen(true);
  };

  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const columns = [
    {
      header: 'Patient Name',
      accessor: 'fullName',
      render: (name: unknown, row: Patient) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            {row.imageUrl ? (
              <img src={row.imageUrl} alt={String(name)} className="w-8 h-8 rounded-full object-cover" />
            ) : (
              <User className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
          <span>{String(name)}</span>
        </div>
      )
    },
    { header: 'Address', accessor: 'address' },
    { 
      header: 'Age', 
      accessor: 'birthDate',
      render: (birthDate: unknown) => calculateAge(String(birthDate))
    },
    { header: 'Gender', accessor: 'gender' },
    { header: 'Blood Type', accessor: 'bloodType' },
    { 
      header: 'Birth Date', 
      accessor: 'birthDate',
      render: (date: unknown) => new Date(String(date)).toLocaleDateString()
    },
    {
      header: 'Action',
      accessor: 'id',
      render: (id: unknown) => (
        <button
          onClick={() => openMedicineModal(String(id))}
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
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-foreground">
            Patients Records
          </h1>
          <button
            onClick={fetchPatients}
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