import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { User } from "../types/user";


const NavBar = () => {
    
    const [user, setUser] = useState<User>();
    useEffect(() => {
      setUser(JSON.parse(window.sessionStorage.getItem("user") || "null"));
    }, []);

    const logout = () => {
        sessionStorage.removeItem("jwt");
        sessionStorage.removeItem("user");
        window.location.reload();
      };

    return (
        <header className="py-4 border-t-4 border-orange-500 bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="flex items-center">
            <svg
              role="img"
              className="w-8 h-8 fill-orange-500"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Nextjs Strapi Messages</title>
              <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zM4.911 7.089h11.456a2.197 2.197 0 0 1 2.165 2.19v5.863a2.213 2.213 0 0 1-2.177 2.178H8.04c-1.174 0-2.04-.99-2.04-2.178v-4.639L4.503 7.905c-.31-.42-.05-.816.408-.816zm3.415 2.19c-.347 0-.68.21-.68.544 0 .334.333.544.68.544h7.905c.346 0 .68-.21.68-.544 0-.334-.334-.545-.68-.545zm0 2.177c-.347 0-.68.21-.68.544 0 .334.333.544.68.544h7.905c.346 0 .68-.21.68-.544 0-.334-.334-.544-.68-.544zm-.013 2.19c-.346 0-.68.21-.68.544 0 .334.334.544.68.544h5.728c.347 0 .68-.21.68-.544 0-.334-.333-.545-.68-.545z" />
            </svg>
            <span className="font-semibold font-mono text-2xl ml-2">
              NSM 微博
            </span>
          </h1>
          {user ? (
            <span className="font-semibold">
              <span> {user.username}</span>
              <span
                className="text-gray-500 ml-3 cursor-pointer"
                onClick={logout}
              >
                退出
              </span>
            </span>
          ) : (
            <div className="space-x-3">
              <LoginModal />
              <RegisterModal />
            </div>
          )}
        </div>
      </header>
    )
}

export default NavBar;