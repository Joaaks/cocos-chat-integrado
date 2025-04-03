
import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ChatProvider } from "./contexts/chat/ChatProvider";
import { ClientChat } from "./components/chat/ClientChat";
import './index.css';

// Create a class to handle widget initialization and API
class CasinoChatWidget {
  private container: HTMLElement | null = null;
  private root: any = null;
  private queryClient = new QueryClient();

  constructor() {
    // Listen for control events from the parent website
    window.addEventListener('message', this.handleExternalMessage);
    
    // Expose public methods to window for external access
    if (window) {
      (window as any).CasinoChatWidget = {
        init: this.init.bind(this),
        open: this.openChat.bind(this),
        close: this.closeChat.bind(this),
      };
    }
  }

  // Initialize the widget
  init(containerId: string = 'casino-chat-widget-container') {
    // Create container if it doesn't exist
    if (!document.getElementById(containerId)) {
      this.container = document.createElement('div');
      this.container.id = containerId;
      document.body.appendChild(this.container);
    } else {
      this.container = document.getElementById(containerId);
    }

    // Initialize React application
    if (this.container && !this.root) {
      this.root = createRoot(this.container);
      this.root.render(
        <QueryClientProvider client={this.queryClient}>
          <ChatProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <ClientChat />
            </TooltipProvider>
          </ChatProvider>
        </QueryClientProvider>
      );
    }
  }

  // Handle messages from the parent website
  private handleExternalMessage = (event: MessageEvent) => {
    if (event.data && event.data.type === 'CASINO_CHAT_CONTROL') {
      const { action } = event.data;
      
      switch (action) {
        case 'OPEN':
          this.openChat();
          break;
        case 'CLOSE':
          this.closeChat();
          break;
        default:
          break;
      }
    }
  };

  // Open the chat window
  openChat() {
    const event = new CustomEvent('casino-chat-open');
    document.dispatchEvent(event);
  }

  // Close the chat window
  closeChat() {
    const event = new CustomEvent('casino-chat-close');
    document.dispatchEvent(event);
  }
}

// Initialize the widget
const widget = new CasinoChatWidget();

// Auto-init if the container exists
if (document.getElementById('casino-chat-widget-container')) {
  widget.init();
}

export default CasinoChatWidget;
