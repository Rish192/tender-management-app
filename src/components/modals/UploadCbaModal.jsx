import { Modal, Box, IconButton, Typography, Button, CircularProgress } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { useUI } from "../../store/uiStore";
import { uploadCBAAPI } from "../../api/tenderApi";

const UploadCbaModal = () => {
    const {cbaUploadOpen, setCbaUploadOpen, showNotification, selectedTenderId, isUploadingCba, setIsUploadingCba} = useUI();
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
            setFile(droppedFile);
        }
        else {
            showNotification("Only PDF files are supported");
        }
    };

    const handleBrowse = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            showNotification("Please select a folder or zip file");
            return;
        }
        setIsUploadingCba(true);
        try {
            const res = await uploadCBAAPI(selectedTenderId, file);
            if (res.status === "success" || res) {
                console.log("Uploaded successfully");
                showNotification("CBA upload successful");
            } else {
                console.log("Not uploaded");
            }
            setCbaUploadOpen(false);
            setFile(null);
        } catch (err) {
            console.error("CBA Upload error: ", err);
            showNotification("CBA upload failed");
        } finally {
            setIsUploadingCba(false);
        }
    };

    return (
        <Modal open={cbaUploadOpen} onClose={() => {
            setCbaUploadOpen(false);
            if (!isUploadingCba) {
                setFile(null);
            }
        }}>
            <Box sx={{
                width: '30.208vw',
                background: "#f5f7fb",
                p: '1.25vw',
                borderRadius: 3,
                margin: "120px auto",
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                position: "relative",
            }}>
                {isUploadingCba && (
                    <Box sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(245, 247, 251, 0.7)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 10,
                        backdropFilter: "blur(2px)"
                    }}>
                        <CircularProgress size={'2.6042vw'} sx={{ color: "#2563eb" }} />
                        <Typography mt={'0.8333vw'} fontSize={'0.8333vw'} fontWeight={500} color="#2563eb">
                            Uploading Bids...
                        </Typography>
                    </Box>
                )}

                <Typography fontSize={'0.9375vw'} fontWeight={600} mb={'0.8333vw'}>Bulk Upload Bids (CBA)</Typography>

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
                    }}>
                        <CloudUploadIcon sx={{ fontSize: '1.8750vw', color: "#3b82f6", transform: dragActive ? "scale(1.1)" : "scale(1)", transition: "transform 0.2s" }} />
                        <Typography fontSize={'0.8333vw'} mt={'0.4167vw'} color="#6b7280">
                            Drag & Drop ZIP or <label htmlFor="cbaUpload" style={{ color: "#2563eb", cursor: "pointer", fontWeight: 500 }}>Browse</label>
                        </Typography>
                        <input id="cbaUpload" type="file" onChange={handleBrowse} style={{ display: "none" }} />
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

                <Box display="flex" justifyContent="flex-end" mt={'1.25vw'}>
                    <Button onClick={handleUpload} variant="contained" sx={{ background: "#2563eb", textTransform: "none", px: '1.25vw', fontSize: '0.8333vw', borderRadius: 2 }}>
                        Upload
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default UploadCbaModal;