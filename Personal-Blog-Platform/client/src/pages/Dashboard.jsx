import { useAuth } from "../context/AuthContext";

function Dashboard() {

  const { user } = useAuth();

  return (

    <div>

      <h2>Dashboard</h2>

      <hr />

      <div className="card p-4">

        <h4>Welcome</h4>

        <h5>{user?.name}</h5>

        <p>{user?.email}</p>

      </div>

    </div>

  );
}

export default Dashboard;