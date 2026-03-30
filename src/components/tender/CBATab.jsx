// src/components/tender/CBATab.jsx

import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PDFPreview from "../common/PDFPreview";
import { getTenderCBAAPI } from "../../api/tenderApi";

const bidders = ["Bidder Name 1", "Bidder Name 2", "Bidder Name 3", "Bidder Name 4", "Bidder Name 5", "Bidder Name 6"];

const CBATab = () => {
  const { id } = useParams();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [bidders, setBidders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCbaData = async () => {
      setLoading(true);
      const data = await getTenderCBAAPI(id);
      if (Array.isArray(data)) {
        setBidders(data.map(item => item.vendor_name || "Unknown"));
      }
      setLoading(false);
    };

    if (id) fetchCbaData();
  }, [id]);

  const openPreview = () => {
    setPreviewOpen(true);
  };

  if (loading) return <Typography p={3}>Loading CBA Data...</Typography>
  if (bidders.length === 0) return <Typography p={3}>No Bidders found for this tender.</Typography>

  return (
    <Box mt={3}>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography fontSize={18} fontWeight={600}>
          Commercial Bid Analysis
        </Typography>

        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            sx={{ borderColor: "#2F4DB5", color: "#2F4DB5" }}
          >
            Reset CBA
          </Button>

          <Button
            variant="contained"
            sx={{ background: "#2F4DB5", textTransform: "none" }}
          >
            Send for Checking
          </Button>
        </Box>
      </Box>

      {/* FILTER BAR */}
      <Box
        mt={2}
        sx={{
          background: "#eef2f7",
          borderRadius: 2,
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography fontWeight={500}>Evaluation Status</Typography>

        {["Acceptable", "Non Acceptable", "Generate Query", "Acceptable", "Non Acceptable", "Query Raised"].map(
          (x, i) => (
            <Select
              key={i}
              size="small"
              defaultValue={x}
              sx={{ minWidth: 150, background: "#fff" }}
            >
              <MenuItem value={x}>{x}</MenuItem>
            </Select>
          )
        )}
      </Box>

      {/* ================= TABLE ================= */}
      <Box mt={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
        {/* HEADER */}
        <Box
          display="flex"
          sx={{
            background: "linear-gradient(90deg,#2F4DB5,#4C6ED7)",
            color: "#fff",
            px: 2,
            py: 1.5,
            fontSize: 13,
            position: 'sticky',
            top: 0,
            zIndex: 1
          }}
        >
          <Box flex={2}>Bidder Details</Box>
          {bidders.map((name, i) => (
            <Box key={i} flex={1}>
              {name}
            </Box>
          ))}
        </Box>

        {/* BODY */}
        <Box sx={{maxHeight: "400px", overflowY: 'auto'}}>
          {rows.map((row, i) => (
            <Box
              key={i}
              display="flex"
              sx={{
                background: i % 2 === 0 ? "#f8fafc" : "#ffffff",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <Box flex={2} p={2} fontWeight={500}>
                {row.label}
              </Box>

              {row.values.map((v, j) => (
                <Box
                  key={j}
                  flex={1}
                  p={2}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { background: "#eef2ff" },
                  }}
                  onClick={openPreview}
                >
                  {v}
                </Box>
              ))}
            </Box>
          ))}
        </Box>

        {/* DOCUMENT CHECKLIST */}
        <Box display="flex" sx={{ background: "#f1f5f9" }}>
          <Box flex={2} p={2} fontWeight={600}>
            Document Checklist
          </Box>

          {bidders.map((_, i) => (
            <Box key={i} flex={1} p={2} display="flex" alignItems="center" gap={1}>
              {i % 2 === 0 ? (
                <CheckCircleIcon sx={{ color: "green" }} />
              ) : (
                <CancelIcon sx={{ color: "red" }} />
              )}
              <Typography fontSize={12}>Term 1</Typography>
              <ArrowDropDownIcon />
            </Box>
          ))}
        </Box>

        {/* ACTION ROW */}
        <Box display="flex" sx={{ background: "#ffffff" }}>
          <Box flex={2} p={2} fontWeight={600}>
            Actions
          </Box>

          {bidders.map((_, i) => (
            <Box key={i} flex={1} p={2} display="flex" alignItems="center" gap={1}>
              <Typography fontSize={12}>No Query</Typography>

              <IconButton size="small">
                <AddIcon sx={{ color: "#2F4DB5" }} />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>

      {/* PAGINATION */}
      <Box display="flex" justifyContent="center" mt={2} gap={1}>
        <Button>{"<"}</Button>
        {[1, 2, 3].map((p) => (
          <Box
            key={p}
            sx={{
              px: 2,
              py: 0.5,
              background: p === 1 ? "#2F4DB5" : "#e5e7eb",
              color: p === 1 ? "#fff" : "#000",
              borderRadius: 1,
            }}
          >
            {p}
          </Box>
        ))}
        <Button>{">"}</Button>
      </Box>

      {/* PDF PREVIEW */}
      <PDFPreview open={previewOpen} onClose={() => setPreviewOpen(false)} />
    </Box>
  );
};

export default CBATab;


/* ================= DATA ================= */

const rows = [
  {
    label: "Status of Firm",
    values: [
      "Partnership Firm",
      "Partnership Firm",
      "Proprietorship Firm",
      "Private Company",
      "Proprietorship Firm",
      "Proprietorship Firm",
    ],
  },
  {
    label: "Proprietor Director",
    values: Array(6).fill("Tender Specific"),
  },
  {
    label: "Power of Attorney",
    values: Array(6).fill("Tender Specific"),
  },
  {
    label: "Registered Office Address",
    values: Array(6).fill("Applicable based on tender estimate value"),
  },
  {
    label: "Contact Address",
    values: Array(6).fill("Applicable based on tender estimate value"),
  },
  {
    label: "Service Rendered Address",
    values: Array(6).fill(
      "Applicable based on tender estimate value / Tender Specific"
    ),
  },
  {
    label: "Email",
    values: Array(6).fill(
      "Applicable based on tender estimate value / Tender Specific"
    ),
  },
  {
    label: "Phone",
    values: Array(6).fill(
      "Applicable based on tender estimate value / Tender Specific"
    ),
  },
  {
    label: "Company PAN",
    values: Array(6).fill(
      "Applicable based on tender estimate value / Tender Specific"
    ),
  },
  {
    label: "GST",
    values: Array(6).fill(
      "Applicable based on tender estimate value / Tender Specific"
    ),
  },
  {
    label: "EMD Amount",
    values: Array(6).fill(
      "Applicable based on tender estimate value / Tender Specific"
    ),
  },
  {
    label: "Terms and Conditions",
    values: Array(6).fill(
      "Applicable based on tender estimate value / Tender Specific"
    ),
  },
  {
    label: "Bid Validity",
    values: Array(6).fill(
      "Applicable based on tender estimate value / Tender Specific"
    ),
  },
  {
    label: "Payment Terms",
    values: Array(6).fill(
      "Applicable based on tender estimate value / Tender Specific"
    ),
  },
  {
    label: "Contract Performance Security",
    values: Array(6).fill(
      "Applicable based on tender estimate value / Tender Specific"
    ),
  },
  {
    label: "Contract Period",
    values: Array(6).fill(
      "Applicable based on tender estimate value / Tender Specific"
    ),
  },
  {
    label: "Price Reduction Schedule",
    values: Array(6).fill(
      "Applicable based on tender estimate value / Tender Specific"
    ),
  },
  {
    label: "Liable To Raise E-Invoice",
    values: Array(6).fill(
      "Applicable based on tender estimate value / Tender Specific"
    ),
  },
];