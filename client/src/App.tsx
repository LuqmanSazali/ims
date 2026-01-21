import { Route, Routes } from "react-router-dom";
import { AddItem } from "./pages/AddItem";
import { createTheme, CssBaseline, Stack, ThemeProvider } from "@mui/material";
import { Home } from "./pages/Home";
import { Toaster } from "sonner";
import { Breadcrumb } from "./components/Breadcrumb";

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Toaster position="top-right" />
      <CssBaseline />
      <Stack direction="column" gap={2} sx={{ minHeight: "100vh", padding: 2 }}>
        <Breadcrumb />
        <Stack direction="column" sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddItem />} />
          </Routes>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
