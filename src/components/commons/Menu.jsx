// src/components/commons/Menu.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/commons/Menu.css";

const navItems = [
  { label: "Home", path: "/home" },
  { label: "Favorites", path: "/favorites" },
  { label: "Contact", path: "/contact" },
];

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(prev => !prev);

  const handleNavigate = (path) => {
    setIsOpen(false);
    setTimeout(() => navigate(path), 300);
  };

  return (
    <div className="menu-content">
      <div
        className={`menu-icon ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="overlay-menu"
            initial={{ opacity: 0, y: "-10%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-10%" }}
            transition={{ duration: 0.4 }}
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.li
                    key={item.path}
                    className={isActive ? "active" : ""}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNavigate(item.path)}
                  >
                    {item.label}
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;
