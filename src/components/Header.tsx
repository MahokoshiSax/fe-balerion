import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth token from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    localStorage.removeItem("email")
    localStorage.removeItem("name");

    // Redirect to login page
    navigate("/");
  };

  return (
    <header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end h-16 items-center">

          {/* Desktop menu */}
          <div className="hidden md:flex items-center">
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className="ml-4 flex items-center"
            >
              <LogOut className="mr-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
} 