import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);

  // useState
  const [selectedImg, setSelectedImg] = useState(null);
  const [name, setName] = useState(authUser?.fullName || "");
  const [bio, setBio] = useState(authUser?.bio || "");

  // useNavigate to redirect on another page
  const navigate = useNavigate();

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImg) {
      await updateProfile({
        fullName: name,
        bio
      });
      navigate('/');
      return;
    }

    let base64Image = null;

    base64Image = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImg);
      reader.onload = () => resolve(reader.result);
    });

    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({
        profilePic: base64Image,
        fullName: name,
        bio
      })
      navigate("/");
    }
  }

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2
      border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 flex-1'>
          <h3 className='text-lg'>Profile Details</h3>
          {/* Image Update */}
          <label htmlFor="avtar" className='flex items-center gap-3 cursor-pointer'>
            <input
              type="file"
              onChange={(e) => setSelectedImg(e.target.files[0])}
              id='avtar'
              accept='.png, .jpg, .jpeg'
              hidden
            />
            <img src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon} alt=""
              className={`w-12 h-12 ${selectedImg && 'rounded-full'}`} />
            upload profile image
          </label>

          {/* Name Update */}
          <input
            type="text"
            placeholder='Your Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2
            focus:ring-violet-500'
          />

          {/* Bio Update */}
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder='Update your bio'
            required rows={4}
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500'
          >
          </textarea>

          {/* Save Button */}
          <button type='submit' className='bg-linear-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer'>
            Save
          </button>
        </form>

        <img
          className={`max-w-44 aspect-square rounded-full max-sm:mt-10 mr-6
          ${selectedImg && 'rounded-full'}`} src={authUser?.profilePic || assets.logo_icon} alt=""
        />
      </div>
    </div>
  )
}

export default ProfilePage
