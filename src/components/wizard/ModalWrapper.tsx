
interface ModalWrapperProps {
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

export default function ModalWrapper({ children, onClose, className = "" }: ModalWrapperProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Modal backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        style={{ zIndex: 9998 }}
      />
      
      {/* Modal content */}
      <div 
        className={`relative bg-white rounded-t-xl sm:rounded-xl shadow-2xl w-full h-full sm:h-auto sm:max-h-[90vh] max-w-full mx-auto overflow-hidden ${className}`}
        style={{ zIndex: 9999 }}
      >
        {children}
      </div>
    </div>
  );
}
