
import React, { useState, useRef } from 'react';
import { Send, Image } from 'lucide-react';
import { MacrosQuickAccess } from './MacrosQuickAccess';

interface ChatInputProps {
  sendMessage: (content: string) => void;
  uploadImage?: (file: File) => Promise<string>;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  sendMessage,
  uploadImage
}) => {
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
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

  return (
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
  );
};
