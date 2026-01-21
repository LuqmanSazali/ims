import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const apiUrl = import.meta.env.VITE_API_URL;

export const AddItem = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const navigate = useNavigate();

  const handleClear = () => {
    setName("");
    setQuantity("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || quantity === "") {
      toast.error("Please fill in both Name and Quantity.");
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          quantity: Number(quantity),
        }),
      });

      if (!res.ok) throw new Error("Failed to add item");

      toast.success(`Item "${name}" (Qty: ${quantity}) added successfully!`);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(`Failed to add "${name}". Please try again.`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flex: "1",
      }}
    >
      <Stack
        direction="column"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        flex={1}
      >
        <TextField
          sx={{ minWidth: 300, maxWidth: 500 }}
          label="Name"
          variant="filled"
          color="info"
          focused
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          sx={{ minWidth: 300, maxWidth: 500 }}
          label="Quantity"
          variant="filled"
          color="info"
          focused
          type="number"
          slotProps={{ htmlInput: { min: 0, step: 1 } }}
          value={quantity}
          onChange={(e) => {
            const val = e.target.value;
            if (val === "" || Number(val) >= 0) setQuantity(val);
          }}
          required
        />
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="contained" onClick={handleClear} type="button">
            Clear
          </Button>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
