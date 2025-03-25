
import React, { useState } from 'react';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '@/components/ui/card';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Select, SelectContent, SelectGroup, SelectItem, 
  SelectLabel, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  PlusCircle, MoreHorizontal, Search, X, Filter, 
  Check, UserPlus, Edit, Trash2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

// Sample user data
const initialUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    departments: ['Finance', 'Tax'],
    avatar: '/placeholder.svg',
    initials: 'JD',
    lastActive: '5 min ago',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Operator',
    status: 'Active',
    departments: ['Payroll'],
    avatar: '/placeholder.svg',
    initials: 'JS',
    lastActive: '2 hours ago',
  },
  {
    id: 3,
    name: 'Alex Johnson',
    email: 'alex@example.com',
    role: 'Guest',
    status: 'Inactive',
    departments: ['Accounting'],
    avatar: '/placeholder.svg',
    initials: 'AJ',
    lastActive: '3 days ago',
  },
  {
    id: 4,
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    role: 'Operator',
    status: 'Active',
    departments: ['Digital Certificate', 'Finance'],
    avatar: '/placeholder.svg',
    initials: 'SW',
    lastActive: '1 hour ago',
  },
  {
    id: 5,
    name: 'Michael Brown',
    email: 'michael@example.com',
    role: 'Admin',
    status: 'Active',
    departments: ['Tax', 'Accounting'],
    avatar: '/placeholder.svg',
    initials: 'MB',
    lastActive: 'Just now',
  },
];

// Department options
const departments = [
  'Finance',
  'Tax',
  'Payroll',
  'Accounting',
  'Digital Certificate',
];

// Role options
const roles = ['Admin', 'Operator', 'Guest'];

