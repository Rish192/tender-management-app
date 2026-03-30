import { Modal, Box, Typography, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { useUI } from "../../store/uiStore";
import { uploadCBAAPI } from "../../api/tenderApi";

const UploadCbaModal = () => {
    const {cbaUploadOpen, setCbaUploadOpen, showNotification, selectedTenderId} = useUI();
    const [file, setFile] = useState(null);

    const handleDrop = (e) => {
        e.preventDefault();
        setFile(e.dataTransfer.files[0]);
    };

    const handleBrowse = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            showNotification("Please select a folder or zip file");
            return;
        }

        try {
            const res = await uploadCBAAPI(selectedTenderId, file);
            if (res.status === "success" || res) {
                showNotification("CBA upload successful");
            }
            setCbaUploadOpen(false);
            setFile(null);
        } catch (err) {
            console.error("CBA Upload error: ", err);
            showNotification("CBA upload failed");
        }
    };

    return (
        <Modal open={cbaUploadOpen} onClose={() => setCbaUploadOpen(false)}>
            <Box sx={{
                width: 480,
                background: "#f5f7fb",
                p: 3,
                borderRadius: 3,
                margin: "120px auto",
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            }}>
                <Typography fontWeight={600} mb={2}>Bulk Upload Bids (CBA)</Typography>

                <Box onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}
                    sx={{
                        border: "2px dashed #3b82f6",
                        borderRadius: 2,
                        height: 160,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#eef2ff",
                    }}>
                        <CloudUploadIcon sx={{ fontSize: 32, color: "#3b82f6" }} />
                        <Typography fontSize={13} mt={1} color="#6b7280">
                            Drag & Drop ZIP or <label htmlFor="cbaUpload" style={{ color: "#2563eb", cursor: "pointer", fontWeight: 500 }}>Browse</label>
                        </Typography>
                        <input id="cbaUpload" type="file" onChange={handleBrowse} style={{ display: "none" }} />
                </Box>

                {file && <Typography mt={1} fontSize={12}>Selected: {file.name}</Typography>}

                <Box display="flex" justifyContent="flex-end" mt={3}>
                    <Button onClick={handleUpload} variant="contained" sx={{ background: "#2563eb", textTransform: "none", px: 3, borderRadius: 2 }}>
                        Upload
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default UploadCbaModal;