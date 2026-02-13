import Logo from "../../assets/Logo3.png"
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle, Avatar } from "flowbite-react";
import { useDispatch } from "react-redux";
import { openCreateTodo, openLogin } from "../../store/slices/modalSlice.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getMeApi } from "../../apis/user.api.js";



const NavBar = () => {
  // const userName = "pratik"
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
const [loadingUser, setLoadingUser] = useState(true);
  const ref = useRef(null);
  const Authenticated = !!localStorage.getItem("token");

  const scrollToContact = () => {
    document
      .getElementById("contact")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    document
      .getElementById("services")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleCreateClick = () => {
    dispatch(openCreateTodo());
  };

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);


  useEffect(() => {
  if (!Authenticated) return;

  const fetchMe = async () => {
    const [data, error] = await getMeApi();

    if (error) {
      console.error("Failed to load user:", error);
      setLoadingUser(false);
      return;
    }

    setUser(data);
    setLoadingUser(false);
  };

  fetchMe();
}, [Authenticated]);

  return (
    <Navbar>
      {/* Brand */}
      <NavbarBrand href="/" onClick={Logout}>
        <img src={Logo} className="mr-3 h-12 w-auto" alt="FocusFlow Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          FocusFlow
        </span>
      </NavbarBrand>

      {/* Center Links */}
      <NavbarCollapse>
        {!Authenticated ? (
          <>
            {/* BEFORE LOGIN */}
            <NavbarLink href="/" >
              Home
            </NavbarLink>

            <NavbarLink as="button" onClick={scrollToServices}>
              Services
            </NavbarLink>

            <NavbarLink as="button" onClick={scrollToContact}>
              Contact
            </NavbarLink>
          </>
        ) : (
          <>
            {/* AFTER LOGIN */}
            <NavbarLink 
            href="/mytodos" 
            active >
              Home
            </NavbarLink>

            <NavbarLink href="#todo-table-container">
              My Todos
            </NavbarLink>

            <NavbarLink as="button" onClick={handleCreateClick}>
              Create Todo
            </NavbarLink>
          </>
        )}
      </NavbarCollapse>

      {/* Right Side Actions */}
      <div className="flex md:order-5 gap-4 items-center">
        {!Authenticated ? (
          <Button onClick={() => dispatch(openLogin())}>
            Login
          </Button>
        ) : (
          <div className="flex items-center gap-4">
            
              <div className="space-y-1 font-medium dark:text-white">
                <div>Welcome! To FocusFlow {user?.fullName}</div>
              </div>
                <Avatar img={`https://api.dicebear.com/9.x/initials/svg?seed=${user?.fullName}`} rounded></Avatar>
          
            <Button color="red" outline onClick={Logout}>
              Logout
            </Button>
          </div>
        )}
        <NavbarToggle className="md:hidden" />
      </div>
    </Navbar>
  );
}


export default NavBar;