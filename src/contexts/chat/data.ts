
// Mock operator responses
export const operatorResponses = [
  "¡Hola! ¿En qué puedo ayudarte hoy?",
  "Por supuesto, puedo ayudarte con eso.",
  "¿Puedes proporcionar más detalles sobre lo que necesitas?",
  "Estoy verificando la información que solicitas.",
  "Tu solicitud de usuario ha sido recibida. Vamos a procesarla ahora.",
  "Tu nueva cuenta de usuario ha sido creada exitosamente.",
  "Necesitaré un poco más de información para completar este proceso.",
  "¿Hay algo más en lo que pueda asistirte hoy?",
  "Gracias por tu paciencia mientras atendemos tu solicitud."
];

// Random operator messages for demo
export const getRandomResponse = () => {
  return operatorResponses[Math.floor(Math.random() * operatorResponses.length)];
};

// Initial state
export const initialState = {
  messages: [],
  userRequest: null,
  isOpen: false,
  isMinimized: false,
  isRequestingUser: false,
  clientName: '',
  operatorName: 'Casino Support',
  operatorIsTyping: false,
  selectedUser: 'all',
  currentUser: null,
  clients: [], // Inicializamos la lista de clientes
  pendingClients: [], // Inicializamos la lista de clientes pendientes
};
