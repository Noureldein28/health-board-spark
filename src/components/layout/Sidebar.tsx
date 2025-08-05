import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Calendar, Users, MessageCircle, LogOut, Plus } from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface NavItem {
  to: string;
  icon: React.ElementType;
  label: string;
}

const navItems: NavItem[] = [
  { to: '/admin/schedules', icon: Calendar, label: 'Schedules' },
  { to: '/admin/patients', icon: Users, label: 'Patients' },
  { to: '/admin/chats', icon: MessageCircle, label: 'Chats' },
];

export const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here - call your .NET backend
    console.log('Logout clicked');
    navigate('/login');
  };

  return (
    <div className={`bg-sidebar text-sidebar-foreground transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    } min-h-screen flex flex-col`}>
      {/* Logo Section */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <Plus className="w-6 h-6 text-sidebar-foreground" />
          {!collapsed && (
            <span className="text-lg font-semibold">EliteCare</span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};