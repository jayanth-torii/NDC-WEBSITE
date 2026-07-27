import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { getBlogs, deleteBlog } from "../services/data.service";

export function BlogsListPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function refresh() {
    setLoading(true);
    const res = await getBlogs();
    setRows(res.data);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleDelete(postId: number) {
    if (!window.confirm("Delete this blog post?")) return;
    await deleteBlog(postId);
    refresh();
  }

  const columns: GridColDef[] = [
    { field: "postId", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "order", headerName: "Order", width: 90 },
    { field: "isActive", headerName: "Active", width: 90 },
    {
      field: "actions",
      headerName: "",
      width: 160,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button size="small" onClick={() => navigate(`/blogs/${params.row.postId}`)}>
            Edit
          </Button>
          <Button size="small" color="error" onClick={() => handleDelete(params.row.postId)}>
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Stack spacing={2}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">Blog Posts</Typography>
        <Button variant="contained" onClick={() => navigate("/blogs/new")}>
          New Post
        </Button>
      </Box>
      <Paper sx={{ height: 560 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.postId}
          loading={loading}
          disableRowSelectionOnClick
        />
      </Paper>
    </Stack>
  );
}
