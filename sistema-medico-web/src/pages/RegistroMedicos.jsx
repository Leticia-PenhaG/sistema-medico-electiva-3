import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Paper,
  Container,
  Typography,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import axios from "axios";

const RegistroMedicos = () => {
  const [medicos, setMedicos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    especialidad: "",
    telefono: "",
    email: "",
  });
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchMedicos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/medicos");
      setMedicos(response.data);
    } catch (error) {
      console.error("Error al obtener médicos:", error);
    }
  };

  useEffect(() => {
    fetchMedicos();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        const response = await axios.patch(
          `http://localhost:3000/medicos/${editId}`,
          formData
        );
        alert(`Médico actualizado: ${response.data.nombre} ${response.data.apellido}`);
      } else {
        const response = await axios.post("http://localhost:3000/medicos", formData);
        alert(`Médico registrado: ${response.data.nombre} ${response.data.apellido}`);
      }

      setFormData({
        nombre: "",
        apellido: "",
        cedula: "",
        especialidad: "",
        telefono: "",
        email: "",
      });
      setIsEditing(false);
      setEditId(null);
      fetchMedicos();
    } catch (error) {
      console.error("Error al guardar médico:", error);
      alert(`No se pudo guardar el médico. Motivo: ${error.response?.data || "Error desconocido"}`);
    }
  };

  const handleEdit = (medico) => {
    setFormData(medico);
    setIsEditing(true);
    setEditId(medico.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/medicos/${id}`);
      fetchMedicos();
    } catch (error) {
      console.error("Error al eliminar médico:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Registro de Médicos
      </Typography>
      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6">{isEditing ? "Editar Médico" : "Registrar Médico"}</Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <TextField
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Cédula"
              name="cedula"
              value={formData.cedula}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Especialidad"
              name="especialidad"
              value={formData.especialidad}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Teléfono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Correo Electrónico"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            {isEditing ? "Actualizar Médico" : "Registrar Médico"}
          </Button>
        </form>
      </Paper>

      <Paper sx={{ padding: 2 }}>
        <Typography variant="h6">Listado de Médicos</Typography>
        <TextField
          label="Buscar por nombre o cédula"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Cédula</TableCell>
              <TableCell>Especialidad</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicos
              .filter(
                (m) =>
                  m.nombre.toLowerCase().includes(search.toLowerCase()) ||
                  m.cedula.includes(search)
              )
              .map((medico) => (
                <TableRow key={medico.id}>
                  <TableCell>{medico.nombre}</TableCell>
                  <TableCell>{medico.apellido}</TableCell>
                  <TableCell>{medico.cedula}</TableCell>
                  <TableCell>{medico.especialidad}</TableCell>
                  <TableCell>{medico.telefono}</TableCell>
                  <TableCell>{medico.email}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEdit(medico)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(medico.id)}
                      >
                        Eliminar
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default RegistroMedicos;