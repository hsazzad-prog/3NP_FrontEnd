import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import { useAuth } from '../utils/authcontext';

export default function NavBar() {

  const [jsonData, setJsonData] = useState('')
  const router = useRouter();
  const { user, logout, checkUser } = useAuth();

  useEffect(() => {

    checkSession();

  }, []);

  function checkSession()
  {
    if (user!=null) {
      
      fetchData();
      console.log("user:  "+user.email)
      console.log("user:  "+user.cookie)
    }
    else {
      router.push('/loginform')
    }
  }

  async function fetchData() {

    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/getuser/" + user.email,

      );
      const jsonData = response.data;
      console.log(jsonData)
      setJsonData(jsonData);
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogout = () => {

    logout();
    router.push('/loginform');
  };



  return (
<>
{jsonData &&
    <div className="navbar bg-slate-400">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">3NP</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={process.env.NEXT_PUBLIC_API_ENDPOINT + '/admin/getimage/' + jsonData.filenames} />
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                {user && user.email}
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li> <button onClick={handleLogout}>Logout</button></li>
          </ul>
        </div>
      </div>
    </div>
}
</>
  );
}