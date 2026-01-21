import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Link from "@mui/material/Link";

export function Breadcrumb() {
  const location = useLocation();

  const isAddPage = location.pathname === "/add";

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {isAddPage
        ? [
            <Link
              component={RouterLink}
              underline="hover"
              color="inherit"
              to="/"
            >
              Home
            </Link>,
            <Typography key="add" color="text.primary">
              Add Item
            </Typography>,
          ]
        : [
            <Typography key="home" color="text.primary">
              Home
            </Typography>,
          ]}
    </Breadcrumbs>
  );
}
