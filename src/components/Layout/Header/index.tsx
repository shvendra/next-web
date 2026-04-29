"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { headerData } from "../Header/Navigation/menuData";
import Logo from "./Logo";
import Image from "next/image";
import HeaderLink from "../Header/Navigation/HeaderLink";
import MobileHeaderLink from "../Header/Navigation/MobileHeaderLink";
import Signin from "@/components/Auth/SignIn";
import SignUp from "@/components/Auth/SignUp";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react/dist/iconify.js";
import DonationFormContext from "@/app/context/donationContext";
import { Donation } from "@/components/Home/Hero/Donation";
import { SuccessfullLogin } from "@/components/Auth/AuthDialog/SuccessfulLogin";
import AuthDialogContext from "@/app/context/AuthDialogContext";
import { FailedLogin } from "@/components/Auth/AuthDialog/FailedLogin";
import { UserRegistered } from "@/components/Auth/AuthDialog/UserRegistered";

const Header: React.FC = () => {
  const pathUrl = usePathname();
  const { theme, setTheme } = useTheme();

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const navbarRef = useRef<HTMLDivElement>(null);
  const signInRef = useRef<HTMLDivElement>(null);
  const signUpRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
const closeMenu = () => setNavbarOpen(false);
  const handleScroll = () => {
    setSticky(window.scrollY >= 80);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      signInRef.current &&
      !signInRef.current.contains(event.target as Node)
    ) {
      setIsSignInOpen(false);
    }
    if (
      signUpRef.current &&
      !signUpRef.current.contains(event.target as Node)
    ) {
      setIsSignUpOpen(false);
    }
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      navbarOpen
    ) {
      setNavbarOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarOpen, isSignInOpen, isSignUpOpen]);

  useEffect(() => {
    if (isSignInOpen || isSignUpOpen || navbarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isSignInOpen, isSignUpOpen, navbarOpen]);

  const info = useContext(DonationFormContext);

  useEffect(() => {}, []);

  const donationInfo = useContext(DonationFormContext);
  const authDialog = useContext(AuthDialogContext);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all ${sticky ? "shadow-lg dark:shadow-darkmd bg-white dark:bg-dark" : "shadow-none"}`}
    >
      <div className="sm:bg-linear-to-r bg-linear-to-l md:from-primary md:to-secondary lg:py-0 py-2 bg-white dark:bg-dark">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) flex items-center justify-between px-4">
          <div className="lg:hidden block">
            <Logo />
          </div>
          <nav className="hidden lg:flex grow items-center justify-start">
            {headerData.map((item, index) => (
              <HeaderLink key={index} item={item} />
            ))}
          </nav>
          <div className="flex items-center space-x-4 relative top-[1px]">
            <button
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-8 w-8 items-center justify-center text-body-color duration-300 dark:text-white"
            >
              <svg
                viewBox="0 0 16 16"
                className={`hidden h-6 w-6 dark:block ${!sticky && pathUrl === "/" && "text-white"}`}
              >
                <path
                  d="M4.50663 3.2267L3.30663 2.03337L2.36663 2.97337L3.55996 4.1667L4.50663 3.2267ZM2.66663 7.00003H0.666626V8.33337H2.66663V7.00003ZM8.66663 0.366699H7.33329V2.33337H8.66663V0.366699V0.366699ZM13.6333 2.97337L12.6933 2.03337L11.5 3.2267L12.44 4.1667L13.6333 2.97337ZM11.4933 12.1067L12.6866 13.3067L13.6266 12.3667L12.4266 11.1734L11.4933 12.1067ZM13.3333 7.00003V8.33337H15.3333V7.00003H13.3333ZM7.99996 3.6667C5.79329 3.6667 3.99996 5.46003 3.99996 7.6667C3.99996 9.87337 5.79329 11.6667 7.99996 11.6667C10.2066 11.6667 12 9.87337 12 7.6667C12 5.46003 10.2066 3.6667 7.99996 3.6667ZM7.33329 14.9667H8.66663V13H7.33329V14.9667ZM2.36663 12.36L3.30663 13.3L4.49996 12.1L3.55996 11.16L2.36663 12.36Z"
                  fill="#FFFFFF"
                />
              </svg>
              <svg
                viewBox="0 0 23 23"
                className={`h-8 w-8 text-dark dark:hidden ${!sticky && pathUrl === "/" && "text-white"}`}
              >
                <path d="M16.6111 15.855C17.591 15.1394 18.3151 14.1979 18.7723 13.1623C16.4824 13.4065 14.1342 12.4631 12.6795 10.4711C11.2248 8.47905 11.0409 5.95516 11.9705 3.84818C10.8449 3.9685 9.72768 4.37162 8.74781 5.08719C5.7759 7.25747 5.12529 11.4308 7.29558 14.4028C9.46586 17.3747 13.6392 18.0253 16.6111 15.855Z" />
              </svg>
            </button>
            <Link
              href="https://www.bookmyworkers.com/app/login"
              target="_blank"
              className="hidden lg:block bg-error text-sm hover:bg-error/90 text-white px-4 py-3.5 leading-none rounded-lg font-medium text-nowrap"
              // onClick={() => {
              //   setIsSignInOpen(true);
              // }}
            >
              Sign In
            </Link>
            {isSignInOpen && (
              <div
                ref={signInRef}
                className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50 m-0!"
              >
                <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-lg bg-white px-8 py-14 text-center dark:bg-dark">
                  <button
                    onClick={() => setIsSignInOpen(false)}
                    className=" hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded-full absolute -top-5 -right-3 mr-8 mt-8"
                    aria-label="Close Sign In Modal"
                  >
                    <Icon
                      icon="ic:round-close"
                      className="text-2xl dark:text-white"
                    />
                  </button>
                  <Signin
                    signInOpen={(value: boolean) => setIsSignInOpen(value)}
                  />
                </div>
              </div>
            )}
            <Link
              href="https://www.bookmyworkers.com/app/register"
              target="_blank"
              className="hidden lg:block text-sm bg-dark hover:bg-dark/90 text-white px-4 py-3.5 leading-none rounded-lg font-medium text-nowrap"
              // onClick={() => {
              //   setIsSignUpOpen(true);
              // }}
            >
              Sign Up
            </Link>
            {isSignUpOpen && (
              <div
                ref={signUpRef}
                className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50 m-0!"
              >
                <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-lg bg-white px-8 py-14 text-center dark:bg-dark">
                  <button
                    onClick={() => setIsSignUpOpen(false)}
                    className=" hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded-full absolute -top-5 -right-3 mr-8 mt-8"
                    aria-label="Close Sign In Modal"
                  >
                    <Icon
                      icon="ic:round-close"
                      className="text-2xl dark:text-white"
                    />
                  </button>
                  <SignUp
                    signUpOpen={(value: boolean) => setIsSignUpOpen(value)}
                  />
                </div>
              </div>
            )}
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="block lg:hidden p-2 rounded-lg"
              aria-label="Toggle mobile menu"
            >
              <span className="block w-6 h-0.5 bg-black dark:bg-white"></span>
              <span className="block w-6 h-0.5 bg-black dark:bg-white mt-1.5"></span>
              <span className="block w-6 h-0.5 bg-black dark:bg-white mt-1.5"></span>
            </button>
          </div>
        </div>
   {navbarOpen && (
  <div
    onClick={closeMenu}
    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
  />
)}

<div
  ref={mobileMenuRef}
  className={`lg:hidden fixed top-0 right-0 h-screen w-full max-w-sm
    bg-white dark:bg-slate-900
    shadow-2xl border-l border-slate-200 dark:border-slate-800
    transform transition-all duration-300 ease-in-out z-50
    ${navbarOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
  `}
>
  {/* Header */}
  <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
    <div>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
        Menu
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Explore BookMyWorkers
      </p>
    </div>

    <button
      onClick={closeMenu}
      aria-label="Close mobile menu"
      className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="text-slate-700 dark:text-white"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>

  {/* Nav */}
  <nav className="flex flex-col px-6 py-6 space-y-2 overflow-y-auto">
    {headerData.map((item, index) => (
      <div
        key={index}
        className="w-full rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
      >
        <MobileHeaderLink item={item} closeMenu={closeMenu} />
      </div>
    ))}
  </nav>

  {/* Footer CTA */}
  <div className="absolute bottom-0 left-0 w-full p-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
    <div className="flex flex-col gap-3">
      <Link
        href="https://www.bookmyworkers.com/app/login"
        target="_blank"
        onClick={closeMenu}
        className="w-full text-center py-3 rounded-xl border border-slate-300 dark:border-slate-700
        text-slate-800 dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition"
      >
        Sign In
      </Link>

      <Link
        href="https://www.bookmyworkers.com/app/register"
        target="_blank"
        onClick={closeMenu}
        className="w-full text-center py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700
        text-white font-semibold shadow-lg transition"
      >
        Sign Up
      </Link>
    </div>
  </div>
</div>
      </div>
      <div className="dark:bg-dark">
        <div className="px-4 container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) sm:flex lg:justify-between justify-center py-5 hidden">
          <div className="lg:block hidden">
            <Logo />
          </div>
          <div className="flex items-center">
            <div className="flex gap-3 py-2 pr-6 border-r dark:border-dark_border">
  <Image
    src="/images/icons/icon-mail.svg"
    alt="icon"
    width={32}
    height={32}
  />

  <div>
    <p className="text-sm font-normal text-muted dark:text-white/60 mb-0">
      Email us at
    </p>

    <Link
      href="mailto:business@bookmyworkers.com"
      className="block text-base font-semibold hover:text-primary"
    >
      business@bookmyworkers.com
    </Link>

    
  </div>
</div>

<div className="flex gap-3 py-2 pl-6">
  <Image
    src="/images/icons/icon-phone.svg"
    alt="icon"
    width={32}
    height={32}
  />

  <div>
    <p className="text-sm font-normal text-muted dark:text-white/60 mb-0">
      Call us now
    </p>


    <Link
      href="tel:+917089788929"
      className="block text-base font-semibold hover:text-primary"
    >
      +917089788929
    </Link>
  </div>
</div>
            <button
              onClick={() => info?.setIsDonationOpen(true)}
              className="text-error text-sm font-semibold border border-error py-4 px-7 rounded-md ml-8 hover:bg-error hover:text-white"
            >
              Make an Enquiry
            </button>
          </div>
        </div>
      </div>
      {/* Donation Popup */}
      {donationInfo?.isDonationOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50 m-0!">
          <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-lg bg-white px-8 py-14 text-center dark:bg-dark">
            <button
              onClick={() => donationInfo?.setIsDonationOpen(false)}
              className=" hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded-full absolute -top-5 -right-3 mr-8 mt-8"
              aria-label="Close Sign In Modal"
            >
              <Icon
                icon="ic:round-close"
                className="text-2xl dark:text-white"
              />
            </button>
            <Donation />
          </div>
        </div>
      )}
      {/* Successsful Login Alert */}
      <div
        className={`fixed top-6 end-1/2 translate-x-1/2 z-50 ${authDialog?.isSuccessDialogOpen == true ? "block" : "hidden"}`}
      >
        <SuccessfullLogin />
      </div>
      {/* Failed Login Alert */}
      <div
        className={`fixed top-6 end-1/2 translate-x-1/2 z-50 ${authDialog?.isFailedDialogOpen == true ? "block" : "hidden"}`}
      >
        <FailedLogin />
      </div>
      {/* User registration Alert */}
      <div
        className={`fixed top-6 end-1/2 translate-x-1/2 z-50 ${authDialog?.isUserRegistered == true ? "block" : "hidden"}`}
      >
        <UserRegistered />
      </div>
    </header>
  );
};

export default Header;
 