
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, LayoutDashboard, Users, 
  MessageSquare, FileSpreadsheet, Bell, Settings, 
  LogOut, Moon, Sun, Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // Toggle dark/light mode
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };
  
  // Handle logout
  const handleLogout = () => {
    // In a real app, we would call a logout API here
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/login');
  };
  
  // Automatically collapse sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true);
      setMobileMenuOpen(false);
    }
  }, [isMobile]);
  
  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  // Navigation items
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: MessageSquare, label: 'Chat', path: '/chat' },
    { icon: FileSpreadsheet, label: 'Requests', path: '/requests' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];
  
  const isActive = (path: string) => location.pathname.startsWith(path);
  
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar */}
      <aside 
        className={`bg-sidebar flex flex-col border-r border-sidebar-border transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'w-[70px]' : 'w-[250px]'
        } ${isMobile && !mobileMenuOpen ? '-translate-x-full' : 'translate-x-0'} ${
          isMobile ? 'fixed z-50 h-full' : ''
        }`}
      >
        {/* Logo area */}
        <div className="p-4 h-16 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="font-semibold text-xl truncate animate-fade-in">Dashboard</div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`ml-auto ${sidebarCollapsed ? 'mx-auto' : ''}`}
          >
            {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>
        
        <Separator />
        
        {/* Navigation links */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`sidebar-link w-full ${isActive(item.path) ? 'active' : ''}`}
                >
                  <item.icon size={20} />
                  {!sidebarCollapsed && (
                    <span className="animate-fade-in">{item.label}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <Separator />
        
        {/* User profile */}
        <div className="p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className={`w-full flex items-center justify-${sidebarCollapsed ? 'center' : 'start'} gap-2`}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                {!sidebarCollapsed && (
                  <div className="flex flex-col items-start text-sm animate-fade-in">
                    <span className="font-medium">John Doe</span>
                    <span className="text-xs text-muted-foreground">Admin</span>
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={toggleTheme}>
                {theme === 'light' ? (
                  <>
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light Mode</span>
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
      
      {/* Mobile sidebar overlay */}
      {isMobile && mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      {/* Main content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-border px-4 flex items-center justify-between">
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </Button>
          )}
          
          <div className="flex-1" />
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-80 overflow-y-auto">
                  <div className="py-2 px-4 hover:bg-secondary/50 cursor-pointer">
                    <div className="font-medium">New message received</div>
                    <div className="text-sm text-muted-foreground">John sent you a message</div>
                    <div className="text-xs text-muted-foreground">2 min ago</div>
                  </div>
                  <DropdownMenuSeparator />
                  <div className="py-2 px-4 hover:bg-secondary/50 cursor-pointer">
                    <div className="font-medium">New request created</div>
                    <div className="text-sm text-muted-foreground">Alex created a new request</div>
                    <div className="text-xs text-muted-foreground">1 hour ago</div>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-center">
                  <span className="mx-auto text-primary">View all notifications</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </Button>
          </div>
        </header>
        
        {/* Page content */}
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
