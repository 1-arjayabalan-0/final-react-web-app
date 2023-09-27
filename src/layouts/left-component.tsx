import { useEffect } from "react";
import { PanelMenu, Tooltip } from "../assets/css/prime-library";
import { Link } from "react-router-dom";
const loadChildMenus = () => {
  let mainMenu: any = JSON.parse(sessionStorage["data_usermoduleList"]);
  let menuData = {
    usermoduleList: JSON.parse(sessionStorage["data_usermoduleList"]),
    userscreenmapList: JSON.parse(sessionStorage["data_userscreenmapList"]),
  };
  console.log(mainMenu);
  if (mainMenu.length > 0) {
    mainMenu.forEach((menu) => {
      let menulist: any = menuData.userscreenmapList.filter(
        (f) => f.parentid == menu.parentid
      );

      menu.childMenu = [];
      let childMenu = [];
      menulist.forEach((menu) => {
        let menuitem: any = {
          label: menu.childscreenname,
          url: menu.childscreenurl,
          tooltip: menu.childscreenname,
        };
        let childMenus = menuData.userscreenmapList.filter(
          (f) => f.parentid == menu.childscreenid
        );
        if (childMenus.length) menuitem.items = [];
        childMenus.forEach((child) => {
          let childitem: any = {
            label: child.childscreenname,
            url: child.childscreenurl,
            tooltip: child.childscreenname,
          };
          menuitem.items.push(childitem);
        });
        childMenu.push(menuitem);
      });
      menu.childMenu = childMenu;
    });
  }
  return mainMenu;
};
const LeftComponent = () => {
  let menuDashboard = [{ label: "Dashboard", url: "vDashboard" }];
  let menuMaster = [{ label: "State", url: "vState" }];
  let menuEntry = [{ label: "Visitor Management", url: "vVisitorManagement" }];
  var mainMenu: any = loadChildMenus();
  console.log(mainMenu);

  // let mainMenu = [
  //   {
  //     id: 1,
  //     relLink: "dashboard",
  //     menuTitle: "MIS and Dashboard",
  //     menuIcon: "las la-chart-bar",
  //   },
  //   {
  //     id: 2,
  //     relLink: "masters",
  //     menuTitle: "Masters",
  //     menuIcon: "las la-tools",
  //   },
  //   {
  //     id: 3,
  //     relLink: "gateentry",
  //     menuTitle: "Gate Entry",
  //     menuIcon: "las la-id-card",
  //   },
  // ];

  // useEffect(() => {
  //   mainMenu = loadChildMenus();
  //   console.log(mainMenu);
  // }, [mainMenu]);

  return (
    <div>
      <div className="apps-left bg-shadow">
        <div className="sidebar overflow-y">
          <div className="menu-tabs" rel="main-menu">
            <Tooltip target=".menu-tabs a" />
            {mainMenu.map((menuLink) => (
              <>
                <a
                  key={menuLink.parentid}
                  href="javascript:void(0);"
                  rel={menuLink.rel_link}
                  data-pr-tooltip={menuLink.parentscreenname}
                  data-pr-position="right"
                >
                  <i className={menuLink.menu_icon}></i>
                </a>
              </>
            ))}
          </div>
        </div>
      </div>
      <div className="apps-center bg-shadow">
        <div className="main-menu scroll-y">
          {/* <div *ngFor="let menu of mainMenu" [class]="'menu-tabs-container ' + menu.RelLink">
      <h5>{{menu.Parentscreenname}}</h5>
      <div class="left-menu">
        <p-panelMenu [model]="menu.childMenu" [multiple]="false"></p-panelMenu>
      </div>
    </div> */}

          {mainMenu.map((menuLink) => (
            <>
              <div className={`menu-tabs-container ${menuLink.rel_link}`}>
                <h5>{menuLink.parentscreenname}</h5>
                <PanelMenu className="left-menu" model={menuLink.childMenu} />
              </div>
            </>
            // <Link
            //   key={menuLink.parentid}
            //   to={"/vState"}
            //   data-pr-tooltip={menuLink.parentscreenname}
            //   data-pr-position="right"
            // >
            //   <i className={menuLink.menu_icon}></i>
            // </Link>
          ))}

          {/* <div className="menu-tabs-container dashboard">
            <h5>Dashboard</h5>
            <PanelMenu className="left-menu" model={menuDashboard} />
          </div>
          <div className="menu-tabs-container masters">
            <h5>Masters</h5>
            <PanelMenu className="left-menu" model={menuMaster} />
          </div>
          <div className="menu-tabs-container gateentry">
            <h5>Visitor Entry</h5>
            <PanelMenu className="left-menu" model={menuEntry} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LeftComponent;
