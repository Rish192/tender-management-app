import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  CircularProgress
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { useUI } from "../../store/uiStore";
import { useTenderStore } from "../../store/tenderStore";
import { addTenderAPI, getTenderListAPI } from "../../api/tenderApi";

const UploadTenderModal = () => {
  const { uploadOpen, setUploadOpen, showNotification, isUploadingTender, setIsUploadingTender } = useUI();
  const { setTenders } = useTenderStore(); // ✅ IMPORTANT

  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
      }
      else {
        showNotification("Only PDF files are supported");
      }
    }
  };

  const handleBrowse = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    console.log("Upload clicked");
    if (!file) {
      showNotification("Please select a file");
      return;
    }
    setIsUploadingTender(true);
    try {
      const res = await addTenderAPI(file);

      if (res.status === "success") {
        showNotification("Document upload queue initiated successfully");
      } else {
        console.log("Upload failed");
      }

      const data = await getTenderListAPI();
      setTenders(data || []);

      setUploadOpen(false);
      setFile(null);

    } catch (err) {
      console.error("Upload error: ", err);
      const errorMsg = err.response?.data?.detail?.[0]?.msg || "Upload failed";
      showNotification(errorMsg);
    } finally { 
      setIsUploadingTender(false);
    }
  };

  return (
    <Modal open={uploadOpen} onClose={() => {
      setUploadOpen(false);
      // Clean up file only if we are completely done/aborted
      if (!isUploadingTender) {
        setFile(null);
      }
    }}>
      <Box
        sx={{
          width: '30.208vw',
          background: "#f5f7fb",
          p: '1.25vw',
          borderRadius: 3,
          margin: "120px auto",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          position: "relative",
        }}
      >
        {isUploadingTender && (
          <Box sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(245, 247, 251, 0.7)", // Semi-transparent matching bg
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
              backdropFilter: "blur(2px)"
          }}>
              <CircularProgress size={'2.6042vw'} sx={{ color: "#2563eb" }} />
              <Typography mt={'0.8333vw'} fontSize={'0.8333vw'} fontWeight={500} color="#2563eb">
                Uploading Tender...
              </Typography>
          </Box>
        )}
        <Typography fontSize={'0.9375vw'} fontWeight={600} mb={'0.8333vw'}>
          Upload file
        </Typography>

        <Box
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          sx={{
            border: dragActive ? "2px solid #2563eb" : "2px dashed #3b82f6",
            borderRadius: 2,
            height: '10.417vw',
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: dragActive ? "#dbeafe" : "#eef2ff",
            textAlign: "center",
            transition: "all 0.2s ease-in-out",
          }}
        >
          <CloudUploadIcon sx={{ fontSize: '1.8750vw', color: "#3b82f6", transform: dragActive ? "scale(1.1)" : "scale(1)", transition: "transform 0.2s" }} />

          <Typography fontSize={'0.8333vw'} mt={'0.4167vw'} color="#6b7280">
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
            accept=".pdf"
            onChange={handleBrowse}
            style={{ display: "none" }}
          />
        </Box>

        {file && (
          <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '1vh'}}>
          <Typography fontSize={'0.7292vw'}>
            Selected: {file.name}
          </Typography>
          <IconButton onClick={() => setFile(null)} sx={{ color: "#ef4444" }}>
            <DeleteIcon sx={{fontSize: '1.0417vw'}}/>
          </IconButton>
          </Box>
        )}

        <Box display="flex" justifyContent="space-between" mt={'0.8333vw'}>
          <Typography fontSize={'0.625vw'} color="#6b7280">
            Supported format: PDF
          </Typography>
        </Box>

        <Box display="flex" justifyContent="flex-end" mt={'1.25vw'}>
          <Button
            onClick={handleUpload}
            variant="contained"
            sx={{
              background: "#2563eb",
              textTransform: "none",
              px: '1.25vw',
              fontSize: '0.8333vw',
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