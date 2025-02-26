"use client"

import React from "react";
import {
    type ColumnDef,
    flexRender,
    type SortingState,
    type ColumnFiltersState,
    type VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
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
} from "~/components/ui/table";
import { Input } from "~/components/ui/input";
import { DataTablePagination } from "~/components/table/data-table-pagination";
import { DataTableViewOptions } from "~/components/table/data-table-view-options";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { BookKey, BookLock, LoaderCircle, SquareArrowOutUpLeft, Trash } from "lucide-react";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { cn } from "~/lib/utils";

interface ArticleDataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function ArticleDataTable<TData, TValue>({
    columns,
    data,
}: ArticleDataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
        "createdAt": false,
        "updatedAt": false,
        "publishedAt": false,
        "likes": false,
        "views": true,
        "thumbnail": true,
    });
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    const selectedRow = table.getFilteredSelectedRowModel().rows as Array<{ original: { id: string } }>;
    const isShowSelectionAction = selectedRow.length > 0;

    const utils = api.useUtils();
    const {
        mutate: togglePublishArticles,
        isPending: isTogglePublishArticles,
        variables: togglePublishArticlesVariables,
    } = api.articleRouter.togglePublishArticles.useMutation({
        async onSuccess(data, variables) {
            await utils.articleRouter.invalidate();
            const { isPublished } = variables;
            toast.success(`${data.count} artikel berhasil ${isPublished ? "dipublikasikan" : "disimpan sebagai draft"}`);
            setRowSelection({});
        },
        onError(error) {
            toast.error("Gagal memproses artikel", {
                description: error.message,
            });
        },
    });
    const {
        mutate: deleteArticles,
        isPending: isDeleteArticles,
        variables: deleteArticlesVariables,
    } = api.articleRouter.deleteArticles.useMutation({
        async onSuccess(data) {
            await utils.articleRouter.invalidate();
            toast.success(`${data.count} artikel berhasil dihapus`);
            setRowSelection({});
        },
        onError(error) {
            toast.error("Gagal menghapus artikel", {
                description: error.message,
            });
        }
    })

    const isPendingAction = isTogglePublishArticles || isDeleteArticles;
    const articlesToPublishIds = togglePublishArticlesVariables?.ids ?? [];
    const isPendingPublish = (id: string) => articlesToPublishIds.includes(id) && isTogglePublishArticles;
    const articlesToDeleteIds = deleteArticlesVariables?.ids ?? [];
    const isPendingDelete = (id: string) => articlesToDeleteIds.includes(id) && isDeleteArticles;

    return (
        <div className="w-full">
            <div className="flex md:items-center flex-col-reverse gap-4 md:gap-0 md:flex-row justify-between py-4">
                <Input
                    placeholder="Cari judul artikel..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <div className="flex items-center gap-4">
                    {isShowSelectionAction && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={isPendingAction}
                                >
                                    {isPendingAction ? <LoaderCircle className="size-4 animate-spin" /> :
                                        <SquareArrowOutUpLeft className="size-4" />
                                    }
                                    {isDeleteArticles ? "Menghapus" : isTogglePublishArticles ? "Memproses" : "Tindakan"}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>
                                    akan memproses {selectedRow.length} artikel
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onSelect={() => deleteArticles({ ids: selectedRow.map((row) => row.original.id) })}>
                                    <Trash className="size-4" />
                                    Hapus
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => togglePublishArticles({ isPublished: true, ids: selectedRow.map((row) => row.original.id) })}>
                                    <BookKey className="size-4" />
                                    Publikasikan
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => togglePublishArticles({ isPublished: false, ids: selectedRow.map((row) => row.original.id) })}>
                                    <BookLock className="size-4" />
                                    Simpan sebagai draft
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                    <DataTableViewOptions table={table} />
                </div>
            </div>
            <div className="rounded-md border max-w-full overflow-x-auto">
                <Table className={cn(isPendingAction && "pointer-events-none cursor-not-allowed")}>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    className={cn(
                                        (isPendingPublish((row.original as { id: string }).id) || isPendingDelete((row.original as { id: string }).id))
                                        && "pointer-events-none cursor-not-allowed animate-pulse opacity-90"
                                    )}
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Artikel tidak ditemukan
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}
