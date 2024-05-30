import { MenuItem } from "../MenuItem";
import { Container } from "./style";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

type SideBarProps = {
  toggleSideBar: () => void;
};

export function SideBar({ toggleSideBar }: SideBarProps) {
  const { signOut } = useAuth();

  function logoutApp() {
    const resp = confirm("Deseja sair da aplicação?");
    if (resp) {
      signOut();
    }
  }

  return (
    <Container>
      <i className="material-icons closeIcon" onClick={toggleSideBar}>
        close
      </i>

      <nav>
        <ul>
          <NavLink to={"/"}>
            <MenuItem title="Home" icon="home" />
          </NavLink>

          <NavLink to={"/tasks"}>
            <MenuItem title="Tarefas" icon="task" />
          </NavLink>

          <NavLink to={"/create-task"}>
            <MenuItem title="Adicionar" icon="add_task" />
          </NavLink>

          <MenuItem title="Sair" icon="logout" onClick={logoutApp} />
        </ul>
      </nav>
    </Container>
  );
}
