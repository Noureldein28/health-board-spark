import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Users, MessageCircle, Plus, LogIn } from 'lucide-react';

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/schedules');
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Plus className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-bold">Health Board Spark</h1>
                <p className="text-lg mt-1 opacity-90">Medical Clinic Management System</p>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 px-4 py-2 bg-primary-foreground text-primary rounded-md hover:bg-primary-foreground/90 transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Welcome to Health Board Spark
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            Comprehensive medical clinic management system with C# .NET backend integration
          </p>
          
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-lg font-medium"
          >
            <LogIn className="w-5 h-5" />
            Access Admin Dashboard
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-card p-8 rounded-lg border border-border text-center">
            <Calendar className="w-12 h-12 text-primary mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Appointment Management</h3>
            <p className="text-muted-foreground">
              Schedule, reschedule, and manage patient appointments with real-time updates
            </p>
          </div>

          <div className="bg-card p-8 rounded-lg border border-border text-center">
            <Users className="w-12 h-12 text-primary mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Patient Records</h3>
            <p className="text-muted-foreground">
              Comprehensive patient information management with medical history and prescriptions
            </p>
          </div>

          <div className="bg-card p-8 rounded-lg border border-border text-center">
            <MessageCircle className="w-12 h-12 text-primary mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Real-time Chat</h3>
            <p className="text-muted-foreground">
              Secure communication platform for healthcare professionals and patients
            </p>
          </div>
        </div>

        {/* Backend Integration Info */}
        <div className="mt-16 bg-muted rounded-lg p-8">
          <h3 className="text-2xl font-semibold mb-4 text-center">C# .NET Backend Integration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Features Implemented:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• JWT Authentication & Authorization</li>
                <li>• Real-time API communication</li>
                <li>• Appointment CRUD operations</li>
                <li>• Patient management system</li>
                <li>• Chat functionality with SignalR</li>
                <li>• Medicine prescription management</li>
                <li>• Department and admin management</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Technical Stack:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• React 18 + TypeScript</li>
                <li>• TanStack Query for data fetching</li>
                <li>• Tailwind CSS + ShadCN UI</li>
                <li>• C# .NET Web API backend</li>
                <li>• JWT token authentication</li>
                <li>• RESTful API architecture</li>
                <li>• Real-time chat with SignalR</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-background rounded-md">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Demo Credentials:</strong> Username: "admin" | Password: "admin"
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
