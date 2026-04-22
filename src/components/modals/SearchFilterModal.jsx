import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import { useUI } from "../../store/uiStore";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const SearchFilterModal = () => {
  const { searchOpen, setSearchOpen, setFilters } = useUI();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = () => {
    setFilters({ name, date });
    setSearchOpen(false);
  };

  return (
    <Modal open={searchOpen} onClose={() => setSearchOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: '7.292vw',
          right: '6.25vw',
          width: '27.083vw',
          background: "#eef2f7",
          borderRadius: "16px",
          p: '1.25vw',
          boxShadow: "0px 20px 40px rgba(0,0,0,0.15)",
        }}
      >
        {/* TITLE */}
        <Typography fontWeight={600} mb={'0.8333vw'} fontSize={'0.9375vw'}>
          Search Filter
        </Typography>

        {/* INPUTS */}
        <Box display="flex" gap={'0.8333vw'} mb={'1.25vw'}>
          {/* NAME */}
          <Box flex={1}>
            <Typography fontSize={'0.7292vw'} mb={'0.4167vw'} color="#6b7280">
              Bid Name
            </Typography>

            <TextField
              fullWidth
              placeholder="Enter the Bid name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  fontSize: '0.9375vw',
                  background: "#f8fafc",
                  "& fieldset": {
                    borderColor: "#cbd5e1",
                  },
                  "&:hover fieldset": {
                    borderColor: "#94a3b8",
                  },
                },
              }}
            />
          </Box>

          {/* DATE */}
          <Box flex={1}>
            <Typography fontSize={'0.7292vw'} mb={'0.4167vw'} color="#6b7280">
              Bid Due Date
            </Typography>

            <TextField
              fullWidth
              placeholder="DD-MM-YYYY"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CalendarTodayIcon
                      sx={{ fontSize: '0.9375vw', color: "#6b7280" }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  background: "#f8fafc",
                  fontSize: '0.9375vw',
                  "& fieldset": {
                    borderColor: "#cbd5e1",
                  },
                  "&:hover fieldset": {
                    borderColor: "#94a3b8",
                  },
                },
              }}
            />
          </Box>
        </Box>

        {/* BUTTON */}
        <Button
          fullWidth
          onClick={handleSearch}
          sx={{
            background: "#3b57b7",
            color: "#fff",
            textTransform: "none",
            borderRadius: "10px",
            py: '0.4167vw',
            fontSize: '0.8333vw',
            fontWeight: 500,
            boxShadow: "0 6px 14px rgba(59,87,183,0.3)",
            "&:hover": {
              background: "#2f4db5",
            },
          }}
        >
          Search
        </Button>
      </Box>
    </Modal>
  );
};

export default SearchFilterModal;