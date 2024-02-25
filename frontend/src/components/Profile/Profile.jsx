import { useState } from "react";
import "./Profile.css"
const Profile = () => {
    const user = {
        username: 'john_doe',
        email: 'john.doe@example.com',
        profileImage: 'path/to/profile-image.jpg',
        password: 'securepassword',
      };
    
      const [showPassword, setShowPassword] = useState(false);
    
      const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
      };
    
      return (
        <div className="profile-container">
          <div className="profile-avatar">
            <img src={user.profileImage} alt="Profile" className="avatar-image" />
          </div>
          <div className="profile-table">
            <table>
              <tbody>
                <tr>
                  <td>Username:</td>
                  <td>{user.username}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <td>Password:</td>
                  <td>
                    {showPassword ? user.password : '*'.repeat(user.password.length)}
                    <button onClick={togglePasswordVisibility}>
                      {showPassword ? 'Hide Password' : 'Show Password'}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
}

export default Profile
