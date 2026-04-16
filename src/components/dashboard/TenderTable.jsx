// src/components/dashboard/TenderTable.jsx

import { Box, Typography, Select, MenuItem, IconButton } from "@mui/material";
import { useState, useMemo } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useTenderStore } from "../../store/tenderStore";
import { useUI } from "../../store/uiStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const TenderTable = () => {
  const { tenders } = useTenderStore();

  // ✅ ADDED setSelectedTenderId
  const { filters, setEditOpen, setSelectedTenderId } = useUI();

  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // ✅ existing filter logic (UNCHANGED)
  const filtered = useMemo(() => {
    const tenderList = Array.isArray(tenders) ? tenders : [];
    return tenderList.filter((t) => {
      const filterName = filters.name?.toLowerCase() || "";
      const matchName =
        !filterName ||
        t.subject?.toLowerCase().includes(filterName);

      const matchDate =
        !filters.date ||
        t.bid_due_date === filters.date;

      return matchName && matchDate;
    });
  }, [tenders, filters]);

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const start = (page - 1) * rowsPerPage;
  const paginated = filtered.slice(start, start + rowsPerPage);

  // ✅ FIXED EDIT HANDLER (IMPORTANT)
  const handleEdit = (t) => {
    setSelectedTenderId(t.tender_id);
    setEditOpen(true);
  };

  return (
    <Box>
      {/* HEADER */}
      <Box
        display="flex"
        px={'0.8333vw'}
        py={'0.8333vw'}
        sx={{
          background: "linear-gradient(90deg, #2F4DB5, #4C6ED7)",
          color: "#fff",
          borderRadius: 2,
          fontSize: '0.8333vw',
          fontWeight: 500,
        }}
      >
        <Box flex={2}>Tender No.</Box>
        <Box flex={2}>Bid Due Date</Box>
        <Box flex={1}>Bid Validity</Box>
        <Box flex={2}>Status</Box>
        <Box flex={1}>Actions</Box>
      </Box>

      {/* CARD CONTAINER */}
      <Box
        mt={'0.8333vw'}
        sx={{
          background: "#ffffff",
          borderRadius: 3,
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        {paginated.map((t, i) => (
          <Box key={t.tender_id}>
            {/* ROW */}
            <Box
              display="flex"
              px={'0.8333vw'}
              py={'0.8333vw'}
              alignItems="center"
              sx={{
                fontSize: '0.8333vw',
                background: i % 2 === 0 ? "#fafbff" : "#ffffff",
              }}
            >
              <Box flex={2}>{t.tender_number}</Box>
              <Box flex={2}>{t.bid_due_date}</Box>
              <Box flex={1}>{t.Validity}</Box>
              <Box flex={2} sx={{ color: "#666" }}>
                {t.tender_status}
              </Box>

              {/* ✅ ACTIONS */}
              <Box flex={1} sx={{display: 'flex', alignItems: 'center', gap: '0.4167vw'}}>
                {/* 👁 VIEW */}
                <IconButton
                  onClick={() => navigate(`/tender/${t.tender_id}`)}
                  disabled={t.tender_status !== "Validated" && t.tender_status !== "Sent for Checking" && t.tender_status !== "CBA Completed"}
                  size="small"
                  sx={{
                    background: "#2F4DB5",
                    color: "#fff",
                    p: '0.4167vw'
                  }}
                >
                  <VisibilityIcon sx={{fontSize: '1.25vw'}} />
                </IconButton>

                {/* ✏ EDIT */}
                <IconButton
                  onClick={() => handleEdit(t)}
                  size="small"
                  sx={{
                    border: "1px solid #2F4DB5",
                    color: "#2F4DB5",
                    p: '0.4167vw'
                  }}
                >
                  <EditIcon sx={{fontSize: '1.25vw'}} />
                </IconButton>
              </Box>
            </Box>

            {/* DIVIDER */}
            {i !== paginated.length - 1 && (
              <Box
                sx={{
                  height: '0.0521vw',
                  background: "#E5E7EB",
                  mx: '0.8333vw',
                }}
              />
            )}
          </Box>
        ))}
      </Box>

      {/* PAGINATION */}
      {/* <Box display="flex" alignItems="center" gap={'0.8333vw'} mt={'0.8333vw'}>
        <select
          value={rowsPerPage}
          onChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setPage(1);
          }}
        >
          <option value={5}>5</option>
          <option value={7}>7</option>
          <option value={10}>10</option>
        </select>

        <Box display="flex" alignItems="center" gap={'0.4167vw'}>
          <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
            {"<"}
          </button>

          <Box
            sx={{
              background: "#2F4DB5",
              color: "#fff",
              px: '0.8333vw',
              py: '0.4167vw',
              borderRadius: 1,
            }}
          >
            {page}
          </Box>

          <button
            onClick={() =>
              setPage((p) => Math.min(p + 1, totalPages))
            }
          >
            {">"}
          </button>
        </Box>
      </Box> */}
      <Box 
        display="flex" 
        alignItems="center"
        mt="1.5vw" 
        px="0.5vw"
        sx={{position: 'relative', width: '100%'}}
      >
        {/* ROWS PER PAGE SELECTOR */}
        <Box display="flex" alignItems="center" gap="0.5vw" sx={{flex: 1}}>
          <Typography fontSize="0.8333vw" color="#666">Rows per page:</Typography>
          <Select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setPage(1);
            }}
            variant="standard"
            disableUnderline
            sx={{
              fontSize: "0.8vw",
              fontWeight: 600,
              color: "#2F4DB5",
              background: "#f0f4ff",
              borderRadius: "4px",
              px: "0.5vw",
              "& .MuiSelect-select": { py: "0.2vw" },
            }}
          >
            {[5, 7, 10].map((val) => (
              <MenuItem key={val} value={val}>{val}</MenuItem>
            ))}
          </Select>
        </Box>

        {/* NAVIGATION CONTROLS */}
        <Box display="flex" alignItems="center" gap="0.8vw"
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)'
        }}>
          <IconButton 
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            sx={{ 
              border: "1px solid #E5E7EB", 
              borderRadius: "8px",
              width: "2vw",
              height: "2vw",
              transition: "0.2s",
              "&:hover": { background: "#f0f4ff", borderColor: "#2F4DB5" }
            }}
          >
            <KeyboardArrowLeftIcon sx={{ fontSize: "1.2vw", color: page === 1 ? "#ccc" : "#2F4DB5" }} />
          </IconButton>

          <Box
            sx={{
              background: "linear-gradient(135deg, #2F4DB5, #4C6ED7)",
              color: "#fff",
              width: "2vw",
              height: "2vw",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
              fontSize: "0.85vw",
              fontWeight: 600,
              boxShadow: "0 4px 10px rgba(47, 77, 181, 0.2)",
            }}
          >
            {page}
          </Box>

          <IconButton 
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            sx={{ 
              border: "1px solid #E5E7EB", 
              borderRadius: "8px",
              width: "2vw",
              height: "2vw",
              transition: "0.2s",
              "&:hover": { background: "#f0f4ff", borderColor: "#2F4DB5" }
            }}
          >
            <KeyboardArrowRightIcon sx={{ fontSize: "1.2vw", color: page === totalPages ? "#ccc" : "#2F4DB5" }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default TenderTable;