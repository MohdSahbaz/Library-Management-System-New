import React from "react";

const DeleteLibrarianModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  setMessage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-2">
      <div className="bg-gray-900 text-white rounded-sm shadow-lg p-6 w-80">
        <h2 className="text-lg font-semibold text-gray-200 mb-4">
          Confirm Deletion
        </h2>
        <p className="text-gray-400 text-sm mb-2">
          Are you sure you want to delete this librarian? This action cannot be
          undone.
        </p>
        <p className="text-red-400 text-sm font-semibold">
          Warning: Deleting this librarian will permanently remove their access
          and associated data. This action is irreversible.
        </p>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={() => {
              onClose();
              setMessage(null);
            }}
            className="px-4 py-2 text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-sm"
          >
            Delete
          </button>
        </div>
        <p className="text-red-600 font-bold">{message}</p>
      </div>
    </div>
  );
};

export default DeleteLibrarianModal;
