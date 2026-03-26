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

// 🔥 API IMPORTS
import {
  updateTenderAPI,
  uploadCBAAPI,
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
    selectedTenderId, // 👈 must exist in UI store
  } = useUI();

  const { updateTender } = useTenderStore();

  const [tenderId, setTenderId] = useState(null);
  const [zipFile, setZipFile] = useState(null);

  const [rows, setRows] = useState([
    { industry: "", s1: "", s2: "" },
  ]);

  const [params, setParams] = useState([]);

  // ================= INIT =================
  useEffect(() => {
    if (editOpen && selectedTenderId) {
      setTenderId(selectedTenderId);
    }
  }, [editOpen, selectedTenderId]);

  // ================= HANDLERS =================
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
      id: tenderId,
      industries: rows,
      parameters: params,
      status: "Draft",
    };

    const res = await updateTenderAPI(payload);

    if (!res) throw new Error();
          // 🔥 update UI also
      updateTender(tenderId, payload);

    showNotification("Tender Status Updated");
    setEditOpen(false);
  } catch (err) {
    console.error("SAVE ERROR:", err);
    showNotification("Save failed");
  }
};

  // ================= FINAL SUBMIT =================
  const handleSubmit = async () => {
    if (!tenderId) {
      showNotification("Tender ID missing");
      return;
    }

    if (!zipFile) {
      showNotification("Upload ZIP file");
      return;
    }

    try {
      // ✅ simulate upload
      await uploadCBAAPI(tenderId, zipFile);

      // ✅ directly mark READY (no backend flow)
      const payload = {
        id: tenderId,
        status: "Ready",
      };

      await updateTenderAPI(payload);

      // 🔥 update UI instantly
      updateTender(tenderId, payload);

      showNotification("Tender validated successfully");

      setEditOpen(false);
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
            <TextField label="Purchase / Service Requisition number(s)*" sx={inputStyle} />
            <TextField label="Tender Number*" defaultValue="643647" sx={inputStyle} />
            <TextField label="Tender Subject*" sx={inputStyle} />
            <TextField type="date" label="Tender Publishing Date*" InputLabelProps={{ shrink: true }} sx={inputStyle} />

            <TextField type="date" label="Bid Due Date*" InputLabelProps={{ shrink: true }} sx={inputStyle} />
            <TextField type="date" label="Bid Opening Date*" InputLabelProps={{ shrink: true }} sx={inputStyle} />
            <TextField type="date" label="Bid Validity End Date*" InputLabelProps={{ shrink: true }} sx={inputStyle} />
          </Box>

          {/* FINANCIAL */}
          <Box display="flex" gap={3} mt={3}>
            <Box flex={1} sx={{ background: "#dde6ec", p: 2, borderRadius: 2 }}>
              <Typography fontSize={13}>Earnest Money Deposit (INR)</Typography>
              <TextField fullWidth defaultValue="5000000" sx={inputStyle} />
              <Button fullWidth sx={{ mt: 1, background: "#2F4DB5", color: "#fff" }}>
                View More
              </Button>
            </Box>

            <Box flex={2} sx={{ background: "#dde6ec", p: 2, borderRadius: 2 }}>
              <Typography fontSize={13}>Financial Criteria (FBEC)</Typography>

              <Box display="flex" gap={2} mt={2}>
                <TextField label="Net Worth (INR)" fullWidth sx={inputStyle} />
                <TextField label="Average Annual Turnover (INR)" fullWidth sx={inputStyle} />
                <TextField label="Working Capital (INR)" fullWidth sx={inputStyle} />
              </Box>

              <Button sx={{ mt: 2, background: "#2F4DB5", color: "#fff" }}>
                View More
              </Button>
            </Box>
          </Box>

          {/* DROPDOWNS */}
          <Box display="grid" gridTemplateColumns="repeat(3,1fr)" gap={2} mt={3}>
            <TextField select label="MSE Policy" sx={inputStyle}>
              <MenuItem>Applicable</MenuItem>
              <MenuItem>Not Applicable</MenuItem>
            </TextField>

            <TextField select label="Make in India Policy" sx={inputStyle}>
              <MenuItem>Applicable</MenuItem>
              <MenuItem>Not Applicable</MenuItem>
            </TextField>

            <TextField select label="Evaluation Methodology*" sx={inputStyle}>
              <MenuItem>Item Basis</MenuItem>
              <MenuItem>Group Basis</MenuItem>
              <MenuItem>Overall</MenuItem>
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
              <TextField label="Industry" fullWidth sx={inputStyle} />
              <TextField label="Sector 1" fullWidth sx={inputStyle} />
              <TextField label="Sector 2" fullWidth sx={inputStyle} />

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
        <Box sx={sectionCard}>
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
        </Box>

        {/* ================= BULK UPLOAD ================= */}
        <Box sx={sectionCard}>
          <Typography fontWeight={600} color="#2f4db5">
            Bulk Upload Bids
          </Typography>

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Box>
              <Button
                component="label"
                startIcon={<UploadFileIcon />}
                sx={{ background: "#2F4DB5", color: "#fff" }}
              >
                Select Folder or Zip File
                <input hidden type="file" onChange={handleZip} />
              </Button>

              {zipFile && <Typography mt={1}>{zipFile.name}</Typography>}
            </Box>

            <Box display="flex" gap={2}>
              <Button>Reset</Button>
              <Button onClick={handleSaveDraft}>Save Draft</Button>
              <Button variant="contained" onClick={handleSubmit} sx={{ background: "#2F4DB5" }}>
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