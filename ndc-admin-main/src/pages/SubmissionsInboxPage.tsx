import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge, Spinner, Table } from "@chakra-ui/react";
import { MdMailOutline as InboxIcon } from "react-icons/md";
import {
  getApplyNowSubmissions,
  getContactUsSubmissions,
  markApplyNowRead,
  markContactUsRead,
} from "../services/data.service";
import { EmptyState, Panel, SectionHead } from "../components/editorKit";

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

  async function markRead(row: any) {
    if (row.isRead) return;
    if (kind === "apply-now-forms") await markApplyNowRead(row._id);
    else await markContactUsRead(row._id);
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
        icon={InboxIcon}
        title={isApplyNow ? "Apply Now Submissions" : "Contact Us Submissions"}
        subtitle="Click a row's status badge to mark it read."
      />
      {loading ? (
        <Spinner size="md" />
      ) : rows.length === 0 ? (
        <EmptyState icon={InboxIcon} title="No submissions yet" hint="New form submissions will appear here." />
      ) : (
        <Table.Root size="sm" interactive>
          <Table.Header>
            <Table.Row bg="gray.50">
              <Table.ColumnHeader {...headerCellProps}>Name</Table.ColumnHeader>
              <Table.ColumnHeader {...headerCellProps}>Email</Table.ColumnHeader>
              <Table.ColumnHeader {...headerCellProps}>Phone</Table.ColumnHeader>
              {isApplyNow ? (
                <Table.ColumnHeader {...headerCellProps}>Course</Table.ColumnHeader>
              ) : (
                <>
                  <Table.ColumnHeader {...headerCellProps}>Subject</Table.ColumnHeader>
                  <Table.ColumnHeader {...headerCellProps}>Message</Table.ColumnHeader>
                </>
              )}
              <Table.ColumnHeader {...headerCellProps}>Submitted</Table.ColumnHeader>
              <Table.ColumnHeader {...headerCellProps}>Status</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rows.map((row) => (
              <Table.Row key={row._id} _hover={{ bg: "gray.50" }}>
                <Table.Cell>{row.fullName}</Table.Cell>
                <Table.Cell>{row.email}</Table.Cell>
                <Table.Cell>{isApplyNow ? row.phoneNumber : row.mobileNumber}</Table.Cell>
                {isApplyNow ? (
                  <Table.Cell>{row.course}</Table.Cell>
                ) : (
                  <>
                    <Table.Cell>{row.subjectOfInterest}</Table.Cell>
                    <Table.Cell maxW="280px" truncate>
                      {row.message}
                    </Table.Cell>
                  </>
                )}
                <Table.Cell>{new Date(row.createdAt).toLocaleString()}</Table.Cell>
                <Table.Cell>
                  <Badge
                    colorPalette={row.isRead ? "gray" : "orange"}
                    cursor={row.isRead ? "default" : "pointer"}
                    onClick={() => markRead(row)}
                  >
                    {row.isRead ? "Read" : "Unread"}
                  </Badge>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </Panel>
  );
}
