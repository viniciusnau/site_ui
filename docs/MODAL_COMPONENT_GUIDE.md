# Documentação - Componente Modal

## 📋 Visão Geral

O **Modal** é um componente React reutilizável para exibição de conteúdo sobreposto, com detecção automática de tema e customização completa de estilos.

### ✨ **Principais Recursos:**
- 🎭 **Overlay customizável** é o fundo meio transparente escuro e com opção de desabilitar
- 🎨 **Detecção automática de tema** (claro/escuro) fazendo o X do fechar ter contraste com o fundo 
- ❌ **Botão de fechar** integrado com ícone adaptativo
- 🖱️ **Fechamento por clique** no overlay, clicando fora do modal fecha
- 🎯 **Prevenção de propagação** no conteúdo do modal
- 🎨 **Customização completa** de estilos via CSS modules passa o style dentro da 
```tsx
<Table customStyles={style}> 
```
sendo esse style um 
```tsx
import styles from algumLugarAi 
```
pode ser o mesmo style do arquivo o qual tu importou esse componente, ou um css separado só pra esse modal ou mesmo dentro do codigo tsx onde importou o modal
Por padrão ele não tem fundo padrao, tem que passar alguma coisa 
- 📱 **Responsivo** por padrão

---

## 📥 Instalação e Importação

### **Dependências:**
```bash
npm install lucide-react
```

### **Importação:**
```tsx
import Modal from '../../../Components/Modal/Modal';
```

---

## ⚙️ Props e Configurações

### **Interface Principal:**

```typescript
interface ModalProps {
  isOpen: boolean;                          // Controla visibilidade do modal
  onClose: () => void;                      // Handler para fechar modal
  withBackground?: boolean;                 // Exibe overlay (padrão: true)
  title?: string;                           // Título opcional do modal, o que fica a esquerda do X
  children: React.ReactNode;                // Conteúdo do modal, essa é a div que tu vai colocar dentro do modal e vai ficar embaixo do X
  customStyles?: { [key: string]: string }; // Estilos CSS customizados
}
```

### **Detalhes das Props:**

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `isOpen` | `boolean` | - | **Obrigatório**. Controla se o modal está visível |
| `onClose` | `() => void` | - | **Obrigatório**. Função chamada ao fechar modal |
| `withBackground` | `boolean` | `true` | Exibe overlay escuro atrás do modal |
| `title` | `string` | `undefined` | Título exibido no cabeçalho do modal |
| `children` | `ReactNode` | - | **Obrigatório**. Conteúdo interno do modal |
| `customStyles` | `object` | `{}` | Classes CSS personalizadas para override |

---

## 🚀 Exemplos de Uso

### **Exemplo 1: Modal Básico**

```tsx
function BasicModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Abrir Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal Básico"
      >
        <p>Este é o conteúdo do modal básico.</p>
        <button onClick={() => setIsOpen(false)}>
          Fechar
        </button>
      </Modal>
    </>
  );
}
```

### **Exemplo 2: Modal sem Background**

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  withBackground={false}
  title="Modal sem Overlay"
>
  <div>
    <p>Modal sem fundo escuro</p>
    <p>Útil para tooltips ou dropdowns</p>
  </div>
</Modal>
```

### **Exemplo 3: Modal de Confirmação**

```tsx
function ConfirmationModal() {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = () => {
    // Lógica de confirmação
    console.log('Confirmado!');
    setShowConfirm(false);
  };

  return (
    <Modal
      isOpen={showConfirm}
      onClose={() => setShowConfirm(false)}
      title="Confirmar Ação"
    >
      <div className="confirmation-content">
        <p>Tem certeza que deseja continuar?</p>
        <div className="buttons">
          <button onClick={() => setShowConfirm(false)}>
            Cancelar
          </button>
          <button onClick={handleConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </Modal>
  );
}
```

### **Exemplo 4: Modal com Formulário**

```tsx
function FormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Processar dados
    console.log('Dados:', formData);
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Adicionar Usuário"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              name: e.target.value
            }))}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              email: e.target.value
            }))}
            required
          />
        </div>
        
        <div className="form-buttons">
          <button type="button" onClick={() => setIsOpen(false)}>
            Cancelar
          </button>
          <button type="submit">
            Salvar
          </button>
        </div>
      </form>
    </Modal>
  );
}
```

### **Exemplo 5: Customização Avançada**

```tsx
const customStyles = {
  overlay: 'custom-overlay',
  modal: 'custom-modal',
  header: 'custom-header',
  title: 'custom-title',
  content: 'custom-content',
  closeButton: 'custom-close'
};

