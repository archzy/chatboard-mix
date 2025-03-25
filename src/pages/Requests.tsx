
import React, { useState } from 'react';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, SelectContent, SelectGroup, SelectItem, 
  SelectLabel, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import {
  FileText, MoreHorizontal, PlusCircle, Search, Filter, 
  ArrowUpRight, Check, X, Clock, RotateCw, Eye
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

// Sample requests data
const initialRequests = [
  {
    id: 'REQ-001',
    title: 'Finance Module Access',
    description: 'Need access to the Finance module to view budget reports.',
    department: 'Finance',
    status: 'Pending',
    priority: 'High',
    created: '2023-09-15',
    requester: {
      id: 1,
      name: 'John Doe',
      avatar: '/placeholder.svg',
      initials: 'JD',
    },
    assignee: {
      id: 2,
      name: 'Sarah Williams',
      avatar: '/placeholder.svg',
      initials: 'SW',
    },
  },
  {
    id: 'REQ-002',
    title: 'Tax Documentation Approval',
    description: 'Requesting approval for the Q2 tax documentation.',
    department: 'Tax',
    status: 'In Progress',
    priority: 'Medium',
    created: '2023-09-14',
    requester: {
      id: 3,
      name: 'Alex Johnson',
      avatar: '/placeholder.svg',
      initials: 'AJ',
    },
    assignee: {
      id: 4,
      name: 'Michael Brown',
      avatar: '/placeholder.svg',
      initials: 'MB',
    },
  },
  {
    id: 'REQ-003',
    title: 'Payroll Adjustment',
    description: 'Request for payroll adjustment for the accounting team.',
    department: 'Payroll',
    status: 'Approved',
    priority: 'Medium',
    created: '2023-09-10',
    requester: {
      id: 5,
      name: 'Jane Smith',
      avatar: '/placeholder.svg',
      initials: 'JS',
    },
    assignee: {
      id: 1,
      name: 'John Doe',
      avatar: '/placeholder.svg',
      initials: 'JD',
    },
  },
  {
    id: 'REQ-004',
    title: 'Digital Certificate Renewal',
    description: 'Requesting renewal of digital certificates for the development team.',
    department: 'Digital Certificate',
    status: 'Completed',
    priority: 'Low',
    created: '2023-09-05',
    requester: {
      id: 4,
      name: 'Michael Brown',
      avatar: '/placeholder.svg',
      initials: 'MB',
    },
    assignee: {
      id: 3,
      name: 'Alex Johnson',
      avatar: '/placeholder.svg',
      initials: 'AJ',
    },
  },
  {
    id: 'REQ-005',
    title: 'Accounting System Access',
    description: 'Need access to the accounting system for audit purposes.',
    department: 'Accounting',
    status: 'Rejected',
    priority: 'High',
    created: '2023-09-01',
    requester: {
      id: 2,
      name: 'Sarah Williams',
      avatar: '/placeholder.svg',
      initials: 'SW',
    },
    assignee: {
      id: 5,
      name: 'Jane Smith',
      avatar: '/placeholder.svg',
      initials: 'JS',
    },
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

// Status options
const statuses = [
  'Pending',
  'In Progress',
  'Approved',
  'Completed',
  'Rejected',
];

// Priority options
const priorities = ['Low', 'Medium', 'High'];

// Users (for assignee selection)
const users = [
  {
    id: 1,
    name: 'John Doe',
    avatar: '/placeholder.svg',
    initials: 'JD',
  },
  {
    id: 2,
    name: 'Sarah Williams',
    avatar: '/placeholder.svg',
    initials: 'SW',
  },
  {
    id: 3,
    name: 'Alex Johnson',
    avatar: '/placeholder.svg',
    initials: 'AJ',
  },
  {
    id: 4,
    name: 'Michael Brown',
    avatar: '/placeholder.svg',
    initials: 'MB',
  },
  {
    id: 5,
    name: 'Jane Smith',
    avatar: '/placeholder.svg',
    initials: 'JS',
  },
];

const Requests = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [requests, setRequests] = useState(initialRequests);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  
  // New request form state
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    department: '',
    priority: 'Medium',
    assigneeId: '',
  });
  
  // Get filtered requests based on active tab and search query
  const getFilteredRequests = () => {
    let filtered = [...requests];
    
    // Filter by tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(request => {
        if (activeTab === 'pending') return request.status === 'Pending';
        if (activeTab === 'inProgress') return request.status === 'In Progress';
        if (activeTab === 'completed') return ['Approved', 'Completed'].includes(request.status);
        if (activeTab === 'myRequests') return request.requester.id === 1; // Assuming current user id is 1
        return true;
      });
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(request => 
        request.title.toLowerCase().includes(query) ||
        request.id.toLowerCase().includes(query) ||
        request.department.toLowerCase().includes(query) ||
        request.requester.name.toLowerCase().includes(query) ||
        request.assignee.name.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };
  
  const filteredRequests = getFilteredRequests();
  
  // Handle creating a new request
  const handleCreateRequest = () => {
    if (!newRequest.title || !newRequest.department || !newRequest.assigneeId) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Find assignee from users array
    const assignee = users.find(user => user.id.toString() === newRequest.assigneeId.toString());
    
    if (!assignee) {
      toast({
        title: "Invalid assignee",
        description: "Please select a valid assignee.",
        variant: "destructive",
      });
      return;
    }
    
    // Generate a new request ID
    const requestId = `REQ-${(requests.length + 1).toString().padStart(3, '0')}`;
    
    const newRequestObject = {
      id: requestId,
      title: newRequest.title,
      description: newRequest.description,
      department: newRequest.department,
      status: 'Pending',
      priority: newRequest.priority,
      created: new Date().toISOString().split('T')[0],
      requester: users[0], // Assuming current user is users[0]
      assignee,
    };
    
    setRequests([newRequestObject, ...requests]);
    
    toast({
      title: "Request created",
      description: `Request ${requestId} has been created successfully.`,
    });
    
    // Reset form
    setNewRequest({
      title: '',
      description: '',
      department: '',
      priority: 'Medium',
      assigneeId: '',
    });
    
    setIsCreateDialogOpen(false);
  };
  
  // Handle viewing a request
  const handleViewRequest = (request: any) => {
    setSelectedRequest(request);
    setIsViewDialogOpen(true);
  };
  
  // Get status badge variant
  const getStatusVariant = (status: string) => {
    if (status === 'Approved' || status === 'Completed') return 'default';
    if (status === 'Pending') return 'secondary';
    if (status === 'In Progress') return 'outline';
    if (status === 'Rejected') return 'destructive';
    return 'outline';
  };
  
  // Get status icon
  const getStatusIcon = (status: string) => {
    if (status === 'Approved' || status === 'Completed') return Check;
    if (status === 'Pending') return Clock;
    if (status === 'In Progress') return RotateCw;
    if (status === 'Rejected') return X;
    return Clock;
  };
  
  // Get priority badge variant
  const getPriorityVariant = (priority: string) => {
    if (priority === 'High') return 'destructive';
    if (priority === 'Medium') return 'secondary';
    if (priority === 'Low') return 'outline';
    return 'outline';
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Requests</h1>
          <p className="text-muted-foreground mt-1">Manage departmental requests and approvals</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="shrink-0">
              <PlusCircle className="h-4 w-4 mr-2" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create New Request</DialogTitle>
              <DialogDescription>
                Fill in the details for your new request.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  placeholder="Enter request title"
                  value={newRequest.title}
                  onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Provide details about your request"
                  rows={4}
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="department">Department</Label>
                <Select 
                  onValueChange={(value) => setNewRequest({...newRequest, department: value})}
                >
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((department) => (
                      <SelectItem key={department} value={department}>
                        {department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select 
                  defaultValue="Medium"
                  onValueChange={(value) => setNewRequest({...newRequest, priority: value})}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {priority}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="assignee">Assign To</Label>
                <Select 
                  onValueChange={(value) => setNewRequest({...newRequest, assigneeId: value})}
                >
                  <SelectTrigger id="assignee">
                    <SelectValue placeholder="Select an assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateRequest}>
                Create Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Tabs and Search */}
      <div className="flex flex-col gap-4">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="inProgress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="myRequests">My Requests</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search requests..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
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
                    Status
                  </DropdownMenuLabel>
                  {statuses.map((status) => (
                    <DropdownMenuItem key={status} className="cursor-pointer">
                      <Check className="h-4 w-4 mr-2 opacity-0" />
                      {status}
                    </DropdownMenuItem>
                  ))}
                  
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
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">
                    Priority
                  </DropdownMenuLabel>
                  {priorities.map((priority) => (
                    <DropdownMenuItem key={priority} className="cursor-pointer">
                      <Check className="h-4 w-4 mr-2 opacity-0" />
                      {priority}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Requests table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead className="w-[300px]">Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Requester</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    No requests found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredRequests.map((request) => {
                  const StatusIcon = getStatusIcon(request.status);
                  return (
                    <TableRow key={request.id} className="hover:bg-secondary/50">
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>
                        <div className="font-medium truncate max-w-[280px]">
                          {request.title}
                        </div>
                      </TableCell>
                      <TableCell>{request.department}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(request.status)} className="flex w-fit items-center gap-1">
                          <StatusIcon className="h-3 w-3" />
                          <span>{request.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPriorityVariant(request.priority)}>
                          {request.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={request.requester.avatar} alt={request.requester.name} />
                            <AvatarFallback>{request.requester.initials}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{request.requester.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={request.assignee.avatar} alt={request.assignee.name} />
                            <AvatarFallback>{request.assignee.initials}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{request.assignee.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {new Date(request.created).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewRequest(request)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="border-t py-4">
          <div className="text-sm text-muted-foreground">
            Showing {filteredRequests.length} of {requests.length} requests
          </div>
        </CardFooter>
      </Card>
      
      {/* View Request Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Request Details
            </DialogTitle>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold">{selectedRequest.title}</h3>
                    <Badge variant={getStatusVariant(selectedRequest.status)} className="flex items-center gap-1">
                      {React.createElement(getStatusIcon(selectedRequest.status), { className: "h-3 w-3" })}
                      <span>{selectedRequest.status}</span>
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mt-1">
                    {selectedRequest.id} · {selectedRequest.department}
                  </p>
                </div>
                <Badge variant={getPriorityVariant(selectedRequest.priority)}>
                  {selectedRequest.priority} Priority
                </Badge>
              </div>
              
              <div className="border rounded-md p-4 bg-secondary/50">
                <p className="text-sm">{selectedRequest.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium mb-1">Requested By</h4>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={selectedRequest.requester.avatar} alt={selectedRequest.requester.name} />
                      <AvatarFallback>{selectedRequest.requester.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedRequest.requester.name}</p>
                      <p className="text-sm text-muted-foreground">Requester</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Assigned To</h4>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={selectedRequest.assignee.avatar} alt={selectedRequest.assignee.name} />
                      <AvatarFallback>{selectedRequest.assignee.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedRequest.assignee.name}</p>
                      <p className="text-sm text-muted-foreground">Assignee</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium mb-1">Created On</h4>
                  <p className="text-sm">
                    {new Date(selectedRequest.created).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Last Updated</h4>
                  <p className="text-sm">{new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}</p>
                </div>
              </div>
              
              <div className="space-y-2 pt-4 border-t">
                <h4 className="text-sm font-medium">Activity</h4>
                <div className="text-sm text-muted-foreground">
                  <p>Request created by {selectedRequest.requester.name} on {new Date(selectedRequest.created).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="gap-2 sm:gap-0">
            {selectedRequest && selectedRequest.status === 'Pending' && (
              <>
                <Button variant="outline" className="w-full sm:w-auto">
                  <X className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button className="w-full sm:w-auto">
                  <Check className="h-4 w-4 mr-2" />
                  Approve
                </Button>
              </>
            )}
            {selectedRequest && selectedRequest.status === 'In Progress' && (
              <Button className="w-full sm:w-auto">
                <Check className="h-4 w-4 mr-2" />
                Mark as Completed
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Requests;
