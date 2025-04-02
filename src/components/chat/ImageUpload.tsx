
import React, { useState, useRef } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Image, X, Upload, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  onClose: () => void;
}

export const ImageUpload = ({ onClose }: ImageUploadProps) => {
  const { uploadImage, sendMessage, state } = useChat();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { currentUser } = state;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

      setSelectedFile(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    try {
      const imageUrl = await uploadImage(selectedFile);
      sendMessage(
        imageUrl, 
        currentUser?.role === 'operator' ? 'operator' : 'client', 
        true
      );
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo cargar la imagen. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const selectImage = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col h-full">
      <Card className="flex flex-col h-full border-0 rounded-none bg-casino-dark">
        <CardHeader className="bg-casino-primary border-b border-casino-secondary">
          <div className="flex items-center justify-between">
            <CardTitle className="text-casino-gold text-lg font-medium">Enviar Imagen</CardTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-casino-secondary"
            >
              <X size={18} />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex items-center justify-center p-6">
          {preview ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <img 
                src={preview} 
                alt="Preview" 
                className="max-w-full max-h-[300px] object-contain rounded-lg" 
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
                onClick={() => {
                  setSelectedFile(null);
                  setPreview(null);
                }}
              >
                <X size={18} />
              </Button>
            </div>
          ) : (
            <div 
              className="w-full h-[250px] border-2 border-dashed border-casino-secondary rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-casino-gold transition-colors"
              onClick={selectImage}
            >
              <Image size={48} className="text-gray-400 mb-3" />
              <p className="text-gray-400 mb-1">Haz clic para seleccionar una imagen</p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 5MB</p>
            </div>
          )}
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </CardContent>
        
        <CardFooter className="border-t border-casino-secondary p-4 bg-casino-primary">
          <div className="flex w-full space-x-2 justify-end">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-casino-secondary text-casino-text hover:bg-casino-secondary"
            >
              Cancelar
            </Button>
            
            {preview && (
              <Button
                onClick={selectImage}
                variant="outline"
                className="border-casino-secondary text-casino-text hover:bg-casino-secondary"
              >
                Cambiar Imagen
              </Button>
            )}
            
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              className="gold-gradient text-casino-primary hover:brightness-110"
            >
              {isUploading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Enviando...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Enviar
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
