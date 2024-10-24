"use client"

import * as React from "react"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Notebook, Shield} from "lucide-react";

// This would typically come from your API
const data: User[] = [
    {
        id: "728ed52f",
        name: "MrInspection",
        email: "mrinspection@splabs.fr",
        role: "ADMIN",
        reservations: 0,
        createdAt: "2024-01-16T09:00:00",
    },
    {
        id: "728ed52f",
        name: "Alexendre DELACROIX",
        email: "adelacroix@splabs.fr",
        role: "CAPTAIN",
        reservations: 45,
        createdAt: "2024-04-16T09:00:00",
    },
    {
        id: "728ed52f",
        name: "Maxence DELACROIX",
        email: "mdelacroix@splabs.fr",
        role: "USER",
        reservations: 5,
        createdAt: "2022-04-16T09:00:00",
    },
]

export type User = {
    id: string
    name: string
    email: string
    role: "USER" | "CAPTAIN" | "ADMIN"
    reservations: number
    createdAt: string
}

const roleColors: Record<User['role'], string> = {
    USER: "bg-neutral-700/10 dark:bg-neutral-700/30 text-primary",
    CAPTAIN: "bg-pink-700/10 dark:bg-pink-700/20 text-pink-500",
    ADMIN: "bg-pink-700/10 dark:bg-pink-700/20 text-pink-500",
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: "Account",
        cell: ({ row }) => {
            return (
                <div className="flex items-center">
                    <Avatar className="size-10 mr-2.5 border">
                        <AvatarImage src={""} alt={row.original.name} />
                        <AvatarFallback>{row.original.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium">{row.original.name}</div>
                        <div className="text-xs text-muted-foreground">{row.original.email}</div>
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            const role = row.getValue("role") as User['role']
            return (
                <div className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium ${roleColors[role]}`}>
                    {role}
                </div>
            )
        },
    },
    {
        accessorKey: "reservations",
        header: "Reservations",
        cell: ({ row }) => (
            <div className="">
                <div className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-cyan-700/10 dark:bg-cyan-700/20 text-cyan-500"> {row.getValue("reservations")} reservations</div>
            </div>
        ),
    },
    {
        accessorKey: "createdAt",
        header: "Created at",
        cell: ({ row }) => <div>{new Date(row.getValue("createdAt")).toLocaleDateString()}</div>,
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const user = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => alert(`View details for ${user.name}`)}>
                            <Notebook className="size-4 mr-2" /> Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => alert(`View details for ${user.name}`)}>
                            <Shield className="size-4 mr-2"/> Edit perks
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export default function UserManagementPage() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-semibold tracking-tight">Manage Users</h1>
                <div className="flex items-center gap-4">
                    <Input
                        placeholder="Search users..."
                        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("name")?.setFilterValue(event.target.value)
                        }
                        className=" w-52"
                    />
                    <Select onValueChange={(value) => table.getColumn("role")!.setFilterValue(value)}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All roles</SelectItem>
                            <SelectItem value="CAPTAIN">Captain</SelectItem>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

            </div>
            <div className="mt-4 border-2 px-5 py-4 rounded-2xl">
                <Table>
                    <TableHeader className="text-center">
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
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
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
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredRowModel().rows.length} user(s) total.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}