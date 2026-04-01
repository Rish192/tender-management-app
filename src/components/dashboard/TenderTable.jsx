// src/components/dashboard/TenderTable.jsx

import { Box, IconButton } from "@mui/material";
import { useState, useMemo } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
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
    setSelectedTenderId(t.tender_id); // 🔥 pass ID
    setEditOpen(true);
  };

  return (
    <Box>
      {/* HEADER */}
      <Box
        display="flex"
        py={1.5}
        px={2}
        sx={{
          background: "linear-gradient(90deg, #2F4DB5, #4C6ED7)",
          color: "#fff",
          borderRadius: 2,
          fontSize: 13,
          fontWeight: 500,
        }}
      >
        <Box flex={2}>Tender No.</Box>
        {/* <Box flex={3}>Subject</Box> */}
        <Box flex={2}>Bid Due Date</Box>
        {/* <Box flex={2}>Bid Validity End Date</Box>
        <Box flex={1}>TAT</Box> */}
        <Box flex={1}>Bid Validity</Box>
        <Box flex={2}>Status</Box>
        <Box flex={1}>Actions</Box>
      </Box>

      {/* CARD CONTAINER */}
      <Box
        mt={2}
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
              px={2}
              py={2}
              alignItems="center"
              sx={{
                fontSize: 14,
                background: i % 2 === 0 ? "#fafbff" : "#ffffff",
              }}
            >
              <Box flex={2}>{t.tender_number}</Box>

              {/* <Box flex={3} sx={{ color: "#444" }}>
                {t.subject}
              </Box> */}

              <Box flex={2}>{t.bid_due_date}</Box>
              {/* <Box flex={2}>{t.bid_validity}</Box> */}
              {/* <Box flex={1}>{t.tat}</Box> */}
              <Box flex={1}>{t.Validity}</Box>

              <Box flex={2} sx={{ color: "#666" }}>
                {t.tender_status}
              </Box>

              {/* ✅ ACTIONS */}
              <Box flex={1} display="flex" gap={1}>
                {/* 👁 VIEW */}
                <IconButton
                  onClick={() => navigate(`/tender/${t.tender_id}`)}
                  disabled={!t.isValidated}
                  size="small"
                  sx={{
                    background: "#2F4DB5",
                    color: "#fff",
                    width: 34,
                    height: 34,
                  }}
                >
                  <VisibilityIcon fontSize="small" />
                </IconButton>

                {/* ✏ EDIT */}
                <IconButton
                  onClick={() => handleEdit(t)} // 🔥 PASS TENDER
                  size="small"
                  sx={{
                    border: "1px solid #2F4DB5",
                    color: "#2F4DB5",
                    width: 34,
                    height: 34,
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {/* DIVIDER */}
            {i !== paginated.length - 1 && (
              <Box
                sx={{
                  height: "1px",
                  background: "#E5E7EB",
                  mx: 2,
                }}
              />
            )}
          </Box>
        ))}
      </Box>

      {/* PAGINATION */}
      <Box display="flex" alignItems="center" gap={2} mt={2}>
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

        <Box display="flex" alignItems="center" gap={1}>
          <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
            {"<"}
          </button>

          <Box
            sx={{
              background: "#2F4DB5",
              color: "#fff",
              px: 2,
              py: 0.5,
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
      </Box>
    </Box>
  );
};

export default TenderTable;