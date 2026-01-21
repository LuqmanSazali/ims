import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";

import { Button, Pagination, Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { DeleteDialog } from "../components/DeleteDialog";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface Inventory {
  id: number;
  name: string;
  quantity: number;
}

const apiUrl = import.meta.env.VITE_API_URL;

export function Home() {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<Inventory | null>(null);
  const [items, setItems] = useState<Inventory[]>([]);
  const [totalItem, setTotalItem] = useState(1);

  const pageSize = 8;

  const fetchItems = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
      });

      const res = await fetch(`${apiUrl}/items?${params.toString()}`);

      if (!res.ok) throw new Error("Failed to remove item");
      const result = await res.json();

      setItems(result.data);
      setTotalItem(result.total);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch items!");
    }
  }, [page]);

  useEffect(() => {
    const fetch = async () => {
      await fetchItems();
    };

    fetch();
  }, [fetchItems]);

  const handleRemoveItem = (item: Inventory) => {
    setItemToRemove(item);
    setOpen(true);
  };

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleCancel = useCallback(() => {
    setOpen(false);
    setItemToRemove(null);
  }, []);

  const handleConfirm = useCallback(async () => {
    if (!itemToRemove) return;

    try {
      const res = await fetch(`${apiUrl}/items/${itemToRemove.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to remove item");

      toast.success(`Item "${itemToRemove.name}" removed successfully!`);

      handleCancel();
      await fetchItems();
    } catch (error) {
      console.error(error);
      toast.error(`Failed to remove "${itemToRemove.name}". Please try again.`);
    }
  }, [itemToRemove, handleCancel, fetchItems]);

  return (
    <>
      <Stack flex={1} spacing={2} alignItems="center">
        <Stack direction="row" justifyContent="flex-end" sx={{ width: "100%" }}>
          <Button variant="contained" component={Link} to="/add">
            Add
          </Button>
        </Stack>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{item.id}</TableCell>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="text"
                      disableRipple
                      onClick={() => handleRemoveItem(item)}
                    >
                      <DeleteIcon color="error"></DeleteIcon>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={Math.max(1, Math.ceil(totalItem / pageSize))}
          page={page}
          onChange={handleChange}
        />
      </Stack>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      ></DeleteDialog>
    </>
  );
}
