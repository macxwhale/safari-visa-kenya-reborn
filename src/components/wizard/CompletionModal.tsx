
export default function CompletionModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="relative z-50 bg-white rounded-xl shadow-xl max-w-md w-full mx-auto p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="w-8 h-8 bg-green-500 rounded-full"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Setup Complete!</h2>
        <p className="text-gray-600">Proceeding to application form...</p>
      </div>
    </div>
  );
}
