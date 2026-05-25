import { useContext, useState } from "react";
import AuthContext from "../Firebase/AuthContext";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { user, setUser } = useContext(AuthContext);

  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });

      setUser({
        ...user,
        displayName: name,
        photoURL: photo,
      });

      Swal.fire("Success", "Profile updated instantly", "success");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="w-10/12 mx-auto mt-10 border p-6 rounded-xl shadow">
      <div>
        <img
          src={photo || user?.photoURL}
          className="w-24 h-24 rounded-full mb-4"
        />

        <p>
          <b>Name:</b> {user?.displayName}
        </p>
        <p>
          <b>Email:</b> {user?.email}
        </p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-3 mt-5">
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full"
        />
        <label>Photo URL</label>
        <input
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          className="input input-bordered w-full"
        />

        <button className="btn btn-primary w-full">Update Profile</button>
      </form>
    </div>
  );
};

export default MyProfile;
