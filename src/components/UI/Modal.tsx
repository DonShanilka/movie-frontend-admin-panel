"use client";

export default function Modal({ open, onClose, children }: any) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-80 backdrop-blur-sm">
      <div className="bg-gray-900 text-white p-6 rounded-lg w-full max-w-2xl shadow-xl relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 bg-red-500 hover:bg-red-600 text-white p-1 px-3 rounded-md"
        >
          X
        </button>

        {children}  {/* MovieForm goes here */}
      </div>
    </div>
  );
}
