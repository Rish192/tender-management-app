// src/components/modals/EditTenderModal.jsx

import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useState, useEffect } from "react";
import { useUI } from "../../store/uiStore";
import { useTenderStore } from "../../store/tenderStore";
import { useNavigate } from "react-router-dom";

// 🔥 API IMPORTS
import {
  updateTenderAPI,
  uploadCBAAPI,
  getTenderDetailsAPI
} from "../../api/tenderApi";

const sectionCard = {
  background: "#cfe3ec",
  borderRadius: 3,
  p: 3,
  mb: 3,
  boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05)",
};

const inputStyle = {
  background: "#eaf1f6",
  borderRadius: 2,
};

const EditTenderModal = () => {
  const {
    editOpen,
    setEditOpen,
    showNotification,
    selectedTenderId,
    setCbaUploadOpen,
    panelNotifications,
  } = useUI();

  const { updateTender, tenders } = useTenderStore();
  const navigate = useNavigate();

  const [isCbaReady, setIsCbaReady] = useState(false);
  const [tenderId, setTenderId] = useState(null);
  const [zipFile, setZipFile] = useState(null);

  const [rows, setRows] = useState([
    { industry: "", s1: "", s2: "" },
  ]);

  const [params, setParams] = useState([]);

  const [formData, setFormData] = useState({
    tender_number: "",
    tender_subject: "",
    tender_publishing_date: "",
    bid_due_date: "",
    bid_opening_date: "",
    total_emd: "",
    avg_annual_turnover: "",
    working_capital: "",
    evaluation_methodology: "",
    purchase_service_requisition_number: "",
    bid_validity_end_date: "",
    mse_policy: "",
    make_in_india_policy: "",
    net_worth: ""
  });

  // ================= INIT =================
  useEffect(() => {
    const fetchDetails = async () => {
      if (editOpen && selectedTenderId) {
        setTenderId(selectedTenderId);
        const data = await getTenderDetailsAPI(selectedTenderId);

        if (data && data.tender_details) {
          const details = data.tender_details;

          const formatDateForInput = (dateStr) => {
            if (!dateStr) return "";

            const cleanDate = dateStr.split(" ")[0];
            if (cleanDate.includes("-") && cleanDate.split("-")[0].length === 4) {
              return cleanDate;
            }
            const parts = cleanDate.split("-");
            if (parts.length === 3) {
              const [day, month, year] = parts;
              return `${year}-${month}-${day}`;
            }
            return cleanDate;
          }
          setFormData({
            tender_number: details.tender_number || "",
            tender_subject: details.tender_subject || "",
            tender_publishing_date: formatDateForInput(details.tender_publishing_date) || "",
            bid_due_date: formatDateForInput(details.bid_due_date) || "",
            bid_opening_date: formatDateForInput(details.bid_opening_date) || "",
            total_emd: details.total_emd || "",
            avg_annual_turnover: details.avg_annual_turnover || "",
            working_capital: details.working_capital || "",
            evaluation_methodology: details.evaluation_methodology || "",
            purchase_service_requisition_number: details.purchase_service_requisition_number || "",
            bid_validity_end_date: formatDateForInput(details.bid_validity_end_date) || "",
            mse_policy: details.mse_policy || "",
            make_in_india_policy: details.make_in_india_policy || "",
            net_worth: details.net_worth || ""

          });
          if (details.domain && details.domain.length > 0) {
            const groupedRows = [];
            const industryMap = {};

            details.domain.forEach((d) => {
              const indName = d.industry || "";
              const secName = d.sector || "";

              if (industryMap[indName]) {
                industryMap[indName].s2 = secName;
              } else {
                const newRow = { industry: indName, s1: secName, s2: "" };
                industryMap[indName] = newRow;
                groupedRows.push(newRow);
              }
            });
            setRows(groupedRows);
          }
        }
      }
    };
    fetchDetails();
  }, [editOpen, selectedTenderId]);

  useEffect(() => {
    setIsCbaReady(false);

    if (!selectedTenderId || !editOpen) return;

    const cbaProcessed = panelNotifications.some(n => 
      n.message.includes("CBA Analysis available") &&
      n.message.includes(selectedTenderId)
    );

    if (cbaProcessed) {
      setIsCbaReady(true);
    }
  }, [panelNotifications, selectedTenderId, editOpen])

  // ================= HANDLERS =================
  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const addRow = () =>
    setRows((p) => [...p, { industry: "", s1: "", s2: "" }]);

  const removeRow = (i) =>
    setRows((p) => p.filter((_, idx) => idx !== i));

  const addParam = () =>
    setParams((p) => [...p, { name: "", desc: "", type: "" }]);

  const removeParam = (i) =>
    setParams((p) => p.filter((_, idx) => idx !== i));

  const handleZip = (e) => setZipFile(e.target.files[0]);

  // ================= SAVE DRAFT =================
  const handleSaveDraft = async () => {
  if (!tenderId) {
    showNotification("Tender ID missing");
    return;
  }

  try {
    const payload = {
      tender_status: "Saved Draft",
      tender_details: {
        ...formData,
        domain: rows.reduce((acc, r) => {
          if (r.industry) {
            if (r.s1) acc.push({ industry: r.industry, sector: r.s1 });
            if (r.s2) acc.push({ industry: r.industry, sector: r.s2 });
          }
          return acc;
        }, []),
      },
    };

    const res = await updateTenderAPI(tenderId, payload);

    if (!res) throw new Error("Update failed");

    updateTender(tenderId, payload);

    showNotification("Draft saved successfully");
    setEditOpen(false);
  } catch (err) {
    console.error("SAVE ERROR:", err);
    showNotification("Failed to save draft");
  }
};

  // ================= FINAL SUBMIT =================
  const handleSubmit = async () => {
    if (!tenderId) {
      showNotification("Tender ID missing");
      return;
    }

    try {
      const payload = {
        tender_status: "Validated",
        tender_details: {
          ...formData,
          domain: rows.reduce((acc, r) => {
            if (r.industry) {
              if (r.s1) acc.push({ industry: r.industry, sector: r.s1 });
              if (r.s2) acc.push({ industry: r.industry, sector: r.s2 });
            }
            return acc;
          }, []),
        },
      };

      const res = await updateTenderAPI(tenderId, payload);

      if (res) {
        updateTender(tenderId, payload);
        showNotification("Tender validated successfully");
        setEditOpen(false);
        navigate(`/tender/${tenderId}`);
      }
    } catch (err) {
      console.error("SUBMIT ERROR:", err);
      showNotification("Submission failed");
    }
  };

  return (
    <Modal open={editOpen} onClose={() => setEditOpen(false)}>
      <Box
        sx={{
          width: "95%",
          maxHeight: "95vh",
          overflow: "auto",
          background: "#e3eef5",
          p: 3,
          borderRadius: 3,
          margin: "20px auto",
        }}
      >
        {/* ================= HEADER ================= */}
        <Box sx={sectionCard}>
          <Typography fontWeight={600} color="#2f4db5">
            Upload Tender Document
          </Typography>

          <Typography fontSize={12} mt={1} color="#555">
            Instruction: Upload complete tender document including GeM Bid Document,
            Buyer Uploaded ATC Document, Corrigendum(s) / Addendum(s) (if any)
          </Typography>

          <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
            <Button
              variant="contained"
              startIcon={<UploadFileIcon />}
              sx={{ background: "#2F4DB5" }}
            >
              Select PDF File(s) to upload
            </Button>

            <Box sx={{ background: "#fff", px: 2, py: 1, borderRadius: 2 }}>
              RFP.pdf ✕
            </Box>
          </Box>
        </Box>

        {/* ================= SALIENT DETAILS ================= */}
        <Box sx={sectionCard}>
          <Typography fontWeight={600} color="#2f4db5" mb={2}>
            Salient Tender Details
          </Typography>

          <Box display="grid" gridTemplateColumns="repeat(4,1fr)" gap={2}>
            <TextField label="Purchase / Service Requisition number(s)*" value={formData.purchase_service_requisition_number} onChange={handleChange("purchase_service_requisition_number")} sx={inputStyle} />
            <TextField label="Tender Number*" value={formData.tender_number} onChange={handleChange("tender_number")} sx={inputStyle} />
            <TextField label="Tender Subject*" value={formData.tender_subject} onChange={handleChange("tender_subject")} sx={inputStyle} />
            <TextField type="date" label="Tender Publishing Date*" InputLabelProps={{ shrink: true }} value={formData.tender_publishing_date} onChange={handleChange("tender_publishing_date")} sx={inputStyle} />

            <TextField type="date" label="Bid Due Date*" InputLabelProps={{ shrink: true }} value={formData.bid_due_date} onChange={handleChange("bid_due_date")} sx={inputStyle} />
            <TextField type="date" label="Bid Opening Date*" InputLabelProps={{ shrink: true }} value={formData.bid_opening_date} onChange={handleChange("bid_opening_date")} sx={inputStyle} />
            <TextField type="date" label="Bid Validity End Date*" InputLabelProps={{ shrink: true }} value={formData.bid_validity_end_date} onChange={handleChange("bid_validity_end_date")} sx={inputStyle} />
          </Box>

          {/* FINANCIAL */}
          <Box display="flex" gap={3} mt={3}>
            <Box flex={1} sx={{ background: "#dde6ec", p: 2, borderRadius: 2 }}>
              <Typography fontSize={13}>Earnest Money Deposit (INR)</Typography>
              <TextField fullWidth value={formData.total_emd} onChange={handleChange("total_emd")} sx={inputStyle} />
              <Button fullWidth sx={{ mt: 1, background: "#2F4DB5", color: "#fff" }}>
                View More
              </Button>
            </Box>

            <Box flex={2} sx={{ background: "#dde6ec", p: 2, borderRadius: 2 }}>
              <Typography fontSize={13}>Financial Criteria (FBEC)</Typography>

              <Box display="flex" gap={2} mt={2}>
                <TextField label="Net Worth (INR)" fullWidth value={formData.net_worth} onChange={handleChange("net_worth")} sx={inputStyle} />
                <TextField label="Average Annual Turnover (INR)" value={formData.avg_annual_turnover} onChange={handleChange("avg_annual_turnover")} fullWidth sx={inputStyle} />
                <TextField label="Working Capital (INR)" value={formData.working_capital} onChange={handleChange("working_capital")} fullWidth sx={inputStyle} />
              </Box>

              <Button sx={{ mt: 2, background: "#2F4DB5", color: "#fff" }}>
                View More
              </Button>
            </Box>
          </Box>

          {/* DROPDOWNS */}
          <Box display="grid" gridTemplateColumns="repeat(3,1fr)" gap={2} mt={3}>
            <TextField select label="MSE Policy" value={formData.mse_policy} onChange={handleChange("mse_policy")} sx={inputStyle}>
              <MenuItem value="Applicable">Applicable</MenuItem>
              <MenuItem value="Not Applicable">Not Applicable</MenuItem>
            </TextField>

            <TextField select label="Make in India Policy" value={formData.make_in_india_policy} onChange={handleChange("make_in_india_policy")} sx={inputStyle}>
              <MenuItem value="Applicable">Applicable</MenuItem>
              <MenuItem value="Not Applicable">Not Applicable</MenuItem>
            </TextField>

            <TextField select label="Evaluation Methodology*" value={formData.evaluation_methodology} onChange={handleChange("evaluation_methodology")} sx={inputStyle}>
              <MenuItem value="Item Basis">Item Basis</MenuItem>
              <MenuItem value="Group Basis">Group Basis</MenuItem>
              <MenuItem value="Overall">Overall</MenuItem>
            </TextField>
          </Box>
        </Box>

        {/* ================= STARTUP ================= */}
        <Box sx={sectionCard}>
          <Typography fontWeight={600} color="#2f4db5">
            Startup Criteria
          </Typography>

          {rows.map((r, i) => (
            <Box key={i} display="flex" gap={2} mt={2} alignItems="center">
              <TextField label="Industry" fullWidth value={r.industry} onChange={(e) => {
                const newRows = [...rows];
                newRows[i].industry = e.target.value;
                setRows(newRows);
              }} sx={inputStyle} />
              <TextField label="Sector 1" fullWidth value={r.s1} onChange={(e) => {
                const newRows = [...rows];
                newRows[i].s1 = e.target.value;
                setRows(newRows);
              }} sx={inputStyle} />
              <TextField label="Sector 2" fullWidth value={r.s2} onChange={(e) => {
                const newRows = [...rows];
                newRows[i].s2 = e.target.value;
                setRows(newRows);
              }} sx={inputStyle} />

              <IconButton onClick={() => removeRow(i)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Box>
          ))}

          <Box display="flex" justifyContent="flex-end">
            <Button onClick={addRow} sx={{ mt: 2, background: "#2F4DB5", color: "#fff" }}>
              + Add
            </Button>
          </Box>
        </Box>

        {/* ================= PARAMETERS ================= */}
        {/* <Box sx={sectionCard}>
          <Typography fontWeight={600} color="#2f4db5">
            Upload Tender Document
          </Typography>

          <Typography fontSize={12} color="#555" mt={1}>
            Insert additional Tender specific parameter(s)
          </Typography>

          <Box display="flex" gap={2} mt={2}>
            <TextField placeholder="Parameter Name" fullWidth sx={inputStyle} />
            <TextField placeholder="Parameter Description" fullWidth sx={inputStyle} />
            <TextField placeholder="Parameter Type" fullWidth sx={inputStyle} />

            <Button onClick={addParam} sx={{ background: "#2F4DB5", color: "#fff" }}>
              + Add
            </Button>
          </Box>

          {params.map((p, i) => (
            <Box key={i} display="flex" justifyContent="space-between" mt={2} sx={{ background: "#fff", p: 2, borderRadius: 2 }}>
              <Typography fontSize={12}>
                Lorem Ipsum...
              </Typography>

              <Box>
                <IconButton>✎</IconButton>
                <IconButton onClick={() => removeParam(i)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box> */}

        {/* ================= BULK UPLOAD ================= */}
        <Box sx={sectionCard}>
          <Typography fontWeight={600} color="#2f4db5">
            Bulk Upload Bids
          </Typography>

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Box>
              <Button
                onClick={() => setCbaUploadOpen(true)}
                // component="label"
                startIcon={<UploadFileIcon />}
                sx={{ background: "#2F4DB5", color: "#fff" }}
              >
                Select Folder or Zip File
                {/* <input hidden type="file" onChange={handleZip} /> */}
              </Button>

              {zipFile && <Typography mt={1}>{zipFile.name}</Typography>}
            </Box>

            <Box display="flex" gap={2}>
              <Button>Reset</Button>
              <Button onClick={handleSaveDraft}>Save Draft</Button>
              <Button variant="contained" onClick={handleSubmit} 
              disabled={!isCbaReady} 
                sx={{ background: isCbaReady ? "#2F4DB5" : "#cccccc",
                      "&:disabled": {background: "#cccccc", color: "#666"}
                 }}>
                Validate and Save Tender
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditTenderModal;