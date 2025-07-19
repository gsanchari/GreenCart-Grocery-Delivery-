import { toast } from 'react-hot-toast';
import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const SellerLayout = () => {
  const { axios, navigate } = useAppContext();

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const logout = async () => {
  try {
    const { data } = await axios.post('/api/seller/logout', {}, { withCredentials: true });

    if (data.success) {
      toast.success(data.message);
      navigate('/');
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

  return (
    <>
      <div className="seller-header">
        <Link to="/">
          <img src={assets.logo} alt="logo" className="logo" />
        </Link>
        <div className="seller-info">
          <p>Hi! Admin</p>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </div>

      <div className="seller-layout">
        <div className="sidebar">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <img src={item.icon} alt="" className="sidebar-icon" />
              <p className="sidebar-text">{item.name}</p>
            </NavLink>
          ))}
        </div>

        <Outlet />
      </div>

      <style>{`
        .seller-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 1.5rem;
          border-bottom: 1px solid #d1d5db;
          background-color: white;
        }

        .logo {
          width: 8rem;
          cursor: pointer;
        }

        .seller-info {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: #6b7280;
        }

        .logout-btn {
          border: 1px solid #ccc;
          border-radius: 9999px;
          font-size: 0.8rem;
          padding: 0.25rem 0.75rem;
          background: none;
          cursor: pointer;
        }

        .seller-layout {
          display: flex;
        }

        .sidebar {
          width: 3.25rem;
          border-right: 1px solid #d1d5db;
          height: 95vh;
          font-size: 0.95rem;
          padding-top: 0.8rem;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
        }

        @media (min-width: 768px) {
          .sidebar {
            width: 13rem; /* reduced from 16rem */
          }
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          padding: 0.6rem 1rem;
          gap: 0.6rem;
          border-right: 4px solid white;
          color: #444;
          text-decoration: none;
          font-size: 0.95rem;
        }

        .sidebar-link:hover {
          background-color: rgba(243, 244, 246, 0.9);
        }

        .sidebar-link.active {
          background-color: #c6f2e0;  /* lighter than #4fbf8b */
          border-color: #4fbf8b;
          color: #4fbf8b;
        }

        .sidebar-icon {
          width: 1.6rem;
          height: 1.6rem;
        }

        .sidebar-text {
          display: none;
        }

        @media (min-width: 768px) {
          .sidebar-text {
            display: block;
          }
        }
      `}</style>
    </>
  );
};

export default SellerLayout;
