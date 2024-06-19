"use client";

import * as React from "react";

import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { LastSixExpenses } from "../../types";

export const columns: ColumnDef<LastSixExpenses>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => row.getValue("name"),
  },
  {
    accessorKey: "value",
    header: "Valor",
    cell: ({ row }) => {
      const value = parseFloat(row.getValue("value"));
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return <div>{date.toLocaleDateString("pt-BR")}</div>;
    },
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row }) => {
      const category = row.getValue("category");
      return (
        <Badge className="capitalize rounded-xl" color="primary">
          {category as string}
        </Badge>
      );
    },
  },
  {
    accessorKey: "typeExpense",
    header: "Tipo de Despesa",
    cell: ({ row }) => row.getValue("typeExpense"),
  },
];

export const TableExpenses = ({
  lastSixExpenses,
}: {
  lastSixExpenses: LastSixExpenses[];
}) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data: lastSixExpenses,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
    },
  });

  return (
    <Card>
      <div className="flex justify-between items-center border-b">
        <CardHeader>
          <CardTitle>Despesas Recentes</CardTitle>
        </CardHeader>
      </div>
      <CardContent>
        <div className="w-full h-[273px]">
          <div className="h-full">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-full text-center text-sm text-gray-500"
                    >
                      Nenhum dado encontrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
