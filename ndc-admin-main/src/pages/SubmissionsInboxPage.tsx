import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Chip, Paper, Stack, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  getApplyNowSubmissions,
  getContactUsSubmissions,
  markApplyNowRead,
  markContactUsRead,
} from "../services/data.service";

export function SubmissionsInboxPage() {
  const { kind } = useParams<{ kind: "apply-now-forms" | "contact-us-forms" }>();
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    const res =
      kind === "apply-now-forms" ? await getApplyNowSubmissions(1, 100) : await getContactUsSubmissions(1, 100);
    setRows(res.data);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind]);

  const isApplyNow = kind === "apply-now-forms";

  const columns: GridColDef[] = [
    { field: "fullName", headerName: "Name", width: 180 },
    { field: "email", headerName: "Email", width: 220 },
    { field: isApplyNow ? "phoneNumber" : "mobileNumber", headerName: "Phone", width: 140 },
    ...(isApplyNow
      ? [{ field: "course", headerName: "Course", width: 160 } as GridColDef]
      : [
          { field: "subjectOfInterest", headerName: "Subject", width: 160 } as GridColDef,
          { field: "message", headerName: "Message", flex: 1 } as GridColDef,
        ]),
    { field: "createdAt", headerName: "Submitted", width: 180, valueFormatter: (v: string) => new Date(v).toLocaleString() },
    {
      field: "isRead",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Chip
          size="small"
          label={params.value ? "Read" : "Unread"}
          color={params.value ? "default" : "primary"}
          onClick={async () => {
            if (!params.value) {
              if (kind === "apply-now-forms") await markApplyNowRead(params.row._id);
              else await markContactUsRead(params.row._id);
              refresh();
            }
          }}
        />
      ),
    },
  ];

  return (
    <Stack spacing={2}>
      <Typography variant="h5">{isApplyNow ? "Apply Now Submissions" : "Contact Us Submissions"}</Typography>
      <Paper sx={{ height: 600 }}>
        <DataGrid rows={rows} columns={columns} getRowId={(row) => row._id} loading={loading} disableRowSelectionOnClick />
      </Paper>
    </Stack>
  );
}
