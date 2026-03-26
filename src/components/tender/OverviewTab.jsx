import { Box, Typography } from "@mui/material";
import PieChart from "../charts/PieChart";
import BarChart from "../charts/BarChart";

const OverviewTab = ({ tender }) => {
  return (
    <Box>

      {/* ================= TOP ================= */}
      <Box display="flex" gap={4}>

        {/* LEFT */}
        <Box flex={1}>
          <SectionTitle title="CBA Status" />

          <Box display="flex" alignItems="center" gap={4} mt={2}>
            <PieChart />

            {/* LEGENDS */}
            <Box display="flex" flexDirection="column" gap={2}>
              <Legend color="#2F4DB5" label="Acceptable" />
              <Legend color="#14b8a6" label="Non-Acceptable" />
              <Legend color="#0ea5e9" label="Queries Raised" />
            </Box>
          </Box>
        </Box>

        {/* RIGHT */}
        <Box flex={1.5}>
          <SectionTitle title="Tender Overview" />

          <Box display="grid" gridTemplateColumns="repeat(3,1fr)" gap={2} mt={2}>
            <Card label="Tender Number" value={tender?.number || "52194"} />
            <Card label="Bid Opening Date" value="16-10-2025" />
            <Card label="Bid Due Date" value={tender?.dueDate || "15-03-2026"} />
            <Card label="Bid Validity Date" value={tender?.validityEnd || "25-06-2026"} />
            <Card label="Remaining Bid Validity" value="02 Days" />
            <Card label="Number of Bids" value="279" />
          </Box>
        </Box>
      </Box>

     {/* ================= BOTTOM ================= */}
    <Box mt={5}>
    <SectionTitle title="Tender Status" />

    <Box
        mt={2}
        sx={{
        background: "#eef2f7",
        borderRadius: "16px",
        p: 3,
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
    <Typography fontWeight={600} fontSize={16} color="#1f3a8a">
      {title}
    </Typography>
    <Box
      mt={0.5}
      sx={{
        height: 2,
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
      p: 2,
      boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
    }}
  >
    <Typography fontSize={12} color="#6b7280">
      {label}
    </Typography>

    <Typography fontSize={20} fontWeight={600} mt={0.5} color="#1e3a8a">
      {value}
    </Typography>
  </Box>
);

const Divider = () => (
  <Box
    sx={{
      width: "1px",
      background: "#d1d5db",
      mx: 2,
    }}
  />
);

const Legend = ({ color, label }) => (
  <Box
    display="flex"
    alignItems="center"
    gap={1}
    sx={{
      background: "#ffffff",
      px: 2,
      py: 1,
      borderRadius: 2,
      boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    }}
  >
    <Box
      sx={{
        width: 10,
        height: 10,
        background: color,
        borderRadius: 1,
      }}
    />
    <Typography fontSize={12}>{label}</Typography>
  </Box>
);