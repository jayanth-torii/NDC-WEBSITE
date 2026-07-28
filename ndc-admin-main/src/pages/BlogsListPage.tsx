import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Flex, Spinner, Table } from "@chakra-ui/react";
import { MdAdd, MdArticle as BlogIcon } from "react-icons/md";
import { getBlogs, deleteBlog } from "../services/data.service";
import { EmptyState, GhostButton, IconBtn, Panel, PrimaryButton, SectionHead } from "../components/editorKit";

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
    await deleteBlog(postId);
    refresh();
  }

  const headerCellProps = {
    fontSize: "xs",
    textTransform: "uppercase" as const,
    letterSpacing: "wide",
    color: "gray.500",
    fontWeight: 700,
    borderColor: "gray.200",
  };

  return (
    <Panel p={6}>
      <SectionHead
        icon={BlogIcon}
        title="Blog Posts"
        subtitle="Manage every post shown on the public blog."
        right={
          <PrimaryButton icon={MdAdd} onClick={() => navigate("/blogs/new")}>
            New Post
          </PrimaryButton>
        }
      />
      {loading ? (
        <Spinner size="md" />
      ) : rows.length === 0 ? (
        <EmptyState icon={BlogIcon} title="No blog posts yet" hint="Create your first post to publish it on the public blog." />
      ) : (
        <Table.Root size="sm" interactive>
          <Table.Header>
            <Table.Row bg="gray.50">
              <Table.ColumnHeader {...headerCellProps}>ID</Table.ColumnHeader>
              <Table.ColumnHeader {...headerCellProps}>Title</Table.ColumnHeader>
              <Table.ColumnHeader {...headerCellProps}>Order</Table.ColumnHeader>
              <Table.ColumnHeader {...headerCellProps}>Active</Table.ColumnHeader>
              <Table.ColumnHeader {...headerCellProps}></Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rows.map((row) => (
              <Table.Row key={row.postId} _hover={{ bg: "gray.50" }}>
                <Table.Cell>{row.postId}</Table.Cell>
                <Table.Cell>{row.title}</Table.Cell>
                <Table.Cell>{row.order}</Table.Cell>
                <Table.Cell>
                  <Badge colorPalette={row.isActive ? "green" : "gray"}>{row.isActive ? "Yes" : "No"}</Badge>
                </Table.Cell>
                <Table.Cell>
                  <Flex gap={2}>
                    <GhostButton size="xs" onClick={() => navigate(`/blogs/${row.postId}`)}>
                      Edit
                    </GhostButton>
                    <IconBtn
                      aria-label="Delete post"
                      tone="danger"
                      size="xs"
                      confirmMessage="Delete this blog post?"
                      onClick={() => handleDelete(row.postId)}
                    />
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </Panel>
  );
}
