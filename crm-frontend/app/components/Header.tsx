import { Link, useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();

  const logOut = async () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-surface border-borders flex w-full justify-center border-b p-5">
      <div className="flex w-full max-w-250 items-center justify-between">
        <Link to="/">
          <h1 className="text-2xl font-bold">B2B CRM</h1>
        </Link>
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
