import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { LoginPage } from "./pages/LoginPage";
import { SchedulesPage } from "./pages/admin/SchedulesPage";
import { PatientsPage } from "./pages/admin/PatientsPage";
import { ChatsPage } from "./pages/admin/ChatsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/admin/schedules" 
              element={
                <ProtectedRoute>
                  <SchedulesPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/patients" 
              element={
                <ProtectedRoute>
                  <PatientsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/chats" 
              element={
                <ProtectedRoute>
                  <ChatsPage />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
