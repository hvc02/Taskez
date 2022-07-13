import React, { useContext } from "react";
import { UserContext } from "../../context/user.context";
import AvatarOne from "../../assets/images/avatars/avatar-one.svg";
import AvatarTwo from "../../assets/images/avatars/avatar-two.svg";
import AvatarThree from "../../assets/images/avatars/avatar-three.svg";
import AvatarFour from "../../assets/images/avatars/avatar-four.svg";
import AvatarFive from "../../assets/images/avatars/avatar-five.svg";
import { ReactComponent as SearchIcon } from "../../assets/images/search.svg";
import { ReactComponent as ProfileIcon } from "../../assets/images/profile.svg";

const avatars = [
  { src: AvatarOne },
  { src: AvatarTwo },
  { src: AvatarThree },
  { src: AvatarFour },
  { src: AvatarFive },
];
const Navbar = () => {
  const {
    user: { name },
  } = useContext(UserContext);
  return (
    <div className="navbar">
      <div className="navbar__search">
        <SearchIcon />
        <p>Search</p>
      </div>

      <div className="navbar__avatars">
        {avatars.map(({ src }, index) => (
          <img key={index} src={src} alt="avatar" />
        ))}
      </div>
      <div className="navbar__profile">
        <p className="navbar__username">{name}</p>
        <ProfileIcon className="navbar__profile-img" />
      </div>
    </div>
  );
};

export default Navbar;
