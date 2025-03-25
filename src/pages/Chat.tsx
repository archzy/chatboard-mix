
import React, { useState, useRef, useEffect } from 'react';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Search, Phone, Video, MoreVertical, Send, 
  Paperclip, Smile, Image, ChevronDown
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

// Sample users
const contacts = [
  {
    id: 1,
    name: 'John Doe',
    avatar: '/placeholder.svg',
    initials: 'JD',
    status: 'online',
    lastMessage: 'Hey, how are you?',
    time: '10:45 AM',
    unread: 2,
  },
  {
    id: 2,
    name: 'Jane Smith',
    avatar: '/placeholder.svg',
    initials: 'JS',
    status: 'online',
    lastMessage: 'Got the files, thanks!',
    time: 'Yesterday',
    unread: 0,
  },
  {
    id: 3,
    name: 'Alex Johnson',
    avatar: '/placeholder.svg',
    initials: 'AJ',
    status: 'offline',
    lastMessage: 'Let me know when you finish the report',
    time: 'Yesterday',
    unread: 0,
  },
  {
    id: 4,
    name: 'Sarah Williams',
    avatar: '/placeholder.svg',
    initials: 'SW',
    status: 'online',
    lastMessage: 'The meeting is scheduled for tomorrow',
    time: 'Monday',
    unread: 0,
  },
  {
    id: 5,
    name: 'Michael Brown',
    avatar: '/placeholder.svg',
    initials: 'MB',
    status: 'offline',
    lastMessage: 'I\'ll send you the updated version',
    time: 'Monday',
    unread: 0,
  },
];

// Sample messages for the first conversation
const initialMessages = [
  {
    id: 1,
    senderId: 1, // John Doe
    text: 'Hey, how are you?',
    timestamp: '10:45 AM',
    status: 'read',
  },
  {
    id: 2,
    senderId: 'me',
    text: 'I\'m good, thanks! Working on the dashboard project.',
    timestamp: '10:47 AM',
    status: 'read',
  },
  {
    id: 3,
    senderId: 1,
    text: 'That sounds great! How is it going?',
    timestamp: '10:48 AM',
    status: 'read',
  },
  {
    id: 4,
    senderId: 'me',
    text: 'Making good progress. The design is almost complete, and I\'m starting to implement the backend functionality.',
    timestamp: '10:50 AM',
    status: 'sent',
  },
  {
    id: 5,
    senderId: 1,
    text: 'Awesome! Do you need any help with the API integration?',
    timestamp: '10:51 AM',
    status: 'delivered',
  },
];

const Chat = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Filter contacts based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(contacts);
    }
  }, [searchQuery]);
  
  // Scroll to the bottom of the messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Send a new message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMsg = {
      id: messages.length + 1,
      senderId: 'me',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Simulate a reply after 1-3 seconds
    setTimeout(() => {
      const reply = {
        id: messages.length + 2,
        senderId: selectedContact.id,
        text: getRandomReply(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'delivered',
      };
      
      setMessages(prev => [...prev, reply]);
    }, 1000 + Math.random() * 2000);
  };
  
  // Random replies
  const getRandomReply = () => {
    const replies = [
      "Thanks for the update!",
      "Sounds good to me.",
      "I'll check back with you later.",
      "Perfect, let me know if you need anything else.",
      "Great progress! Keep it up.",
      "I'm available if you need any help.",
      "Let's discuss this in our next meeting.",
      "Do you have the documentation ready?",
    ];
    
    return replies[Math.floor(Math.random() * replies.length)];
  };
  
  // Handle message input submit
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="h-[calc(100vh-9rem)] flex animate-fade-in">
      <Card className="flex flex-1 rounded-lg overflow-hidden border-0 shadow-lg">
        {/* Contacts sidebar */}
        <div className="w-[300px] border-r flex flex-col">
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">Messages</CardTitle>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search contacts..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          
          <ScrollArea className="flex-1">
            <div className="space-y-1 p-2">
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <button
                    key={contact.id}
                    className={`w-full flex items-start p-3 rounded-lg transition-colors hover:bg-secondary/80 ${
                      selectedContact.id === contact.id ? 'bg-secondary' : ''
                    }`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                        <AvatarFallback>{contact.initials}</AvatarFallback>
                      </Avatar>
                      <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                        contact.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                    </div>
                    
                    <div className="ml-3 flex-1 text-left">
                      <div className="flex justify-between items-center">
                        <span className="font-medium truncate">{contact.name}</span>
                        <span className="text-xs text-muted-foreground">{contact.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-1">
                        {contact.lastMessage}
                      </p>
                    </div>
                    
                    {contact.unread > 0 && (
                      <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                        {contact.unread}
                      </Badge>
                    )}
                  </button>
                ))
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  No contacts found
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
        
        {/* Chat area */}
        <div className="flex-1 flex flex-col bg-card/50">
          {selectedContact ? (
            <>
              {/* Chat header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar>
                    <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                    <AvatarFallback>{selectedContact.initials}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <h3 className="font-medium">{selectedContact.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <span className={`h-2 w-2 rounded-full mr-1 ${
                        selectedContact.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                      {selectedContact.status === 'online' ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View profile</DropdownMenuItem>
                      <DropdownMenuItem>Search in conversation</DropdownMenuItem>
                      <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:text-destructive">
                        Clear conversation
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => {
                    const isMe = message.senderId === 'me';
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className="flex items-end gap-2 max-w-[80%]">
                          {!isMe && (
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                              <AvatarFallback>{selectedContact.initials}</AvatarFallback>
                            </Avatar>
                          )}
                          
                          <div className={`rounded-xl p-3 ${
                            isMe 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-secondary text-secondary-foreground'
                          }`}>
                            <p className="text-sm">{message.text}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              {/* Message input */}
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Paperclip className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Image className="h-4 w-4 mr-2" />
                        Share Image
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Paperclip className="h-4 w-4 mr-2" />
                        Share File
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <Input 
                    placeholder="Type a message..." 
                    className="flex-1"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    disabled={!newMessage.trim()}
                    onClick={handleSendMessage}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Select a contact to start chatting
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Chat;
