
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  title?: string;
}

const Header = ({ title = "Style Mingle" }: HeaderProps) => {
  const navigate = useNavigate();
  const { isAuthenticated, userType, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="w-full py-4 px-6 backdrop-blur-sm bg-background/80 border-b border-border fixed top-0 z-50 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <h1 
          className="font-medium tracking-tight text-xl cursor-pointer"
          onClick={() => navigate("/")}
        >
          {title}
        </h1>
      </div>
      
      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <>
            <span className="text-sm text-muted-foreground hidden md:inline-block">
              {userType === 'sales_associate' ? 'Sales Assistant' : 'Customer App'}
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="ml-2"
            >
              Logout
            </Button>
          </>
        ) : (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/auth")}
          >
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