<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Modal Customizado"
  customStyles={customStyles}
>
  <div className="custom-modal-content">
    <h3>Conteúdo Personalizado</h3>
    <p>Este modal usa estilos customizados.</p>
  </div>
</Modal>
```

---

## 🎛️ Funcionalidades Detalhadas

### **1. Detecção Automática de Tema**
- Analisa a cor de fundo do `document.body`
- Calcula o brilho usando fórmula de luminância
- Ajusta automaticamente a cor do ícone de fechar
- Suporte para temas dinâmicos

```tsx
// Lógica interna de detecção
const background = window.getComputedStyle(document.body).backgroundColor;
const rgb = background.match(/\d+/g)?.map(Number) || [255, 255, 255];
const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
const isDark = brightness < 128;
```

### **2. Sistema de Fechamento**
- **Clique no overlay**: Fecha o modal
- **Botão X**: Botão dedicado para fechar
- **Prevenção de propagação**: Cliques no conteúdo não fecham o modal
- **Callback customizável**: `onClose` permite lógica personalizada

### **3. Estrutura Flexível**
- **Cabeçalho opcional**: Título e botão de fechar
- **Conteúdo livre**: Aceita qualquer ReactNode
- **Overlay opcional**: Pode ser desabilitado para casos específicos

---

## 🎨 Customização

### **Classes CSS Disponíveis:**

```typescript
interface CustomStyles {
  overlay?: string;        // Fundo escuro atrás do modal
  modal?: string;          // Container principal do modal
  header?: string;         // Cabeçalho com título e botão fechar
  title?: string;          // Título do modal
  content?: string;        // Área de conteúdo
  closeButton?: string;    // Container do botão fechar
  closeIcon?: string;      // Container do ícone X
  invertIcon?: string;     // Classe para inversão de cor do ícone
}
```

### **Exemplo de CSS Customizado:**

```css
/* custom-modal.css */
.custom-overlay {
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
}

.custom-modal {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  width: 90%;
  color: white;
}

.custom-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 24px;
}

.custom-title {
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
}

.custom-content {
  padding: 24px;
  max-height: 70vh;
  overflow-y: auto;
}

.custom-close {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 8px;
  transition: all 0.2s;
}

.custom-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}
```

### **Uso com Styled Components:**

```tsx
import styled from 'styled-components';

const StyledModal = styled(Modal)`
  .modal {
    background: ${props => props.theme.modalBackground};
    border: 2px solid ${props => props.theme.borderColor};
  }
  
  .title {
    color: ${props => props.theme.textColor};
  }
`;
```

---

## 🔧 Padrões de Uso

### **1. Hook Personalizado para Modal**

```tsx
function useModal(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const toggleModal = useCallback(() => setIsOpen(prev => !prev), []);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal
  };
}

// Uso
function MyComponent() {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <button onClick={openModal}>Abrir</button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <p>Conteúdo</p>
      </Modal>
    </>
  );
}
```

### **2. Modal com Estado Persistente**

```tsx
function PersistentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);

  const openWithData = (newData: any) => {
    setData(newData);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    // Manter dados para próxima abertura
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      {data && (
        <div>
          <h3>{data.title}</h3>
          <p>{data.description}</p>
        </div>
      )}
    </Modal>
  );
}
```

### **3. Modal com Validação de Fechamento**

```tsx
function ValidatedModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleClose = () => {
    if (hasUnsavedChanges) {
      const confirmClose = window.confirm(
        'Você tem alterações não salvas. Deseja continuar?'
      );
      if (!confirmClose) return;
    }
    setIsOpen(false);
    setHasUnsavedChanges(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <form onChange={() => setHasUnsavedChanges(true)}>
        {/* Campos do formulário */}
      </form>
    </Modal>
  );
}
```

---

## 📊 Casos de Uso Comuns

### **1. Modal de Confirmação**
```tsx
<Modal isOpen={showDelete} onClose={() => setShowDelete(false)}>
  <div className="delete-confirmation">
    <h3>⚠️ Confirmar Exclusão</h3>
    <p>Esta ação não pode ser desfeita.</p>
    <div className="actions">
      <button onClick={() => setShowDelete(false)}>Cancelar</button>
      <button onClick={handleDelete}>Excluir</button>
    </div>
  </div>
