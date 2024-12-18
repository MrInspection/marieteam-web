"use client"

import {useState, useCallback} from 'react'
import {useRouter} from 'next/navigation'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Button} from "@/components/ui/button"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Input} from "@/components/ui/input"
import {Eye, Search} from "lucide-react"
import {formatName} from "@/utils/text-formatter";
import {cn} from "@/lib/utils";

type User = {
  id: string
  name: string | null
  email: string
  image: string | null
  role: 'USER' | 'ADMIN' | 'CAPTAIN'
  createdAt: Date
  _count: {
    reservations: number
  }
}

type UserListProps = {
  users: User[]
}

export function Users({users}: UserListProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Sort users by createdAt in descending order
  const sortedUsers = [...filteredUsers].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex max-md:flex-col items-center justify-between max-md:gap-6">
        <h2 className="text-2xl font-bold">Manage Users</h2>
        <div className="relative max-md:w-full md:max-w-sm md:ml-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4"/>
          <Input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-8"
          />
        </div>
      </div>
      <div className="border rounded-2xl px-6 py-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead className="max-lg:hidden">Email</TableHead>
              <TableHead className="max-md:hidden">Role</TableHead>
              <TableHead className="max-md:hidden">Reservations</TableHead>
              <TableHead className="max-md:hidden">Joined</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsers.length > 0 ? (
              sortedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border">
                        <AvatarImage src={user.image || ''} alt={user.name || ''}/>
                        <AvatarFallback>
                          {user.name?.slice(0, 2).toUpperCase() || user.email.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name || 'Unnamed User'}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-lg:hidden">{user.email}</TableCell>
                  <TableCell className="max-md:hidden">
                    <span
                      className={cn(
                        user.role === "ADMIN"
                          ? "bg-red-700/20 text-red-500"
                          : user.role === "CAPTAIN"
                            ? "bg-orange-700/20 text-orange-500"
                            : "bg-neutral-700/25 text-primary",
                        "px-2 py-1 text-xs font-medium rounded-lg"
                      )}
                    >
                      {formatName(user.role)}
                    </span>
                  </TableCell>
                  <TableCell className="max-md:hidden">
                    <span
                      className="bg-cyan-100/80 dark:bg-cyan-700/20 rounded-lg px-2 py-1 text-xs font-medium text-cyan-700 dark:text-cyan-500">
                      {user._count.reservations} reservations
                    </span>
                  </TableCell>
                  <TableCell className="max-md:hidden">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric"
                    })}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/admin/users/${user.id}`)}
                    >
                      <Eye className="size-5"/>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <p className="text-lg font-medium text-muted-foreground">No results found</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
