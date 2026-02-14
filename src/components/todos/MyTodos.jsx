import { Checkbox, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Pagination, Button, Modal, ModalBody, ModalHeader,TextInput,
  Label } from "flowbite-react";
import { useState, useEffect } from "react";
import "flowbite";
import NavBar from "../layout/NavBar.jsx";
import FooterComp from "../layout/FooterComp.jsx";
import HeroSection2 from "../../pages/landing/HeroSection2.jsx";
import { getTodosApi, updateTodoApi, deleteTodoApi } from "../../apis/todo.js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { HiOutlineExclamationCircle } from "react-icons/hi";


const MyTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    id: null,
    title: "",
    isCompleted: false,
  });

  const refreshTodos = useSelector(
    (state) => state.modal.refreshTodos
  );

  useEffect(() => {
   
    const token = localStorage.getItem('token'); 
    if (!token) {
      setError('Please log in to view your todos');
      setLoading(false);
      return;
    }
    fetchTodos();
  }, [currentPage, refreshTodos]);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const [data, error] = await getTodosApi(limit, currentPage);

      if (error) {
        
        if (error.includes('Unauthorized') || error.includes('401')) {
          setError('Your session has expired. Please log in again.');
          // Optionally redirect to login
          // window.location.href = '/login';
        } else {
          setError(error);
        }
        setTodos([]);
      } else {
        
        console.log('API Response:', data);

       
        let todosArray = [];
        if (Array.isArray(data)) {
          todosArray = data;
        } else if (data?.todos && Array.isArray(data.todos)) {
          todosArray = data.todos;
          
          if (data.total) {
            setTotalPages(Math.ceil(data.total / limit));
          }
        } else if (data?.data && Array.isArray(data.data)) {
          todosArray = data.data;
          if (data.total) {
            setTotalPages(Math.ceil(data.total / limit));
          }
        }

        setTodos(todosArray);
        setError(null);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      setTodos([]);
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const onPageChange = (page) => setCurrentPage(page);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };


  const handleCheckboxChange = async (todo) => {
    const newStatus = !todo.isCompleted;

    setTodos((prev) =>
      prev.map((t) =>
        t._id === todo._id ? { ...t, isCompleted: newStatus } : t
      )
    );

    
    const [, error] = await updateTodoApi(todo._id, {
      isCompleted: newStatus,
    });

    
    if (error) {
      toast.error(error);

      setTodos((prev) =>
        prev.map((t) =>
          t._id === todo._id ? { ...t, isCompleted: !newStatus } : t
        )
      );
    }
  };


  const handleDelete = async (todoId) => {
    

    const [data, error] = await deleteTodoApi(todoId);

    if (error) {
      toast.error(error);
      return;
    }

    toast.error("Todo deleted successfully");
    fetchTodos(); 
  };

  const handleEditSubmit = async () => {
    if (!editForm.title.trim()) {
      toast.error("Title cannot be empty");
      return;
    }

    const [, error] = await updateTodoApi(editForm.id, {
      title: editForm.title,
      isCompleted: editForm.isCompleted,
    });

    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Todo updated");
    setOpenEditModal(false);
    fetchTodos();
  };



  return (
    <div className="relative">
      
      <div
        className={`transition-all duration-100 ${openModal ? "blur-sm border-2 border-red-500 bg-red-100/30 pointer-events-none" : ""
          }`}
      >
        <div className="overflow-x-auto dark:bg-gray-900 rounded-none">
          <Table hoverable>
            <TableHead>
              <TableRow>
                <TableHeadCell>Title</TableHeadCell>
                <TableHeadCell>Created</TableHeadCell>
                <TableHeadCell>Updated</TableHeadCell>
                <TableHeadCell>Status</TableHeadCell>
                <TableHeadCell>Edit</TableHeadCell>
                <TableHeadCell>Delete</TableHeadCell>
              </TableRow>
            </TableHead>

            <TableBody className="divide-y">
              {loading && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    Loading todos...
                  </TableCell>
                </TableRow>
              )}

              {!loading && error && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-red-600">
                    {error}
                  </TableCell>
                </TableRow>
              )}

              {!loading && !error && todos.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    No todos found
                  </TableCell>
                </TableRow>
              )}

              {!loading &&
                !error &&
                todos.map((todo) => (
                  <TableRow key={todo._id}>
                    <TableCell>{todo.title}</TableCell>
                    <TableCell>{formatDate(todo.createdAt)}</TableCell>
                    <TableCell>{formatDate(todo.updatedAt)}</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={todo.isCompleted}
                        onChange={() => handleCheckboxChange(todo)}
                      />
                    </TableCell>
                    <TableCell>
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => {
                          setEditForm({
                            id: todo._id,
                            title: todo.title,
                            isCompleted: todo.isCompleted,
                          });
                          setOpenEditModal(true);
                        }}
                      >
                        Edit
                      </button>
                    </TableCell>
                    <TableCell>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => {
                          setSelectedTodoId(todo._id);
                          setOpenModal(true);
                        }}
                      >
                        🗑
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <div className="flex overflow-x-auto sm:justify-center md:justify-center xl:justify-center justify-center dark:bg-gray-800 mr-2">
            <Pagination currentPage={currentPage} totalPages={10} onPageChange={onPageChange} showIcons />
          </div>
        </div>

        <HeroSection2 />
        <FooterComp />
      </div>


                <Modal
        show={openEditModal}
        size="md"
        popup
        onClose={() => setOpenEditModal(false)}
      >
        <ModalHeader />
        <ModalBody>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Edit Todo</h3>

            <div>
              <Label value="Title" />
              <TextInput
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                checked={editForm.isCompleted}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    isCompleted: e.target.checked,
                  })
                }
              />
              <span className="text-white">Completed</span>
            </div>

            <div className="flex justify-end gap-3">
              <Button color="gray" onClick={() => setOpenEditModal(false)}>
                Cancel
              </Button>
              <Button color="blue" onClick={handleEditSubmit}>
                Save Changes
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => {
          setOpenModal(false);
          setSelectedTodoId(null);
        }}
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />/
            <h3 className="mb-5 text-lg text-gray-500">
              Are you sure you want to delete this todo?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="red"
                onClick={async () => {
                  await handleDelete(selectedTodoId);
                  setOpenModal(false);
                  setSelectedTodoId(null);
                }}
              >
                Yes, I'm sure
              </Button>
              <Button
                color="alternative"
                onClick={() => {
                  setOpenModal(false);
                  setSelectedTodoId(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default MyTodos;