</Modal>
```

### **2. Modal de Visualização**
```tsx
<Modal isOpen={showDetails} onClose={() => setShowDetails(false)} title="Detalhes do Item">
  <div className="item-details">
    <img src={item.image} alt={item.name} />
    <h4>{item.name}</h4>
    <p>{item.description}</p>
    <div className="metadata">
      <span>Criado em: {item.createdAt}</span>
      <span>Status: {item.status}</span>
    </div>
  </div>
</Modal>
```

### **3. Modal de Formulário**
```tsx
<Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Novo Registro">
  <form onSubmit={handleSubmit}>
    <div className="form-fields">
      <input placeholder="Nome" required />
      <textarea placeholder="Descrição" />
      <select>
        <option>Selecione uma categoria</option>
      </select>
    </div>
    <div className="form-actions">
      <button type="button" onClick={() => setShowForm(false)}>
        Cancelar
      </button>
      <button type="submit">Salvar</button>
    </div>
  </form>
</Modal>
```

### **4. Modal de Loading**
```tsx
<Modal 
  isOpen={isLoading} 
  onClose={() => {}} // Não permite fechar durante loading
  withBackground={true}
>
  <div className="loading-modal">
    <div className="spinner" />
    <p>Processando...</p>
  </div>
</Modal>
```

---

## 🛠️ Dicas e Melhores Práticas

### ✅ **Recomendações:**
- **Always provide onClose**: Mesmo que seja uma função vazia
- **Use títulos descritivos**: Facilita a navegação e acessibilidade
- **Implemente keyboard navigation**: ESC para fechar (pode ser adicionado)
- **Considere focus management**: Auto-focus no primeiro elemento
- **Teste a responsividade**: Especialmente em dispositivos móveis

### ⚡ **Performance:**
```tsx
// Lazy loading do conteúdo
const LazyModalContent = lazy(() => import('./ModalContent'));

<Modal isOpen={isOpen} onClose={handleClose}>
  <Suspense fallback={<div>Carregando...</div>}>
    <LazyModalContent />
  </Suspense>
</Modal>

// Memoização para evitar re-renders desnecessários
const MemoizedModal = memo(Modal);
```

### 🔒 **Acessibilidade:**
```tsx
// Adicionar aria-labels e roles
<Modal 
  isOpen={isOpen} 
  onClose={handleClose}
  title="Configurações"
  aria-labelledby="modal-title"
  role="dialog"
  aria-modal="true"
>
  <div id="modal-title">Configurações do Sistema</div>
  {/* Conteúdo */}
</Modal>
```

### 📱 **Responsividade:**
```css
.modal {
  width: min(90vw, 500px);
  max-height: 90vh;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .modal {
    width: 95vw;
    margin: 20px auto;
  }
}
```

---

## 📋 Checklist de Implementação

- [ ] Importar Modal e dependências
- [ ] Definir estado de controle (isOpen)
- [ ] Implementar handler de fechamento
- [ ] Adicionar título se necessário
- [ ] Estruturar conteúdo interno
- [ ] Configurar estilos customizados
- [ ] Testar fechamento por overlay
- [ ] Verificar responsividade
- [ ] Implementar validação de fechamento (se necessário)
- [ ] Testar detecção de tema
- [ ] Adicionar loading states (se aplicável)
- [ ] Implementar navegação por teclado (opcional)

---

## 🔗 Integração com Contextos

### **Modal Provider (Opcional):**

```tsx
const ModalContext = createContext<{
  openModal: (content: ReactNode, options?: ModalProps) => void;
  closeModal: () => void;
}>({
  openModal: () => {},
  closeModal: () => {}
});

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalProps, setModalProps] = useState<ModalProps | null>(null);

  const openModal = (content: ReactNode, options: Partial<ModalProps> = {}) => {
    setModalProps({
      isOpen: true,
      onClose: closeModal,
      children: content,
      ...options
    });
  };

  const closeModal = () => {
    setModalProps(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalProps && <Modal {...modalProps} />}
    </ModalContext.Provider>
  );
}

// Hook para usar o contexto
export const useModal = () => useContext(ModalContext);
```

### **Uso do Provider:**

```tsx
function MyComponent() {
  const { openModal } = useModal();

  const handleShowConfirm = () => {
    openModal(
      <div>
        <p>Confirmar ação?</p>
        <button onClick={() => console.log('Confirmado')}>
          Sim
        </button>
      </div>,
      { title: 'Confirmação' }
    );
  };

  return <button onClick={handleShowConfirm}>Abrir Modal</button>;
}
```

---
