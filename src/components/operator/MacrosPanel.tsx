
import React, { useState } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Macro } from '@/types/chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Trash, Edit, Plus, Copy, Send } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';

interface MacroFormProps {
  macro?: Macro;
  onSubmit: (title: string, content: string) => void;
  onCancel: () => void;
}

const MacroForm: React.FC<MacroFormProps> = ({ macro, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(macro?.title || '');
  const [content, setContent] = useState(macro?.content || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit(title, content);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Título
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej: Saludo de bienvenida"
          required
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-1">
          Contenido
        </label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escribe el mensaje que se enviará..."
          rows={5}
          required
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-casino-gold text-casino-primary">
          {macro ? 'Actualizar' : 'Crear'}
        </Button>
      </div>
    </form>
  );
};

export const MacrosPanel: React.FC = () => {
  const { state, addMacro, editMacro, deleteMacro, sendMessage } = useChat();
  const [editingMacro, setEditingMacro] = useState<Macro | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMacros = state.macros.filter(macro => 
    macro.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    macro.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (title: string, content: string) => {
    if (editingMacro) {
      editMacro(editingMacro.id, title, content);
    } else {
      addMacro(title, content);
    }
    setShowForm(false);
    setEditingMacro(null);
  };

  const handleDelete = (id: string) => {
    deleteMacro(id);
  };

  const handleEdit = (macro: Macro) => {
    setEditingMacro(macro);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingMacro(null);
  };

  const handleCopyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const handleSendMacro = (content: string) => {
    sendMessage(content, 'operator');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-casino-secondary">
        <h2 className="text-xl font-bold text-casino-gold mb-4">Mensajes Automáticos</h2>
        
        <div className="flex space-x-2 mb-4">
          <Input
            placeholder="Buscar mensajes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          
          <Dialog open={showForm} onOpenChange={setShowForm}>
            <DialogTrigger asChild>
              <Button 
                className="bg-casino-gold text-casino-primary" 
                onClick={() => {
                  setEditingMacro(null);
                  setShowForm(true);
                }}
              >
                <Plus size={18} className="mr-1" /> Nuevo
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-casino-dark border border-casino-secondary text-casino-text">
              <DialogHeader>
                <DialogTitle className="text-casino-gold">{editingMacro ? 'Editar Mensaje' : 'Crear Nuevo Mensaje'}</DialogTitle>
                <DialogDescription>
                  {editingMacro 
                    ? 'Actualiza los detalles del mensaje automático' 
                    : 'Crea un nuevo mensaje para usar en tus conversaciones'}
                </DialogDescription>
              </DialogHeader>
              <MacroForm 
                macro={editingMacro || undefined} 
                onSubmit={handleSubmit} 
                onCancel={handleCancel} 
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredMacros.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            {searchQuery 
              ? 'No se encontraron mensajes con esa búsqueda' 
              : 'No hay mensajes automáticos. Crea tu primer mensaje'}
          </div>
        ) : (
          filteredMacros.map(macro => (
            <div 
              key={macro.id} 
              className="bg-casino-secondary rounded-lg p-3 hover:bg-opacity-70 transition-colors border border-casino-secondary"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-casino-gold">{macro.title}</h3>
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-casino-text hover:text-casino-gold"
                    onClick={() => handleSendMacro(macro.content)}
                    title="Enviar mensaje"
                  >
                    <Send size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-casino-text hover:text-casino-gold"
                    onClick={() => handleCopyToClipboard(macro.content)}
                    title="Copiar al portapapeles"
                  >
                    <Copy size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-casino-text hover:text-casino-gold"
                    onClick={() => handleEdit(macro)}
                    title="Editar mensaje"
                  >
                    <Edit size={16} />
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-casino-text hover:text-casino-accent"
                        title="Eliminar mensaje"
                      >
                        <Trash size={16} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-casino-dark border border-casino-secondary text-casino-text">
                      <DialogHeader>
                        <DialogTitle className="text-casino-accent">Confirmar eliminación</DialogTitle>
                        <DialogDescription>
                          ¿Estás seguro que deseas eliminar el mensaje "{macro.title}"?
                          Esta acción no se puede deshacer.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button 
                          variant="destructive" 
                          onClick={() => handleDelete(macro.id)}
                        >
                          Eliminar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <p className="text-sm whitespace-pre-line">{macro.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
