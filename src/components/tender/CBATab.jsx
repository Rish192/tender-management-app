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
import { getTenderCBAAPI, getTenderCBADetailAPI, sendForCheckingAPI } from "../../api/tenderApi";
import { useUI } from "../../store/uiStore";
import { useNavigate } from "react-router-dom";

const CBACell = ({ tenderId, bidId, property, openPreview }) => {
  const [value, setValue] = useState("Loading...");
  const [cellData, setCellData] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await getTenderCBADetailAPI(tenderId, bidId, property);
        setCellData(res);

        if (res && res.property_value !== null && res.property_value !== undefined) {
          const val = res.property_value;
          if (Array.isArray(val)) {
            setValue(val.length > 0 ? val.join(",") : "N/A");
          } else if (typeof val === "boolean") {
            setValue(val ? "True" : "False");
          } else if (typeof val === "object") {
            setValue(val.name || JSON.stringify(val));
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
      flex={1}
      minWidth={160}
      px={2}
      py={1.5}
      onClick={() => {
        if (cellData?.file_path) {
          openPreview(cellData.file_path, cellData.page_number || 1, cellData.doc_name);
        }
      }}
      sx={{
        "&:hover": { background: "#f1f5f9" },
        cursor: "pointer",
        wordBreak: "break-word",
        whiteSpace: "normal",
        lineHeight: 1.4
      }}
    >
      {value}
    </Box>
  );
};

const CBATab = () => {
  const { id } = useParams();
  const { showNotification } = useUI();
  const navigate = useNavigate();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [bidders, setBidders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [previewData, setPreviewData] = useState({
    url: "",
    page: 1,
    filename: ""
  });

  useEffect(() => {
    const fetchCbaData = async () => {
      setLoading(true);
      const data = await getTenderCBAAPI(id);
      if (Array.isArray(data)) {
        setBidders(data.map(item => ({
          bidderName: item.vendor_name.charAt(0).toUpperCase() + item.vendor_name.slice(1),
          bidId: item.bid_id
        })));
      }
      setLoading(false);
    };

    if (id) fetchCbaData();
  }, [id]);

  const handleSendForChecking = async () => {
    setIsSending(true);
    try {
      const res = await sendForCheckingAPI(id);
      if (res.status === "success" || res.new_status === "Sent for Checking") {
        showNotification("Tender has been sent for checking successfully");
      }
    } catch (err) {
      console.log("Error sending tender for checking: ", err);
      showNotification("Failed to send tender for checking");
    } finally {
      setIsSending(false);
      navigate(`/dashboard`);
    }
  };

  const openPreview = (url, page, fileName) => {
    setPreviewData({ url, page, fileName });
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
            disabled={isSending}
            onClick={handleSendForChecking}
            sx={{ background: "#2F4DB5", textTransform: "none" }}
          >
            {isSending ? "Sending..." : "Send for Checking"}
          </Button>
        </Box>
      </Box>

      {/* TABLE */}
      <Box mt={2} sx={{
        borderRadius: 2,
        overflow: "auto",
        maxHeight: "500px",
        border: "1px solid #e5e7eb",
        background: "#fff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
      }}>
        <Box sx={{ minWidth: "max-content" }}>
          <Box display="flex" sx={{ background: "#eef2f7", borderBottom: "1px solid #e5e7eb", fontSize: 13, top: 0 }}>
            <Box
              flex={0.5}
              minWidth={100}
              px={2}
              py={1.5}
              fontWeight={500}
              sx={{
                position: 'sticky',
                left: 0,
                background: "#eef2f7",
                zIndex: 11,
                borderRight: "1px solid #e5e7eb"
              }}
            >
              Evaluation Status
            </Box>

            {bidders.map((bidder) => (
              <Box key={bidder.bidId} flex={1} minWidth={160} px={2} py={1.5}>
                <Select fullWidth size="small" defaultValue="Acceptable" sx={{ background: "#fff" }}>
                  <MenuItem value="Acceptable">Acceptable</MenuItem>
                  <MenuItem value="Non Acceptable">Non Acceptable</MenuItem>
                  <MenuItem value="Generate Query">Generate Query</MenuItem>
                  <MenuItem value="Query Raised">Query Raised</MenuItem>
                </Select>
              </Box>
            ))}
          </Box>

          {/* HEADER */}
          <Box
            display="flex"
            sx={{
              background: "#2F4DB5",
              color: "#fff",
              fontSize: 13,
              position: 'sticky',
              top: 0,
              zIndex: 10
            }}
          >
            <Box flex={0.5} minWidth={100} px={2} py={1.5} sx={{ position: 'sticky', left: 0, background: "#2F4DB5", zIndex: 11, borderRight: "1px solid rgba(255,255,255,0.2)" }}>
              Bidder Details
            </Box>
            {bidders.map((bidder) => (
              <Box key={bidder.bidId} flex={1} minWidth={160} px={2} py={1.5}>
                {bidder.bidderName}
              </Box>
            ))}
          </Box>

          {/* BODY */}
          <Box>
            {rows.map((row, i) => (
              <Box
                key={i}
                display="flex"
                sx={{
                  background: i % 2 === 0 ? "#f8fafc" : "#ffffff",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <Box
                  flex={0.5} minWidth={100} p={2} fontWeight={500}
                  sx={{
                    position: 'sticky',
                    left: 0,
                    background: i % 2 === 0 ? "#f8fafc" : "#ffffff",
                    zIndex: 5,
                    borderRight: "1px solid #e5e7eb",
                    boxShadow: "2px 0 5px -2px rgba(0,0,0,0.1)"
                  }}
                >
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
          <Box display="flex" sx={{ background: "#f1f5f9", borderBottom: "1px solid #e5e7eb" }}>
            <Box
              flex={0.5} minWidth={100} p={2} fontWeight={600}
              sx={{
                position: 'sticky',
                left: 0,
                background: "#f1f5f9",
                zIndex: 5,
                borderRight: "1px solid #e5e7eb",
                boxShadow: "2px 0 5px -2px rgba(0,0,0,0.1)"
              }}
            >
              Document Checklist
            </Box>

            {bidders.map((_, i) => (
              <Box key={i} flex={1} minWidth={160} p={2} display="flex" alignItems="center" gap={1}>
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
            <Box
              flex={0.5} minWidth={100} p={2} fontWeight={600}
              sx={{
                position: 'sticky',
                left: 0,
                background: "#ffffff",
                zIndex: 5,
                borderRight: "1px solid #e5e7eb",
                boxShadow: "2px 0 5px -2px rgba(0,0,0,0.1)"
              }}
            >
              Actions
            </Box>

            {bidders.map((_, i) => (
              <Box key={i} flex={1} minWidth={160} p={2} display="flex" alignItems="center" gap={1}>
                <Typography fontSize={12}>No Query</Typography>

                <IconButton size="small">
                  <AddIcon sx={{ color: "#2F4DB5" }} />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* PAGINATION */}
      <Box
        sx={{
          width: "100%",    
          display: "flex",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <Box display="flex" gap={1}>
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
      </Box>

      {/* PDF PREVIEW */}
      <PDFPreview open={previewOpen} onClose={() => setPreviewOpen(false)} data={previewData} />
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