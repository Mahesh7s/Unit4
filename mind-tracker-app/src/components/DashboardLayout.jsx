import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = ({ title, children }) => {
  const { logout, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-700">{title}</h1>
        <div className="flex gap-4 items-center text-sm">
          <span className="text-gray-600 capitalize">{role}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <main className="p-6 max-w-6xl mx-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout;
