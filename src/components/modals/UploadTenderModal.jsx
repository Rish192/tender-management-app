import {
  Modal,
  Box,
  Typography,
  Button,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { useUI } from "../../store/uiStore";
import { useTenderStore } from "../../store/tenderStore";
import { addTenderAPI, getTenderListAPI } from "../../api/tenderApi";

const UploadTenderModal = () => {
  const { uploadOpen, setUploadOpen, showNotification } = useUI();
  const { setTenders } = useTenderStore(); // ✅ IMPORTANT

  const [file, setFile] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleBrowse = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      showNotification("Please select a file");
      return;
    }

    try {
      // ✅ Save to localStorage (mock API)
      await addTenderAPI(file);

      showNotification("Document upload queue initiated successfully");

      // ✅ Refresh list from storage
      const data = await getTenderListAPI();
      setTenders(data);

      setUploadOpen(false);
      setFile(null);

      // 🟢 Simulate extraction → update status later
      setTimeout(async () => {
        showNotification("Tender extracted successfully");

        const latest = await getTenderListAPI();

        // update last added tender to Draft
        const updated = latest.map((t, i) =>
          i === 0 ? { ...t, status: "Draft" } : t
        );

        localStorage.setItem("tenders_db", JSON.stringify(updated));
        setTenders(updated);

      }, 4000);

    } catch (err) {
      console.error(err);
      showNotification("Upload failed");
    }
  };

  return (
    <Modal open={uploadOpen} onClose={() => setUploadOpen(false)}>
      <Box
        sx={{
          width: 480,
          background: "#f5f7fb",
          p: 3,
          borderRadius: 3,
          margin: "120px auto",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        }}
      >
        <Typography fontWeight={600} mb={2}>
          Upload file
        </Typography>

        <Box
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          sx={{
            border: "2px dashed #3b82f6",
            borderRadius: 2,
            height: 160,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#eef2ff",
            textAlign: "center",
          }}
        >
          <CloudUploadIcon sx={{ fontSize: 32, color: "#3b82f6" }} />

          <Typography fontSize={13} mt={1} color="#6b7280">
            Drag & Drop your files or{" "}
            <label
              htmlFor="fileUpload"
              style={{
                color: "#2563eb",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Browse
            </label>
          </Typography>

          <input
            id="fileUpload"
            type="file"
            onChange={handleBrowse}
            style={{ display: "none" }}
          />
        </Box>

        {file && (
          <Typography mt={1} fontSize={12}>
            Selected: {file.name}
          </Typography>
        )}

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography fontSize={11} color="#6b7280">
            Supported formats: PNG, JPG, PDF, MP4
          </Typography>

          <Typography fontSize={11} color="#6b7280">
            Max size: 25MB
          </Typography>
        </Box>

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button
            onClick={handleUpload}
            variant="contained"
            sx={{
              background: "#2563eb",
              textTransform: "none",
              px: 3,
              borderRadius: 2,
            }}
          >
            Upload
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UploadTenderModal;