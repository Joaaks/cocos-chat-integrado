
import React, { useState, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SendIcon, Image, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChatInputProps {
  sendMessage: (content: string) => void;
  uploadImage: (file: File) => Promise<string>;
}

export const ChatInput = ({ sendMessage, uploadImage }: ChatInputProps) => {
  const [operatorMessage, setOperatorMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (operatorMessage.trim()) {
      sendMessage(operatorMessage);
      setOperatorMessage('');
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Error",
          description: "Por favor sube sólo archivos de imagen.",
          variant: "destructive",
        });
        return;
      }

      setIsUploading(true);
      try {
        const imageUrl = await uploadImage(file);
        sendMessage(imageUrl);
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo cargar la imagen. Inténtalo de nuevo.",
          variant: "destructive",
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <form onSubmit={handleSendMessage} className="p-3 border-t border-casino-secondary bg-casino-primary">
      <div className="flex flex-col space-y-2">
        <Textarea
          value={operatorMessage}
          onChange={(e) => setOperatorMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 bg-casino-secondary text-casino-text border-casino-secondary resize-none min-h-[60px]"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (operatorMessage.trim()) {
                handleSendMessage(e);
              }
            }
          }}
        />
        
        <div className="flex items-center space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={triggerFileInput}
            className="bg-casino-secondary border-casino-secondary text-casino-text hover:bg-casino-gold hover:text-casino-primary hover:border-casino-gold"
            title="Enviar Imagen"
            disabled={isUploading}
          >
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Image size={18} />
            )}
          </Button>
          
          <div className="flex-1"></div>
          
          <Button
            type="submit"
            disabled={!operatorMessage.trim() || isUploading}
            className="gold-gradient text-casino-primary hover:brightness-110"
          >
            <SendIcon size={18} className="mr-2" />
            Enviar
          </Button>
        </div>
      </div>
    </form>
  );
};
