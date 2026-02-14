import { useEffect, useState } from "react";
import { updateTodoApi, deleteTodoApi } from "../../apis/todo";
import { toast } from "react-toastify";

const EditTodo = ({ todo, open, onClose, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setIsCompleted(todo.isCompleted);
    }
  }, [todo]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const [, error] = await updateTodoApi(todo._id, {
      title,
      isCompleted,
    });

    setLoading(false);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Todo updated successfully");
    onSuccess();
    onClose();
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this todo?")) return;

    const [, error] = await deleteTodoApi(todo._id);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Todo deleted successfully");
    onSuccess();
    onClose();
  };

  return (
    <div
      className={`fixed top-0 left-0 z-40 h-screen w-full max-w-xs p-4 bg-white dark:bg-gray-800 transition-transform ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <h5 className="mb-6 text-sm font-semibold text-gray-500 uppercase">
        Update Todo
      </h5>

      <button
        onClick={onClose}
        className="absolute top-2.5 right-2.5 p-1.5 text-gray-400 hover:bg-gray-200 rounded"
      >
        ✕
      </button>

      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-2 text-sm font-medium">Todo Title</label>
          <input
            type="text"
            className="w-full p-2.5 border rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Completed Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => setIsCompleted((prev) => !prev)}
          />
          <span className="text-sm text-shadow-white">Completed</span>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Update
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="w-full border border-red-600 text-red-600 py-2 rounded hover:bg-red-600 hover:text-white"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTodo;
