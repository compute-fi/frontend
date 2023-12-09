import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import { useAccount, useContractRead } from "wagmi";
import { abi } from "../contracts/compute-contract-abi";
import Link from "next/link";
import { Button } from "@mui/material";
import { computeContractAddress } from "../contracts/address";

const contractConfig = {
  address: computeContractAddress,
  abi,
} as const;

interface Column {
  id: "reqDate" | "computeID" | "status" | "computeTime" | "fee" | "tx" | "log";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "reqDate", label: "Request\u00a0Date", minWidth: 100 },
  { id: "computeID", label: "Compute\u00a0ID", minWidth: 200 },
  {
    id: "status",
    label: "Status",
    minWidth: 50,
  },
  {
    id: "computeTime",
    label: "Total\u00a0Compute\u00a0Time",
    minWidth: 50,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "fee",
    label: "Fee(eth)",
    minWidth: 50,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "tx",
    label: "Transaction\u00a0URL",
    minWidth: 50,
  },
  {
    id: "log",
    label: "Compute\u00a0Log",
    minWidth: 50,
  },
];

interface Data {
  reqDate: string;
  computeID: string;
  status: string;
  computeTime: number;
  fee: number;
  tx: string;
  log: string;
}

function createData(
  reqDate: string,
  computeID: string,
  status: string,
  computeTime: number,
  fee: number,
  tx: string,
  log: string
): Data {
  return { reqDate, computeID, status, computeTime, fee, tx, log };
}

const rows = [
  createData(
    "2023/11/24",
    "oiqjwd1-doija9d-12doam-12dasdd1",
    "processing",
    150,
    1.5,
    "0x8a3b4f6c514816c5e7299c697fff0f5eaef35e6b383f1e41694c2d1501f3b4c8",
    "QmJ4r3C7KjzVTuTV8vWTpW2N3tM9Xe6VoWZS4mNxiK9L3X"
  ),
  createData(
    "2023/11/25",
    "oiqjwd1-doija9d-12doam-12dasdd2",
    "completed",
    200,
    2,
    "0x4f7e68a8d02f17d554d6a35a1992b8fb52306c6c29e7f8613e3c5a58c08dfaae",
    "QmL5tEYwQvfE3KUeC7tAGv6UvzD4gveuvfa3ZSzLbP1wWt"
  ),
  createData(
    "2023/11/26",
    "oiqjwd1-doija9d-12doam-12dasdd3",
    "failed",
    120,
    1.2,
    "0x2bace0453b5248c54c1fc8a8031524960c64f29e27174d49a9865e5c84f1a5ef",
    "QmU2G7Q9BE9Q7fiYUaF2WzXtzrFswfBC4Ags4RBsUs87DZ"
  ),
  createData(
    "2023/11/27",
    "oiqjwd1-doija9d-12doam-12dasdd4",
    "pending",
    180,
    1.8,
    "0x95691a13295fda4c0fd0c63a81c3318db19c8c72a51c62cc89877e2d22e09c11",
    "QmZq8A4U96H8GdD6mW5JnXv4LcqSB3XVje2w1GgSWjrpR2"
  ),
  createData(
    "2023/11/28",
    "oiqjwd1-doija9d-12doam-12dasdd5",
    "completed",
    250,
    2.5,
    "0x71d97f05f1578a6e4f396f7d6f0b5a52f78d8aeb909ac9a7a3c981e683b24bb7",
    "QmVG7eDYC3xVK6X6KF4qE7XDQ7b3L9U1rRvmAa5ydHNVj1"
  ),
  createData(
    "2023/11/29",
    "oiqjwd1-doija9d-12doam-12dasdd6",
    "processing",
    140,
    1.4,
    "0x3cfb8e204bbf937d6d470dbf7a7a22d1b7635f0a7ba5c0cf08163e0b5b3b4d3a",
    "QmYQeRrjKzM4MvYUfX1TVzNBht4Gz4VhzYjvQczm11poMk"
  ),
  createData(
    "2023/11/30",
    "oiqjwd1-doija9d-12doam-12dasdd7",
    "failed",
    110,
    1.1,
    "0x6aebd33e868477f7e361547b8e845f3c85e2aa86d22b7a6aa13c084b67174a1a",
    "Qmc7D1L4LAPvK54XYTwSgkBYe2cXuWpdG8HbmaDpA2tGHZ"
  ),
  createData(
    "2023/12/01",
    "oiqjwd1-doija9d-12doam-12dasdd8",
    "completed",
    220,
    2.2,
    "0x9f92c557e1b8ea871bc84feeb1aae5c53cf2cf6b1c1d3db49f3cd103f736c17b",
    "QmdcPFWt7CQWv5TJkWMuAHDUZSM9N8K8QdG7d2Xt98Lgse"
  ),
  createData(
    "2023/12/02",
    "oiqjwd1-doija9d-12doam-12dasdd9",
    "pending",
    160,
    1.6,
    "0x1a6e1b21c2a7c4d5cfb1df707ad5b5f02c74f9e74f61970d0e7d47040c08855f",
    "Qmdv3b6Kr2cKLV9KtQXjU4TQmUqSDBkLRVp6CkiHC2tGzb"
  ),
  createData(
    "2023/12/03",
    "oiqjwd1-doija9d-12doam-12dasdd10",
    "processing",
    190,
    1.9,
    "0x4d56e2a7fc1df83a07051a9279aa94b3abac4d204b1f29d03487d2f4d8f99a89",
    "QmfEa6EnFrsW9Zk2A3yJ6JzEqU43y3vajF6mksNB6J2yoa"
  ),
];

export default function ComputeTaskTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [getAllStrings, setgetAllStrings] = React.useState("");
  const [computeTransactions, setcomputeTransactions] = React.useState([]);
  const { data: currentgetAllStrings } = useContractRead({
    ...contractConfig,
    functionName: "getAllStrings",
    args: ["0xde21750cf3A76931bAAc0A91e75706e6B3bEa1c5"],
    watch: true,
  });

  const { data: currentlogCID } = useContractRead({
    ...contractConfig,
    functionName: "owner",
    watch: true,
  });

  const computeTransactionResults = [];

  async function fetchData() {
    console.log("WATCH THIS", currentlogCID);

    if (currentgetAllStrings != null && currentgetAllStrings != "") {
      console;
      console.log("CURRENT ALL STRINGS", currentgetAllStrings.toString());
      setgetAllStrings(currentgetAllStrings.toString());

      // setcomputeTransactions(currentcomputeTransactions.toString());
    }
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Link href={"/mint"}>
        <Button variant="contained">Mint NFT</Button>
      </Link>
      <Link href={"/form"}>
        <Button variant="contained">Create Compute</Button>
      </Link>
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ top: 0, minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.computeID}
                    >
                      {columns.map(column => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[4, 10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
