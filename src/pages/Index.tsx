import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, MessageCircle, Plus } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3">
            <Plus className="w-8 h-8" />
            <h1 className="text-3xl font-bold">EliteCare</h1>
          </div>
          <p className="text-lg mt-2 opacity-90">Medical Clinic Management System</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Welcome to EliteCare Admin
          </h2>
          <p className="text-xl text-muted-foreground">
            Manage your clinic efficiently with our comprehensive admin dashboard
          </p>
        </div>

        {/* Admin Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Link
            to="/admin/schedules"
            className="bg-card hover:shadow-lg transition-shadow p-8 rounded-lg border border-border group"
          >
            <Calendar className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold mb-2">Schedules</h3>
            <p className="text-muted-foreground">
              View and manage patient appointments for this week
            </p>
          </Link>

          <Link
            to="/admin/patients"
            className="bg-card hover:shadow-lg transition-shadow p-8 rounded-lg border border-border group"
          >
            <Users className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold mb-2">Patients</h3>
            <p className="text-muted-foreground">
              Access patient records and manage medical information
            </p>
          </Link>

          <Link
            to="/admin/chats"
            className="bg-card hover:shadow-lg transition-shadow p-8 rounded-lg border border-border group"
          >
            <MessageCircle className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold mb-2">Chats</h3>
            <p className="text-muted-foreground">
              Communicate with patients and staff members
            </p>
          </Link>
        </div>

        {/* Backend Integration Info */}
        <div className="mt-16 bg-muted rounded-lg p-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">Backend Integration</h3>
          <p className="text-muted-foreground mb-4">
            This system is ready to connect with your .NET backend API.
          </p>
          <div className="text-sm text-muted-foreground">
            Update the API_BASE_URL in src/services/api.ts to connect to your .NET API
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
