

function DeleteModal({
    isOpen,
    problem,
    loading,
    onClose,
    onConfirm
}) {

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

            <div className="bg-slate-800 rounded-xl p-8 w-[450px]">

                <h2 className="text-2xl font-bold mb-4">
                    Delete Problem
                </h2>

                <p className="text-gray-300 mb-8">

                    Are you sure you want to delete

                    <span className="font-bold text-red-400">
                        {" "}
                        {problem.title}
                    </span>

                    ?

                </p>

                <div className="flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={loading}
                        onClick={onConfirm}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteModal;