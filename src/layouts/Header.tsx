import * as React from "react";
import { Appslogo, Brandlogo, AvatarImg } from "../assets/css/img-library";
import { useRef, InputText, Menu } from "../assets/css/prime-library";
import { MenuItem } from "primereact/menuitem";
import { useDispatch } from "react-redux";
import { logout } from "redux/slices/common/authSlice";
import { useHistory } from "react-router-dom";

const Header = () => {
  const dispatch: any = useDispatch();
  const menuRight: any = useRef<Menu>(null);
  const route = useHistory();

  const items: MenuItem[] = [
    {
      label: "Logout",
      icon: "pi pi-power-off",
      command: () => {
        dispatch(logout({}));
        route.push("/Login");
      },
    },
  ];

  return (
    <div>
      <header className="web-view header">
        <div className="grid">
          <div className="col-12 md:col-6 lg:col-6">
            <div className="apps-logo text-center inline-block">
              <img src={Appslogo} alt="logo" />
            </div>
            <div className="hdr-search p10 inline-block align-top">
              <div className="hdr-search-input p015">
                <span className="p-input-icon-left">
                  <i className="pi pi-search" />
                  <InputText placeholder="Search" />
                </span>
              </div>
            </div>
          </div>
          <div className="col-12 md:col-3 lg:col-3">
            <div className="p10">
              <img src={Brandlogo} alt="Visi Easy" />
            </div>
          </div>
          <div className="col-12 md:col-3 lg:col-3 text-right">
            <div className="hdr-login p10 inline-block">
              <a
                onClick={(event) => menuRight.current.toggle(event)}
                aria-controls="popup_menu_right"
                aria-haspopup
              >
                <img
                  src={AvatarImg}
                  alt="avatar"
                  className="vertical-align-middle"
                />
                <span
                  className="white-space-nowrap vertical-align-middle inline-block overflow-hidden text-overflow-ellipsis hdr-login-text"
                  style={{ width: "200px" }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </span>
                <i className="pi pi-angle-down vertical-align-middle"></i>
              </a>
              <Menu
                model={items}
                popup
                ref={menuRight}
                id="popup_menu_right"
                popupAlignment="right"
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
