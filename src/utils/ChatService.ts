// Types for our data structure
interface User {
    id: string;
    // other user fields...
  }
  
  interface ChatMessage {
    id: string;
    content: string;
    timestamp: Date;
    role: 'user' | 'assistant';
  }
  
  interface ChatSession {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    messages: ChatMessage[];
  }
  
  // Firestore utility functions
  import { 
    collection,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    query,
    orderBy,
    getDocs,
    Timestamp,
    arrayUnion,
    limitToLast  // Changed from limit to limitToLast
  } from 'firebase/firestore';
  import { firestore } from './firebaseConfig'; // Your Firebase config file
  
  export class ChatService {
    // Create a new chat session
    async createChatSession(userId: string, initialMessage: string): Promise<string> {
      const userChatsRef = collection(firestore, 'users', userId, 'chats');
      const newChatRef = doc(userChatsRef);
      
      const chatSession: ChatSession = {
        id: newChatRef.id,
        title: `Chat ${new Date().toLocaleDateString()}`, // You can generate a better title
        createdAt: new Date(),
        updatedAt: new Date(),
        messages: [{
          id: crypto.randomUUID(),
          content: initialMessage,
          timestamp: new Date(),
          role: 'user'
        }]
      };
  
      await setDoc(newChatRef, chatSession);
      return newChatRef.id;
    }
  
    // Add a message to existing chat session
    async addMessageToChat(
      userId: string,
      chatId: string,
      content: string,
      role: 'user' | 'assistant'
    ): Promise<void> {
      const chatRef = doc(firestore, 'users', userId, 'chats', chatId);
      
      const newMessage: ChatMessage = {
        id: crypto.randomUUID(),
        content,
        timestamp: new Date(),
        role
      };
  
      await updateDoc(chatRef, {
        messages: arrayUnion(newMessage),
        updatedAt: new Date()
      });
    }
  
    // Get recent chat sessions for a user
    async getRecentChats(userId: string, maxResults: number = 10): Promise<ChatSession[]> {
      const userChatsRef = collection(firestore, 'users', userId, 'chats');
      const q = query(
        userChatsRef,
        orderBy('updatedAt', 'desc'),
        limitToLast(maxResults)  // Using limitToLast instead of limit
      );
  
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data() as ChatSession);
    }
  
    // Get a specific chat session
    async getChatSession(userId: string, chatId: string): Promise<ChatSession | null> {
      const chatRef = doc(firestore, 'users', userId, 'chats', chatId);
      const chatDoc = await getDoc(chatRef);
      
      if (!chatDoc.exists()) return null;
      return chatDoc.data() as ChatSession;
    }
  }