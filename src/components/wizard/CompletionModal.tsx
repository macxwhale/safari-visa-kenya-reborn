
import ModalWrapper from "./ModalWrapper";

export default function CompletionModal() {
  return (
    <ModalWrapper className="max-w-md">
      <div className="p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="w-8 h-8 bg-green-500 rounded-full"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Setup Complete!</h2>
        <p className="text-gray-600">Proceeding to application form...</p>
      </div>
    </ModalWrapper>
  );
}
