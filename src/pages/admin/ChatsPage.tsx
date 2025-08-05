import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { apiService } from '../../services/api';
import { ChatUser, Conversation, Message, SendMessageRequest } from '../../types/api';
import { Send, User } from 'lucide-react';

export const ChatsPage: React.FC = () => {
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchChatUsers();
  }, []);

  useEffect(() => {
    if (activeConversation) {
      fetchMessages(activeConversation);
    }
  }, [activeConversation]);

  const fetchChatUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getChatUsers();
      
      if (response.statusCode === 200) {
        setUsers(response.data);
      } else {
        setError(response.message || 'Failed to fetch chat users');
      }
    } catch (err) {
      console.error('Error fetching chat users:', err);
      setError('Failed to connect to the server. Please check if the backend is running.');
      
      // Fallback to sample data for development
      const sampleUsers: ChatUser[] = [
        {
          id: 'U001',
          username: 'doctor1',
          fullName: 'Dr. Smith',
          isOnline: true,
          lastSeen: new Date().toISOString()
        },
        {
          id: 'U002',
          username: 'nurse1',
          fullName: 'Nurse Johnson',
          isOnline: false,
          lastSeen: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
        }
      ];
      setUsers(sampleUsers);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      const response = await apiService.getMessages(conversationId);
      
      if (response.statusCode === 200) {
        setMessages(response.data);
      } else {
        setError(response.message || 'Failed to fetch messages');
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to fetch messages');
      
      // Fallback to sample messages for development
      const sampleMessages: Message[] = [
        {
          id: 'M001',
          conversationId,
          senderId: 'U001',
          content: 'Hello, how can I help you today?',
          timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
          isRead: true
        },
        {
          id: 'M002',
          conversationId,
          senderId: 'current-user', // This should be the current user's ID
          content: 'I need help with the patient records system.',
          timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          isRead: true
        }
      ];
      setMessages(sampleMessages);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !activeConversation) return;

    try {
      const messageData: SendMessageRequest = {
        conversationId: activeConversation,
        content: newMessage.trim()
      };

      const response = await apiService.sendMessage(messageData);
      
      if (response.statusCode === 200) {
        setMessages(prev => [...prev, response.data]);
        setNewMessage('');
      } else {
        setError(response.message || 'Failed to send message');
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message');
    }
  };

  const createConversation = async (userId: string) => {
    try {
      const response = await apiService.createConversation({
        participantIds: [userId] // The current user would be added automatically by the backend
      });
      
      if (response.statusCode === 200) {
        setActiveConversation(response.data.id);
        setConversations(prev => [...prev, response.data]);
      } else {
        setError(response.message || 'Failed to create conversation');
      }
    } catch (err) {
      console.error('Error creating conversation:', err);
      setError('Failed to create conversation');
      
      // For development, simulate conversation creation
      const mockConversationId = `conv-${userId}-${Date.now()}`;
      setActiveConversation(mockConversationId);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading chat...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">
          Chats
        </h1>
        
        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Users List */}
          <div className="bg-card rounded-lg p-4 border">
            <h2 className="text-lg font-semibold mb-4">Available Users</h2>
            <div className="space-y-2">
              {users.map((user) => (
                <div
                  key={user.id}
                  onClick={() => createConversation(user.id)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${
                      user.isOnline ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-card-foreground truncate">
                      {user.fullName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user.isOnline ? 'Online' : `Last seen ${formatTime(user.lastSeen || '')}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Chat Area */}
          <div className="lg:col-span-2 bg-card rounded-lg border flex flex-col">
            {activeConversation ? (
              <>
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderId === 'current-user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.senderId === 'current-user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p>Select a user to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};