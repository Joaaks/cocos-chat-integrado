
import React, { useState, useRef } from 'react';
import { Send, Image, ChevronDown, ChevronUp } from 'lucide-react';
import { MacrosQuickAccess } from './MacrosQuickAccess';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ChatInputProps {
  sendMessage: (content: string) => void;
  uploadImage?: (file: File) => Promise<string>;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  sendMessage,
  uploadImage
}) => {
  const { state } = useChat();
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [showMacros, setShowMacros] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() !== '') {
      sendMessage(message);
      setMessage('');
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && uploadImage) {
      setIsUploading(true);
      try {
        const imageUrl = await uploadImage(file);
        sendMessage(imageUrl);
      } catch (error) {
        console.error('Failed to upload image:', error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleInsertMacro = (content: string) => {
    setMessage(content);
  };

  return (
    <div className="flex flex-col">
      {/* Macros Quick Pills */}
      {showMacros && state.macros.length > 0 && (
        <div className="px-3 py-2 bg-casino-primary border-t border-casino-secondary">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-xs font-medium text-gray-400">Mensajes rápidos:</h4>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-5 w-5 p-0 text-gray-400 hover:text-casino-gold"
              onClick={() => setShowMacros(false)}
            >
              <ChevronDown size={14} />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {state.macros.map((macro) => (
              <Tooltip key={macro.id}>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 px-2 py-0 text-xs bg-casino-secondary border-casino-secondary text-casino-text hover:bg-casino-accent hover:text-white truncate max-w-[100px]"
                    onClick={() => handleInsertMacro(macro.content)}
                  >
                    {macro.title}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[250px] p-2 text-xs">
                  <p className="font-bold mb-1">{macro.title}</p>
                  <p className="line-clamp-3">{macro.content}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      )}

      {/* Input form */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-casino-secondary p-3 bg-casino-primary flex items-center gap-2"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          accept="image/*"
        />
        
        {/* Toggle Macros button when hidden */}
        {!showMacros && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-casino-text hover:text-casino-gold hover:bg-transparent"
            onClick={() => setShowMacros(true)}
            title="Mostrar mensajes rápidos"
          >
            <ChevronUp size={20} />
          </Button>
        )}
        
        {/* Macros Quick Access */}
        <MacrosQuickAccess />
        
        <button
          type="button"
          onClick={handleImageClick}
          disabled={isUploading}
          className="text-casino-text hover:text-casino-gold p-2 rounded-full"
        >
          <Image size={20} />
        </button>
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 bg-casino-dark text-casino-text px-3 py-2 rounded-md focus:outline-none"
        />
        
        <button
          type="submit"
          disabled={message.trim() === '' || isUploading}
          className={`p-2 rounded-full ${
            message.trim() === '' || isUploading
              ? 'text-gray-500'
              : 'text-casino-gold hover:bg-casino-secondary'
          }`}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};
