import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [activeItem, setActiveItem] = useState('journey');

  const handleItemClick = (e, {name}) => {
      setActiveItem(name);
  };

  return (
    <Menu size='mini'>
      <Menu.Item>
        <img alt="logo" src="https://semantic-ui.com/images/logo.png" />
      </Menu.Item>
      <Menu.Item
        name="journey"
        as={Link}
        to="/"
        active={activeItem === "journey"}
        onClick={handleItemClick}
      />
      <Menu.Item
        name="live"
        as={Link}
        to="/live"
        active={activeItem === "live"}
        onClick={handleItemClick}
      />
      <Menu.Item
        name="detail"
        as={Link}
        to="/detail"
        active={activeItem === "detail"}
        onClick={handleItemClick}
      />
    </Menu>
  );
};

export default Header;
