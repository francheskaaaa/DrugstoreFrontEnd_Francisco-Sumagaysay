import React from "react";

const DeleteConfirmation = ({ isOpen, onClose, onConfirm, id }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-center text-xl font-semibold mb-4">Confirm Deletion</h2>
                <p className="text-center text-gray-700">
                    Are you sure you want to delete inventory with ID: <strong>{id}</strong>?
                </p>
                <div className="flex justify-between mt-6">
                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        onClick={() => onConfirm(id)}
                    >
                        Yes
                    </button>
                    <button
                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                        onClick={onClose}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmation;