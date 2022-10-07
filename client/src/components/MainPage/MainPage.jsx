import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../slices/authSlice.js";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NavigationIcon from "@mui/icons-material/Navigation";
import BottomNavigationBar from "../BottomNavigationBar/BottomNavigationBar.jsx";
import theme from "../../app/theme.js";
import TextEditor from "../TextEditor/TextEditor.jsx";

function MainPage() {
  let userData = useSelector(selectUserData);
  // const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <CssBaseline />
        <Box>
          <div>first box</div>
        </Box>
        <Box>
          <div>
            <TextEditor />
          </div>
        </Box>
        <BottomNavigationBar />
      </Container>
    </ThemeProvider>
  );
}

export default MainPage;
