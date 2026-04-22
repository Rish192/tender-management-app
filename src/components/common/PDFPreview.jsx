// src/components/common/PDFPreview.jsx

import { Box, IconButton, Typography, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useState, useEffect} from "react";
import axios from "axios";

const PDFPreview = ({ open, onClose, data }) => {
  const [blobUrl, setBlobUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const pdfUrl = data.url ? `${data.url}#page=${data.page || 1}` : "";

  useEffect(() => {
    const loadPdf = async () => {
      if (!open || !data.url) return;
      setLoading(true);

      try {
        const response = await axios.get(data.url, {
          responseType: "blob"
        });
        const url = URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
        setBlobUrl(`${url}#page=${data.page || 1}`);
      } catch (err) {
        console.error("PDF load error: ", err);
      } finally {
        setLoading(false);
      }
    };
    loadPdf();

    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl.split('#')[0]);
        setBlobUrl("");
      }
    };
  }, [open, data.url, data.page]);

  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "40%",
        height: "100vh",
        background: "#eaf1f6",
        boxShadow: "-10px 0 40px rgba(0,0,0,0.3)",
        zIndex: 1200,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <Box sx={{p: '0.8333vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography fontWeight={600} fontSize={'0.9375vw'}>
          Preview Window
        </Typography>

        <IconButton onClick={onClose} sx={{ background: "#ef4444", color: "#fff", p: '0.4167vw' }}>
          <CloseIcon sx={{fontSize: '0.8333vw'}}/>
        </IconButton>
      </Box>

      {/* PDF */}
      <Box flex={1} display="flex" justifyContent="center" alignItems="center" bgcolor="#525659">
        {loading ? (
          <CircularProgress color="inherit" />
        ) : blobUrl ? (
          <iframe key={`${data.url}-${data.page}`} src={blobUrl} width="100%" height="100%" style={{ border: "none" }} />
        ) : (
          <Typography color="#fff">Failed to load preview</Typography>
        )}
      </Box>

      {/* FOOTER */}
      <Box p={'0.8333vw'}>
        <Box
          sx={{
            background: "#2F4DB5",
            color: "#fff",
            textAlign: "center",
            py: '0.4167vw',
            borderRadius: 2,
            fontSize: '0.8333vw'
          }}
        >
          {`${data.fileName}`}
        </Box>
      </Box>
    </Box>
  );
};

export default PDFPreview;