const Users = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  
  // New user form state
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    status: 'Active',
    departments: [] as string[],
  });
  
  // Filter users based on search query
  const filteredUsers = users.filter(user => {
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query) ||
      user.departments.some(dep => dep.toLowerCase().includes(query))
    );
  });
  
  // Handle adding a new user
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role || newUser.departments.length === 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    const id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const initials = newUser.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
      
    const newUserObject = {
      id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status,
      departments: newUser.departments,
      avatar: '/placeholder.svg',
      initials,
      lastActive: 'Just now',
    };
    
    setUsers([...users, newUserObject]);
    
    toast({
      title: "User created",
      description: `${newUser.name} has been added successfully.`,
    });
    
    // Reset form
    setNewUser({
      name: '',
      email: '',
      role: '',
      status: 'Active',
      departments: [],
    });
    
    setIsAddUserDialogOpen(false);
  };
  
  // Handle updating a user
  const handleUpdateUser = () => {
    if (!currentUser) return;
    
    const updatedUsers = users.map(user => 
      user.id === currentUser.id ? { ...currentUser } : user
    );
    
    setUsers(updatedUsers);
    
    toast({
      title: "User updated",
      description: `${currentUser.name}'s information has been updated.`,
    });
    
    setIsEditUserDialogOpen(false);
  };
  
  // Handle deleting a user
  const handleDeleteUser = () => {
    if (!currentUser) return;
    
    const updatedUsers = users.filter(user => user.id !== currentUser.id);
    setUsers(updatedUsers);
    
    toast({
      title: "User deleted",
      description: `${currentUser.name} has been removed.`,
    });
    
    setIsDeleteDialogOpen(false);
  };
  
  // Toggle department selection for new user
  const toggleDepartment = (department: string) => {
    if (newUser.departments.includes(department)) {
      setNewUser({
        ...newUser,
        departments: newUser.departments.filter(d => d !== department),
      });
    } else {
      setNewUser({
        ...newUser,
        departments: [...newUser.departments, department],
      });
    }
  };
  
  // Toggle department selection for editing user
  const toggleEditDepartment = (department: string) => {
    if (!currentUser) return;
    
    const updatedDepartments = currentUser.departments.includes(department)
      ? currentUser.departments.filter((d: string) => d !== department)
      : [...currentUser.departments, department];
      
    setCurrentUser({
      ...currentUser,
      departments: updatedDepartments,
    });
  };
  
  // Open edit user dialog
  const openEditDialog = (user: any) => {
    setCurrentUser(user);
    setIsEditUserDialogOpen(true);
  };
  
  // Open delete confirmation dialog
  const openDeleteDialog = (user: any) => {
    setCurrentUser(user);
    setIsDeleteDialogOpen(true);
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground mt-1">Manage user accounts and permissions</p>
        </div>
        
        <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
          <DialogTrigger asChild>
            <Button className="shrink-0">
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Enter the details for the new user account.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select 
                  onValueChange={(value) => setNewUser({...newUser, role: value})}
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label>Departments</Label>
                <div className="border rounded-md p-4 space-y-2">
                  {departments.map((department) => (
                    <div key={department} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`department-${department}`}
                        checked={newUser.departments.includes(department)}
                        onCheckedChange={() => toggleDepartment(department)}
                      />
                      <label 
                        htmlFor={`department-${department}`}
                        className="text-sm cursor-pointer"
                      >
                        {department}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddUser}>
                Add User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Search and filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search users..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="shrink-0">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">
                  Role
                </DropdownMenuLabel>
                {roles.map((role) => (
                  <DropdownMenuItem key={role} className="cursor-pointer">
                    <Check className="h-4 w-4 mr-2 opacity-0" />
                    {role}
                  </DropdownMenuItem>
                ))}
                
                <DropdownMenuSeparator />
                
                <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">
                  Status
                </DropdownMenuLabel>
                <DropdownMenuItem className="cursor-pointer">
                  <Check className="h-4 w-4 mr-2 opacity-0" />
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Check className="h-4 w-4 mr-2 opacity-0" />
                  Inactive
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">
                  Department
                </DropdownMenuLabel>
                {departments.map((department) => (
                  <DropdownMenuItem key={department} className="cursor-pointer">
                    <Check className="h-4 w-4 mr-2 opacity-0" />
                    {department}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
      
      {/* Users table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Departments</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No users found matching your search.
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-secondary/50">
                    <TableCell className="flex items-center space-x-3 py-4">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        user.role === 'Admin' ? 'default' : 
                        user.role === 'Operator' ? 'secondary' : 
                        'outline'
                      }>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className={`h-2 w-2 rounded-full mr-2 ${
                          user.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'
                        }`} />
                        {user.status}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.departments.map((dept) => (
                          <Badge key={dept} variant="outline" className="bg-secondary">
                            {dept}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{user.lastActive}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => openEditDialog(user)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openDeleteDialog(user)} className="text-destructive focus:text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="border-t py-4">
          <div className="text-sm text-muted-foreground">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </CardFooter>
      </Card>
      
      {/* Edit User Dialog */}
      <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user account details and permissions.
            </DialogDescription>
          </DialogHeader>
          
          {currentUser && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input 
                  id="edit-name" 
                  value={currentUser.name}
                  onChange={(e) => setCurrentUser({...currentUser, name: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input 
                  id="edit-email" 
                  type="email" 
                  value={currentUser.email}
                  onChange={(e) => setCurrentUser({...currentUser, email: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-role">Role</Label>
                <Select 
                  defaultValue={currentUser.role}
                  onValueChange={(value) => setCurrentUser({...currentUser, role: value})}
                >
                  <SelectTrigger id="edit-role">
                    <SelectValue placeholder={currentUser.role} />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select 
                  defaultValue={currentUser.status}
                  onValueChange={(value) => setCurrentUser({...currentUser, status: value})}
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder={currentUser.status} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label>Departments</Label>
                <div className="border rounded-md p-4 space-y-2">
                  {departments.map((department) => (
                    <div key={department} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`edit-department-${department}`}
                        checked={currentUser.departments.includes(department)}
                        onCheckedChange={() => toggleEditDepartment(department)}
                      />
                      <label 
                        htmlFor={`edit-department-${department}`}
                        className="text-sm cursor-pointer"
                      >
                        {department}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateUser}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {currentUser && (
            <div className="flex items-center space-x-3 py-4">
              <Avatar>
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>{currentUser.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{currentUser.name}</p>
                <p className="text-sm text-muted-foreground">{currentUser.email}</p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Users;
