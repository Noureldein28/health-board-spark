import React from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';

export const ChatsPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">
          Chats
        </h1>
        
        <div className="bg-card rounded-lg p-8 text-center">
          <div className="text-muted-foreground">
            Chat functionality will be implemented here.
            <br />
            Connect this to your .NET backend chat API.
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};