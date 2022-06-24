import { FC } from "react";
import { Layout, Menu, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../routes";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

const Navbar: FC = () => {
  const router = useNavigate();
  const { isAuth } = useTypedSelector((state) => state.auth);
  const { name } = useTypedSelector((state) => state.auth);
  const { logout } = useActions();

  const publickNav = [{ label: "Логин", path: RoutesNames.LOGIN }];
  const privateNav = [{ label: "Выйти", path: () => logout() }];

  return (
    <Layout.Header>
      <Row justify="end">
        {isAuth ? (
          <>
            <div style={{ color: "white" }}>{name}</div>
            <Menu
              theme="dark"
              mode="horizontal"
              selectable={false}
              items={privateNav.map((item) => ({
                key: item.label,
                label: item.label,
                onClick: item.path,
              }))}
            ></Menu>
          </>
        ) : (
          <>
            <Menu
              theme="dark"
              mode="horizontal"
              selectable={false}
              items={publickNav.map((item) => ({
                key: item.label,
                label: item.label,
                onClick: () => {
                  router(item.path);
                },
              }))}
            />
          </>
        )}
      </Row>
    </Layout.Header>
  );
};

export default Navbar;
