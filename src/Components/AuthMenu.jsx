import React from "react";
import { Menu, Dropdown, Avatar } from "antd";
import { Link } from "react-router-dom";

const AuthMenu = ({ user, onLogout }) => {
  return (
    <Menu mode="horizontal">
      {user ? (
        <Menu.SubMenu
          key="user"
          title={
            <>
              <Avatar style={{ backgroundColor: "#87d068", marginRight: 8 }} />
              {user.fullName}
            </>
          }
        >
          <Menu.Item key="logout" onClick={onLogout}>
            Cerrar Sesión
          </Menu.Item>
        </Menu.SubMenu>
      ) : (
        <>
          <Menu.Item key="login">
            <Link to="/login">Iniciar Sesión</Link>
          </Menu.Item>
          <Menu.Item key="/sing-up">
            <Link to="/sing-up">Registrarse</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

export default AuthMenu;
