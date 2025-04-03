
import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { MessageSquarePlus } from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';

export const MacrosQuickAccess: React.FC = () => {
  const { state, sendMessage } = useChat();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter macros based on search query
  const filteredMacros = state.macros.filter(macro => 
    macro.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    macro.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Focus search input when sheet opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSendMacro = (content: string) => {
    sendMessage(content, 'operator');
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-casino-text hover:text-casino-gold hover:bg-transparent"
          title="Mensajes rápidos"
        >
          <MessageSquarePlus size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="bottom" 
        className="bg-casino-dark border-t border-casino-secondary text-casino-text h-64 pt-4"
      >
        <SheetHeader className="mb-2">
          <SheetTitle className="text-casino-gold text-left">Mensajes Rápidos</SheetTitle>
        </SheetHeader>
        
        <div className="mb-4">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Buscar mensajes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 bg-casino-secondary border border-casino-secondary rounded-md focus:outline-none focus:ring-1 focus:ring-casino-gold"
          />
        </div>
        
        <div className="overflow-y-auto max-h-[calc(100%-80px)] space-y-2 pr-2">
          {filteredMacros.length === 0 ? (
            <div className="text-center text-gray-400 py-2">
              {searchQuery 
                ? 'No se encontraron mensajes con esa búsqueda' 
                : 'No hay mensajes automáticos disponibles'}
            </div>
          ) : (
            filteredMacros.map(macro => (
              <button
                key={macro.id}
                onClick={() => handleSendMacro(macro.content)}
                className="block w-full text-left p-3 bg-casino-secondary hover:bg-opacity-70 rounded-md border border-casino-secondary transition-colors"
              >
                <h4 className="font-medium text-casino-gold mb-1">{macro.title}</h4>
                <p className="text-sm text-casino-text line-clamp-2">{macro.content}</p>
              </button>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
