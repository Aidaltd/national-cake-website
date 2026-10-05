"use client";

import React, { createContext, useContext, useState } from "react";

interface AdminMobileNavContextType {
  isOpen: boolean;
  openNav: () => void;
  closeNav: () => void;
  toggleNav: () => void;
}

const AdminMobileNavContext = createContext<AdminMobileNavContextType>({
  isOpen: false,
  openNav: () => {},
  closeNav: () => {},
  toggleNav: () => {},
});

export function AdminMobileNavProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const openNav = () => setIsOpen(true);
  const closeNav = () => setIsOpen(false);
  const toggleNav = () => setIsOpen((prev) => !prev);

  return (
    <AdminMobileNavContext.Provider
      value={{ isOpen, openNav, closeNav, toggleNav }}
    >
      {children}
    </AdminMobileNavContext.Provider>
  );
}

export function useAdminMobileNav() {
  return useContext(AdminMobileNavContext);
}
