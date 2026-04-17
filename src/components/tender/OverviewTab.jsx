import { Box, Typography } from "@mui/material";
import PieChart from "../charts/PieChart";
import BarChart from "../charts/BarChart";
import { useEffect, useState } from 'react';
import { getTenderCBAAPI, getTenderDetailsAPI } from "../../api/tenderApi";

const OverviewTab = ({ tender }) => {
  const [biddersCount, setBiddersCount] = useState(0);
  const [tenderDetails, setTenderDetails] = useState(tender || {});

  useEffect(() => {
    const fetchBiddersAndDetails = async() => {
      if (tender?.tender_id) {
        try {
          const [cbaData, detailsData] = await Promise.all([
            getTenderCBAAPI(tender.tender_id),
            getTenderDetailsAPI(tender.tender_id)
          ]);
          
          if (Array.isArray(cbaData)) {
            setBiddersCount(cbaData.length);
          }
          if (detailsData && detailsData.tender_details) {
            setTenderDetails({ ...tender, ...detailsData.tender_details });
          }
        } catch (error) {
          console.error("Error fetching overview data", error);
        }
      }
    };
    fetchBiddersAndDetails();
  }, [tender?.tender_id]);

  const calculateRemainingDays = (validityDateStr) => {
    if (!validityDateStr) return "N/A";

    const strVal = String(validityDateStr).trim();

    // If it doesn't include a hyphen, it might already be days (e.g., "90" or "90 Days")
    if (!strVal.includes("-")) {
      return isNaN(Number(strVal)) ? strVal : `${strVal} Days`;
    }

    const today = new Date();
    const parts = strVal.split("-");

    let formattedDate;
    if (parts[2] && parts[2].length === 4) {
      // Format: DD-MM-YYYY
      formattedDate = new Date(parts[2], parts[1] - 1, parts[0]);
    } else if (parts[0] && parts[0].length === 4) {
      // Format: YYYY-MM-DD
      formattedDate = new Date(parts[0], parts[1] - 1, parts[2]);
    } else {
      // Fallback
      formattedDate = new Date(strVal);
    }

    const validityDate = new Date(formattedDate);

    if (isNaN(validityDate)) return "Invalid Date";

    const diffInMs = validityDate - today;
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays < 0) return "Expired";
    return `${diffInDays} Days`;
  };
  
  return (
    <Box sx={{height: '100%', display: 'flex', flexDirection: 'column', gap: '2.0833vw' }}>

      {/* ================= TOP ================= */}
      <Box display="flex" gap={'1.667vw'}>

        {/* LEFT */}
        <Box flex={1}>
          <SectionTitle title="CBA Status" />

          <Box display="flex" alignItems="center" gap={'1.667vw'} mt={'0.8333vw'}>
            <PieChart totalBidders={biddersCount}/>

            {/* LEGENDS */}
            {/* <Box display="flex" flexDirection="column" gap={2}>
              <Legend color="#2F4DB5" label="Acceptable" />
              <Legend color="#14b8a6" label="Non-Acceptable" />
              <Legend color="#0ea5e9" label="Queries Raised" />
            </Box> */}
          </Box>
        </Box>

        {/* RIGHT */}
        <Box flex={1.5}>
          <SectionTitle title="Tender Overview" />

          <Box display="grid" gridTemplateColumns="repeat(3,1fr)" gap={'0.8333vw'} mt={'0.8333vw'}>
            <Card label="Tender Number" value={tenderDetails?.tender_number || ""} />
            <Card label="Bid Opening Date" value={tenderDetails?.bid_opening_date || ""} />
            <Card label="Bid Due Date" value={tenderDetails?.bid_due_date || ""} />
            <Card label="Bid Validity Date" value={tenderDetails?.bid_validity_end_date || tenderDetails?.Validity || ""} />
            <Card label="Remaining Bid Validity" value={calculateRemainingDays(tenderDetails?.bid_validity_end_date || tenderDetails?.Validity)} />
            <Card label="Number of Bids" value={biddersCount} />
          </Box>
        </Box>
      </Box>

      {/* ================= BOTTOM ================= */}
      <Box sx={{flex: 1}}>
      <SectionTitle title="Tender Status" />

      <Box
          mt={'0.8333vw'}
          sx={{
          background: "#eef2f7",
          borderRadius: "16px",
          p: '1.25vw',
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
      >
          <Box display="flex" alignItems="stretch">
            <BarChart title="Net Worth Status" />
            <Divider />

            <BarChart title="Average Annual Turnover Status" />
            <Divider />

            <BarChart title="Working Capital Status" />
          </Box>
      </Box>
      </Box>
    </Box>
  );
};

export default OverviewTab;


/* ---------- UI HELPERS ---------- */

const SectionTitle = ({ title }) => (
  <Box>
    <Typography fontWeight={600} fontSize={'0.9375vw'} color="#1f3a8a">
      {title}
    </Typography>
    <Box
      mt={'0.2083vw'}
      sx={{
        height: '0.1042vw',
        width: "60%",
        background: "#cbd5e1",
      }}
    />
  </Box>
);

const Card = ({ label, value }) => (
  <Box
    sx={{
      background: "#ffffff",
      borderRadius: 3,
      p: '0.8333vw',
      boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
    }}
  >
    <Typography fontSize={'0.625vw'} color="#6b7280">
      {label}
    </Typography>

    <Typography fontSize={'1.0417vw'} fontWeight={600} mt={'0.2083vw'} color="#1e3a8a">
      {value}
    </Typography>
  </Box>
);

const Divider = () => (
  <Box
    sx={{
      width: '0.1042vw',
      background: "#d1d5db",
      mx: '0.8333vw',
    }}
  />
);

const Legend = ({ color, label }) => (
  <Box
    display="flex"
    alignItems="center"
    gap={'0.4167vw'}
    sx={{
      background: "#ffffff",
      px: '0.8333vw',
      py: '0.4167vw',
      borderRadius: 2,
      boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    }}
  >
    <Box
      sx={{
        width: '0.625vw',
        height: '0.625vw',
        background: color,
        borderRadius: 1,
      }}
    />
    <Typography fontSize={'0.7292vw'}>{label}</Typography>
  </Box>
);