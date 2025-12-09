export const DeleteDialoge = ({ onClose, onCofirm }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl space-y-4 w-80">
        <h2 className="text-lg font-semibold">Are you sure ?</h2>

        <div className="flex justify-center space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onCofirm}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
