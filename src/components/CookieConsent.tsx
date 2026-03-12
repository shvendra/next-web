"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const CookieConsent: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const consent = Cookies.get("cookie_consent");

    if (!consent) {
      const timer = setTimeout(() => {
        setShow(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = (): void => {
    Cookies.set("cookie_consent", "accepted", { expires: 365 });
    setShow(false);
  };

  const handleDecline = (): void => {
    Cookies.set("cookie_consent", "declined", { expires: 365 });
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[9999] mx-auto w-full max-w-3xl">
      <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/95">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">
              <span className="font-semibold text-slate-900 dark:text-white">
                Our website uses cookies
              </span>{" "}
              to improve your browsing experience, analyze traffic, and provide
              better services. You can accept or decline cookie usage below.
            </p>
          </div>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={handleDecline}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Decline
            </button>

            <button
              type="button"
              onClick={handleAccept}
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;