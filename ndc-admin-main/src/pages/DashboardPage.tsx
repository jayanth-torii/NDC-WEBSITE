import { Alert, Paper, Typography } from "@mui/material";

export function DashboardPage() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Welcome
      </Typography>
      <Typography variant="body1" gutterBottom>
        Use the left navigation to edit any page on the public NDC site. Changes save immediately to the live
        database — the public site picks them up on its next revalidation (or immediately once the on-demand
        revalidate hook is wired up on the frontend).
      </Typography>
      <Alert severity="info" sx={{ mt: 2 }}>
        Most pages use a raw JSON editor for now (every field on the public page is a key somewhere in that JSON).
        Blog Posts and the Department Details Editor have full form-based editors. More dedicated forms can be added
        incrementally without changing the backend.
      </Alert>
    </Paper>
  );
}
