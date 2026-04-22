import { Box, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTenderCBAAPI, getTenderCBADetailAPI } from "../../api/tenderApi";

const columns = [
  { label: "Bid Validity", key: "bid_validity" },
  { label: "Payment Terms", key: "payment_terms" },
  { label: "Contract Period", key: "contract_period" },
  { label: "Terms and Conditions", key: "terms_and_condition" },
  { label: "GST", key: "gst" }
];

const ComparativeTab = () => {
  const { id } = useParams();
  const [biddersData, setBiddersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const cbaData = await getTenderCBAAPI(id);
        if (Array.isArray(cbaData)) {
          const biddersPromises = cbaData.map(async (item) => {
            const rawName = item.vendor_name || "Unknown";
            const bidderName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
            const bidId = item.bid_id;

            const values = {};
            let isApplicable = true;

            for (const col of columns) {
              const res = await getTenderCBADetailAPI(id, bidId, col.key);
              let valStr = "N/A";
              if (res && res.property_value !== null && res.property_value !== undefined) {
                const val = res.property_value;
                if (Array.isArray(val)) {
                  valStr = val.length > 0 ? val.join(", ") : "N/A";
                } else if (typeof val === "boolean") {
                  valStr = val ? "True" : "False";
                } else if (typeof val === "object") {
                  valStr = val.name || JSON.stringify(val);
                } else {
                  valStr = val.toString().trim() === "" ? "N/A" : val.toString();
                }
              }

              if (valStr === "N/A" || valStr === "") {
                isApplicable = false;
              }
              values[col.key] = valStr;
            }

            return {
              bidId,
              name: bidderName,
              values,
              status: isApplicable ? "Applicable" : "Not Applicable"
            };
          });

          const results = await Promise.all(biddersPromises);
          setBiddersData(results);
        }
      } catch (err) {
        console.error("Error fetching comparative data", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <Box mt={'1.0417vw'} p={'1.25vw'} display="flex" alignItems="center">
        <CircularProgress size={'1.25vw'} sx={{ mr: '0.8333vw' }} />
        <Typography>Loading Comparative Analysis...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: '1.25vw', overflow: 'hidden'}}>
      <SectionTitle title="Comparative Analysis" />

      {/* TABLE */}
      <Box sx={{
        borderRadius: 2,
        overflow: "auto",
        border: "1px solid #e5e7eb",
        background: "#fff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
      }}>
        <Box sx={{ minWidth: "max-content" }}>
          {/* HEADER */}
          <Box
            display="flex"
            sx={{
              background: "#2F4DB5",
              color: "#fff",
              fontSize: '0.7292vw',
              fontWeight: 500
            }}
          >
            <Box flex={1.5} minWidth={'5.2083'} px={'0.8333vw'} py={'0.625vw'} sx={{ borderRight: "1px solid rgba(255,255,255,0.2)" }}>
              Bidder Name
            </Box>
            {columns.map(col => (
              <Box key={col.key} flex={1} minWidth={'6.25vw'} px={'0.8333vw'} py={'0.625vw'} sx={{ borderRight: "1px solid rgba(255,255,255,0.2)" }}>
                {col.label}
              </Box>
            ))}
            <Box flex={1} minWidth={'6.25vw'} px={'0.8333vw'} py={'0.625vw'}>
              Status
            </Box>
          </Box>

          {/* ROWS */}
          {biddersData.length === 0 ? (
            <Box p={'1.25vw'} textAlign="center" color="#666" fontSize={'0.7292vw'}>No bidders found.</Box>
          ) : (
            biddersData.map((b, i) => (
              <Box
                key={b.bidId || i}
                display="flex"
                sx={{
                  background: i % 2 === 0 ? "#f8fafc" : "#ffffff",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <Box flex={1.5} minWidth={'8.333vw'} px={'0.8333vw'} py={'0.625vw'} fontWeight={500} sx={{ fontSize: '0.8333vw', borderRight: "1px solid #e5e7eb" }}>
                  {b.name}
                </Box>
                {columns.map(col => (
                  <Box key={col.key} flex={1} minWidth={'6.25vw'} px={'0.8333vw'} py={'0.625vw'} sx={{ fontSize: '0.7292vw', borderRight: "1px solid #e5e7eb" }}>
                    {b.values[col.key]}
                  </Box>
                ))}
                <Box
                  flex={1}
                  minWidth={'6.25vw'}
                  px={'0.8333vw'}
                  py={'0.625vw'}
                  fontWeight={600}
                  fontSize={'0.7292vw'}
                  color={b.status === "Applicable" ? "green" : "red"}
                >
                  {b.status}
                </Box>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ComparativeTab;

/* ---------- UI HELPERS ---------- */

const SectionTitle = ({ title }) => (
  <Box sx={{flex: 0.5}}>
    <Typography fontWeight={600} fontSize={'0.9375vw'} color="#1f3a8a">
      {title}
    </Typography>
    <Box
      mt={'0.2083vw'}
      sx={{
        height: '0.1042vw',
        width: "25%",
        background: "#cbd5e1",
      }}
    />
  </Box>
);