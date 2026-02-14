import { useState } from "react";
import {
  Card,
  Button,
  Label,
  TextInput,
  Textarea,
  Modal,
} from "flowbite-react";
import { createTodoApi } from "../../apis/todo.js";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { closeCreateTodo,triggerTodosRefresh  } from "../../store/slices/modalSlice";
import { useNavigate } from "react-router-dom";

const CreateTodo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = useSelector((state) => {
    console.log("Full state:", state);
    console.log("Modal state:", state.modal);
    console.log("createTodoOpen:", state.modal.createTodoOpen);
    return state.modal.createTodoOpen;
  });

  console.log("Modal open value:", open);

  const [form, setForm] = useState({
    title: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }

    setLoading(true);

    const [data, error] = await createTodoApi({
      title: form.title,
      isCompleted: false,
    });

    setLoading(false);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Todo created successfully");
    dispatch(closeCreateTodo());
    dispatch(triggerTodosRefresh());
    
    setForm({
    title: "",
  });
    // navigate("/todos");
  };

  return (
    <Modal
      show={open}
      size="lg"
      popup
      onClose={() => dispatch(closeCreateTodo())}
    >
        <Card className="w-full rounded-md shadow-none">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Create New Todo
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4">
            {/* Title */}
            <div>
              <Label htmlFor="title" value="Todo Title" />
              <TextInput
                id="title"
                name="title"
                placeholder="e.g. Finish backend integration"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            {/* <div>
              <Label
                htmlFor="description"
                value="Description (optional)"
              />
              <Textarea
                id="description"
                name="description"
                rows={4}
                placeholder="Add some details..."
                value={form.description}
                onChange={handleChange}
              />
            </div> */}

            {/* Actions */}
            <div className="flex justify-end gap-3 m-2 p-4">
              <Button
                color="gray"
                type="button"
                className="p-5"
                onClick={() => dispatch(closeCreateTodo())}
              >
                Cancel
              </Button>

              <Button type="submit" isProcessing={loading}>
                Create Todo
              </Button>
            </div>
          </form>
        </Card>
    </Modal>
  );
};

export default CreateTodo;
