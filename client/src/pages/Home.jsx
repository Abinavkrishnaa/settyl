import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../store/authSlice';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-400 to-orange-500">
      <nav className="bg-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Employee Management
          </Link>
          <div>
            {user ? (
              <div className="relative group">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                  {user.username}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg hidden group-hover:block">
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <Link
                  to="/login"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-5xl font-bold text-white mb-6">Welcome to Employee Management System</h1>
        <p className="text-lg text-white">Manage your employees efficiently with our system.</p>
        <Link
          to="/dashboard"
          className="bg-purple-500 text-white px-6 py-3 rounded-lg mt-6 inline-block hover:bg-purple-600 transition duration-300"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Home;
