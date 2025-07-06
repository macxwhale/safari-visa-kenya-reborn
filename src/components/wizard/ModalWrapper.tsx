
interface ModalWrapperProps {
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

export default function ModalWrapper({ children, onClose, className = "" }: ModalWrapperProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Modal backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300" 
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div 
        className={`relative bg-background rounded-t-2xl sm:rounded-2xl shadow-2xl w-full h-full sm:h-auto sm:max-h-[95vh] max-w-full mx-auto overflow-hidden transform transition-all duration-300 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
