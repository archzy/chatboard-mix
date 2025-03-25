
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, FileSpreadsheet, Users, ArrowUpRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

// Sample data for widgets
const stats = [
  {
    id: 1,
    title: 'Total Users',
    value: '256',
    change: '+12.3%',
    changeType: 'positive',
    icon: Users,
  },
  {
    id: 2,
    title: 'Unread Messages',
    value: '24',
    change: '+8.7%',
    changeType: 'positive',
    icon: MessageSquare,
  },
  {
    id: 3,
    title: 'Open Requests',
    value: '18',
    change: '-2.5%',
    changeType: 'negative',
    icon: FileSpreadsheet,
  },
];

// Recent messages
const recentMessages = [
  {
    id: 1,
    user: {
      name: 'Alex Johnson',
      avatar: '/placeholder.svg',
      initials: 'AJ',
    },
    message: 'Hi there! Just checking in on the latest project updates.',
    time: '5 min ago',
    unread: true,
  },
  {
    id: 2,
    user: {
      name: 'Sarah Williams',
      avatar: '/placeholder.svg',
      initials: 'SW',
    },
    message: 'Could you please review the design files I sent yesterday?',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 3,
    user: {
      name: 'Mike Brown',
      avatar: '/placeholder.svg',
      initials: 'MB',
    },
    message: 'The meeting has been rescheduled to tomorrow at 10 AM.',
    time: '1 day ago',
    unread: false,
  },
];

// Recent requests
const recentRequests = [
  {
    id: 1,
    title: 'Access to Finance Module',
    department: 'Finance',
    status: 'Pending',
    date: '2023-09-15',
    requestor: {
      name: 'David Miller',
      avatar: '/placeholder.svg',
      initials: 'DM',
    },
  },
  {
    id: 2,
    title: 'New Tax Documentation',
    department: 'Tax',
    status: 'In Progress',
    date: '2023-09-14',
    requestor: {
      name: 'Joanna Smith',
      avatar: '/placeholder.svg',
      initials: 'JS',
    },
  },
  {
    id: 3,
    title: 'Payroll Adjustment Request',
    department: 'Payroll',
    status: 'Approved',
    date: '2023-09-10',
    requestor: {
      name: 'Robert Chen',
      avatar: '/placeholder.svg',
      initials: 'RC',
    },
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back, here's an overview of your workspace</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={stat.id} className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center pt-1">
                <span className={`text-xs ${stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Unread Messages */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Unread Messages</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">
                <MessageSquare className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
            <CardDescription>Your recent unread messages</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {recentMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`p-4 hover:bg-secondary/50 transition-colors ${message.unread ? 'bg-primary/5' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={message.user.avatar} alt={message.user.name} />
                      <AvatarFallback>{message.user.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{message.user.name}</p>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                          <p className="text-xs text-muted-foreground">{message.time}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">{message.message}</p>
                    </div>
                    {message.unread && <Badge variant="outline" className="ml-2">New</Badge>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Requests */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Recent Requests</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
            <CardDescription>Request activities assigned to you</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {recentRequests.map((request) => (
                <div key={request.id} className="p-4 hover:bg-secondary/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={request.requestor.avatar} alt={request.requestor.name} />
                        <AvatarFallback>{request.requestor.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium line-clamp-1">{request.title}</p>
                        <p className="text-xs text-muted-foreground">
                          By {request.requestor.name} · {request.department}
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant={
                        request.status === 'Approved' ? 'default' : 
                        request.status === 'Pending' ? 'secondary' : 
                        'outline'
                      }
                    >
                      {request.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-muted-foreground">
                      Submitted on {new Date(request.date).toLocaleDateString()}
                    </p>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your activity from the past 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative pl-6 border-l">
            {/* Activity item */}
            <div className="mb-8 relative">
              <div className="absolute -left-[25px] h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div className="pt-1">
                <p className="font-medium">New user registered</p>
                <p className="text-sm text-muted-foreground mt-1">Emily Johnson created a new account</p>
                <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
              </div>
            </div>
            
            {/* Activity item */}
            <div className="mb-8 relative">
              <div className="absolute -left-[25px] h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div className="pt-1">
                <p className="font-medium">New message received</p>
                <p className="text-sm text-muted-foreground mt-1">David sent you a message about the project deadline</p>
                <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
              </div>
            </div>
            
            {/* Activity item */}
            <div className="relative">
              <div className="absolute -left-[25px] h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <FileSpreadsheet className="h-5 w-5 text-primary" />
              </div>
              <div className="pt-1">
                <p className="font-medium">Request status updated</p>
                <p className="text-sm text-muted-foreground mt-1">Your access request to the Finance module was approved</p>
                <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
