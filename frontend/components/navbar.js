import React from "react";
import styled from "./button.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
const NavBar = () => {
  const toggleCart = () => {
    if (ref.current.classList.contains("hidden")) {
      //The real solution is there instead of using translate-x-full i use hidden property to just avoid any kind of overflow in x axis
      ref.current.classList.remove("hidden");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("hidden")) {
      ref.current.classList.add("hidden");
    }
  };

  const ref = useRef();
  return (
    <>
      <header>
        <div className="m-auto flex flex-wrap flex-col md:flex-row  ">
<<<<<<< HEAD
            <div className=" cursor-pointer ml-6 w-48">
              <Link href={'/'}><Image
                src="/logo.png"
                alt="Picture of the author"
                width={250}
=======
            <div className=" cursor-pointer ">
              <Link href={'/'}><Image
              className="relative ml-6"
                src="/logo.png"
                alt="Picture of the author"
                width={280}
>>>>>>> 2cdfc3b136f8739df7f3771c37adcc8b1c8ddaaa
                height={150}
                
              /></Link>
            </div>
          
          <div
            onClick={toggleCart}
<<<<<<< HEAD
            className="cursor-pointer cart absolute right-0 top-10 mr-10 "
=======
            className="cursor-pointer cart absolute right-0 top-11 mr-10 "
>>>>>>> 2cdfc3b136f8739df7f3771c37adcc8b1c8ddaaa
          >
            <MenuIcon fontSize="large" />
          </div>
          <div
            ref={ref}
            className="sidebar md:w-[400px] sm:w-[400px] w-[400px]  h-full absolute top-0 right-0 bg-[#000]  px-2 py-10 transform transition-transform duration-600 ease-in-out hidden z-10" // Initially set hidden
          >
            <span
              onClick={toggleCart}
              className="absolute top-2 right-8 cursor-pointer  "
            >
              <CloseIcon fontSize="large" className="text-white" />
            </span>
            <h2 className="font-bold text-3xl text-center text-white ml-15 ">
              Blog Menu
            </h2>

            <div>
              <Link href={"/blogs"}>
                <div className="sm:ml-[110px]  md:ml-[100px] ml-28">
                  <button className={`${styled.btn12} ${styled.custombtn}`}>
                    <span>Read Blogs</span>
                  </button>
                </div>
              </Link>
              <div className="sm:ml-[110px] md:ml-[100px]  ml-28">
                <button className={`${styled.btn12} ${styled.custombtn}`}>
                  <span>Catergory</span>
                </button>
              </div>
              <Link href={"/Tournament"}>
                <div className="sm:ml-[110px] md:ml-[100px]  ml-28">
                  <button className={`${styled.btn12} ${styled.custombtn}`}>
                    <span>Tournament</span>
                  </button>
                </div>
              </Link>
              <Link href={"/about"}>
                <div className="sm:ml-[110px] md:ml-[100px]  ml-28">
                  <button className={`${styled.btn12} ${styled.custombtn}`}>
                    <span>About</span>
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default NavBar;
