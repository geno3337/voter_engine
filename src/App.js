import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepOrange, red } from '@mui/material/colors'
import { BrowserRouter } from "react-router-dom";
import CommonRoutes from './routes/commonroute';
import AdminRoutes from './routes/adminroute';

const theme = createTheme({
  palette: {
    primary: {
      main: deepOrange[500],
    },
  },
});

function App() {



  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CommonRoutes />
          <AdminRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
