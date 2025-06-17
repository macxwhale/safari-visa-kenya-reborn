
interface ModalWrapperProps {
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

export default function ModalWrapper({ children, onClose, className = "" }: ModalWrapperProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Modal backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        style={{ zIndex: 9998 }}
      />
      
      {/* Modal content */}
      <div 
        className={`relative bg-white rounded-xl shadow-2xl w-full mx-auto overflow-hidden ${className}`}
        style={{ zIndex: 9999, maxHeight: '90vh' }}
      >
        {children}
      </div>
    </div>
  );
}
