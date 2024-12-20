import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Sistema Médico
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Inicio
        </Button>
        <Button color="inherit" component={Link} to="/registro-pacientes">
          Registrar Pacientes
        </Button>
        <Button color="inherit" component={Link} to="/registro-medico">
          Registrar Médicos
        </Button>
        <Button color="inherit" component={Link} to="/registro-fichas">
          Registrar Fichas
        </Button>
        <Button color="inherit" component={Link} to="/historial-clinico">
          Historial Clínico
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
