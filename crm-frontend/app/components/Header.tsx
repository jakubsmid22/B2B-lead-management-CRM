import { useNavigate } from "react-router";

const Header = () => {

  const navigate = useNavigate();
  
  const logOut = async () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-surface border-borders border-b p-5 flex w-full justify-center">
      <div className="flex items-center justify-between max-w-250 w-full">
        <h1 className="text-2xl font-bold">B2B CRM</h1>
        <button
          onClick={() => logOut()}
          className="border-borders cursor-pointer border px-4 py-2"
        >
          ODHLÁSIT
        </button>
      </div>
    </header>
  );
};

export default Header;
