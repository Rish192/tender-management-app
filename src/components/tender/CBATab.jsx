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
import { getTenderCBAAPI, getTenderCBADetailAPI } from "../../api/tenderApi";

const bidders = ["Bidder Name 1", "Bidder Name 2", "Bidder Name 3", "Bidder Name 4", "Bidder Name 5", "Bidder Name 6"];

const CBACell = ({tenderId, bidId, property, openPreview}) => {
  const [value, setValue] = useState("Loading...");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await getTenderCBADetailAPI(tenderId, bidId, property);

        if (res && res.property_value !== null && res.property_value !== undefined) {
          const val = res.property_value;
          if (Array.isArray(val)) {
            setValue(val.length > 0 ? val.join(",") : "N/A");
          } else if (typeof val === "boolean") {
            setValue(val ? "True" : "False");
          } else {
            setValue(val.toString());
          }
        } else {
          setValue("N/A")
        }
      } catch {
        setValue("Error");
      }
    };
    fetchDetail();
  }, [tenderId, bidId, property]);

  return (
    <Box
      flex={1} p={2}
      onClick={() => openPreview(tenderId, bidId, property)}
      sx={{"&:hover": {background: "#ee2ff"}, cursor: "pointer"}}  
    >
      {value}
    </Box>
  );
};

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
        setBidders(data.map(item => ({
          bidderName: item.vendor_name || "Unknown",
          bidId: item.bid_id
        })));
      }
      setLoading(false);
    };

    if (id) fetchCbaData();
  }, [id]);

  const openPreview = () => {
    setPreviewOpen(true);
  };

  //if (loading) return <Typography p={3}>Loading CBA Data...</Typography>
  //if (bidders.length === 0) return <Typography p={3}>No Bidders found for this tender.</Typography>

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
          {bidders.map((bidder) => (
            <Box key={bidder.bidId} flex={1}>
              {bidder.bidderName}
            </Box>
          ))}
        </Box>

        {/* BODY */}
        <Box sx={{maxHeight: "1000px", overflowY: 'auto'}}>
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

              {bidders.map((bidder) => (
                <CBACell
                  key={bidder.bidId}
                  tenderId={id}
                  bidId={bidder.bidId}
                  property={row.apiKey}
                  openPreview={openPreview}
                />
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
    apiKey: "status_of_firm",
  },
  {
    label: "Proprietor Director",
    apiKey: "proprietor_director",
  },
  {
    label: "Power of Attorney",
    apiKey: "power_of_attorney",
  },
  {
    label: "Registered Office Address",
    apiKey: "registered_office_address",
  },
  {
    label: "Contact Address",
    apiKey: "contact_address",
  },
  {
    label: "Service Rendered Address",
    apiKey: "service_rendered_address",
  },
  {
    label: "Email",
    apiKey: "email",
  },
  {
    label: "Phone",
    apiKey: "phone",
  },
  {
    label: "Company PAN",
    apiKey: "company_pan",
  },
  {
    label: "GST",
    apiKey: "gst",
  },
  {
    label: "EMD Amount",
    apiKey: "emd_amount",
  },
  {
    label: "Terms and Conditions",
    apiKey: "terms_and_condition",
  },
  {
    label: "Bid Validity",
    apiKey: "bid_validity",
  },
  {
    label: "Payment Terms",
    apiKey: "payment_terms",
  },
  {
    label: "Contract Performance Security",
    apiKey: "contract_performance_security",
  },
  {
    label: "Contract Period",
    apiKey: "contract_period",
  },
  {
    label: "Price Reduction Schedule",
    apiKey: "price_reduction_schedule",
  },
  {
    label: "Liable To Raise E-Invoice",
    apiKey: "liable_to_raise_e_invoice",
  },
];