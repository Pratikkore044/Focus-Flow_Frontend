import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import { getTodosApi } from './apis/todo';
import HeroSection from './pages/landing/HeroSection';
import HeroSection2 from './pages/landing/HeroSection2';
import FooterComp from './components/layout/FooterComp';
import ContactUs from './pages/landing/ContactUs';
import ErrorMessage from './components/common/ErrorMessage';
import NavBar from './components/layout/NavBar';
import Feature from './pages/landing/Feature';
import LoginModal from './pages/auth/LogInPage';
import SignUpModal from './pages/auth/SignUpPage';
// main.jsx or App.jsx
import "flowbite";
import CreateTodo from './components/todos/CreateTodos';
import MyTodos from './components/todos/MyTodos';
import LoginPage from './pages/auth/LogInPage.jsx'
import SignUpPage from './pages/auth/SignUpPage.jsx';


const useGetTodos = () => {

  const [data, setData] = useState([]);
  const [todoApiStatus, setTodoApiStatus] = useState({
    loading: true,
    error: ''
  });

  const getTodos = async () => {
    const [todos, error] = await getTodosApi();
    setData(Array.isArray(todos?.data) ? todos.data : []);
    setTodoApiStatus({
      error,
      loading: false,
    });
  }


  useEffect(() => {
    getTodos();
  }, [])

  return { data, ...todoApiStatus };

}

function App() {

  return (
    <div className='flex flex-col w-screen h-screen overflow-y-auto'>
      <NavBar />


      {/* Global Modals */}
      <LoginModal />
      <SignUpModal />
      <CreateTodo />


      <Routes>
        {/* Landing */}
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <Feature />
              <HeroSection2 />
              <ContactUs />
              <FooterComp />
            </>
          }
        />

        {/* Todos */}
        <Route path="/mytodos" element={<MyTodos />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user" element={<SignUpPage />} />

        {/* 404 */}
        <Route path="*" element={<ErrorMessage />} />
    </Routes>
    </div>
  );
}

const TodoList = () => {
  const { data: todos, loading, error } = useGetTodos();

  const [filters, setFilters] = useState({
    filterType: 'all',
    search: '',
  });

  const filteredTodos = todos.filter((todo) => {
    let shouldShow = true;

    if (filters.filterType !== 'all') {
      if (filters.filterType === 'completed') {
        shouldShow = todo.isCompleted;
      } else if (filters.filterType === 'incomplete') {
        shouldShow = !todo.isCompleted
      }
    }

    if (filters.search) {
  shouldShow =
    shouldShow &&
    todo.title.toLowerCase().includes(filters.search.toLowerCase());
}

    return shouldShow;
  })

  if (loading) {
    return <h1>Fetching todos...</h1>
  }

  if (error) {
    return <h1>{error}</h1>
  }

  return <div className='flex flex-col p-2 gap-4'>
    <div className='flex gap-4 flex-wrap'>
      <input className='border-2 px-1 max-w-sm rounded-md border-slate-300 focus-visible:outline-none focus-visible:border-blue-500'
        type="search"
        placeholder='🔎 Search todos'
        value={filters.search}
        onChange={(e) => setFilters(prev => ({
          ...prev,
          search: e.target.value
        }))}
      />
      <div className='inline-flex'>
        <button className={`bg-blue-500 text-white first:rounded-l-md px-4 text-xs
          ${filters.filterType === 'all' ? 'bg-blue-400' : ''}
          `}
          onClick={() => {
            setFilters(prev => ({
              ...prev,
              filterType: "all"
            }))
          }}

        >all</button>
        <button className={`bg-blue-500 text-white  px-4 text-xs
                  ${filters.filterType === 'incomplete' ? 'bg-blue-400' : ''}
        `}
          onClick={() => {
            setFilters(prev => ({
              ...prev,
              filterType: "incomplete"
            }))
          }}
        >Incomplete</button>
        <button className={`bg-blue-500 text-white last:rounded-r-md  px-4 text-xs
                  ${filters.filterType === 'completed' ? 'bg-blue-400' : ''}
        `}
          onClick={() => {
            setFilters(prev => ({
              ...prev,
              filterType: "completed"
            }))
          }}
        >
          Complete
        </button>
      </div>
    </div>
    <div className='flex gap-4 flex-wrap'>
      {filteredTodos.map((todo) =>
        <Todo
          key={todo._id}
          todo={todo.title}
          completed={todo.isCompleted}
          createdAt={todo.createdAt}
        />
      )}
      <div className='hidden only:flex w-screen text-center justify-center items-center h-[40dvh] '>
        no todos found.
      </div>
    </div>
  </div>
}



const Todo = ({ todo, description, completed, createdAt }) => {

  return <div className="max-w-max p-6 bg-white border border-gray-200 rounded-lg shadow ">

    <a href="#">
      <h5 className="mb-2 text-lg font-semibold tracking-tight text-gray-900 ">
        {todo}
      </h5>
    </a>
    <p className="mb-3 font-normal text-gray-500 text-sm">
      {description}
    </p>
    <a href="#" className="inline-flex font-medium items-center text-blue-600 hover:underline">
      {new Date(createdAt).toDateString()}

    </a>
  </div>
}


export default App