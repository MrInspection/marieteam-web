"use client";

import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

type Contact = {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: Date;
};

type ContactProps = {
    contacts: Contact[];
};

export function ContactList({ contacts }: ContactProps) {
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

    // Sort contacts by createdAt in descending order
    const sortedContacts = [...contacts].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return (
        <div className="border rounded-2xl p-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="max-md:hidden">Name</TableHead>
                        <TableHead className="max-md:hidden">Email</TableHead>
                        <TableHead className="max-md:hidden">Subject</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedContacts.map((contact) => (
                        <TableRow key={contact.id}>
                            <TableCell className="max-md:hidden">{contact.name}</TableCell>
                            <TableCell className="max-md:hidden">{contact.email}</TableCell>
                            <TableCell className="max-md:hidden">{contact.subject}</TableCell>
                            <TableCell>
                                {new Date(contact.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true
                                })}
                            </TableCell>
                            <TableCell>
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="ghost" size="sm" onClick={() => setSelectedContact(contact)}>
                                            <Eye className="size-5" /> View
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent>
                                        <SheetHeader>
                                            <SheetTitle>
                                                Contact Details
                                                <p className="text-muted-foreground text-sm font-normal">ID: {selectedContact?.id}</p>
                                            </SheetTitle>
                                        </SheetHeader>
                                        {selectedContact && (
                                            <div className="mt-6 space-y-3">
                                                <div className="bg-muted/80 dark:bg-muted/50 p-3 rounded-lg">
                                                    <h3 className="text-xs text-muted-foreground">Name</h3>
                                                    <p className="text-sm font-medium">{selectedContact.name}</p>
                                                </div>
                                                <div className="bg-muted/80 dark:bg-muted/50 p-3 rounded-lg">
                                                    <h3 className="text-xs text-muted-foreground">Email</h3>
                                                    <p className="text-sm font-medium">{selectedContact.email}</p>
                                                </div>
                                                <div className="bg-muted/80 dark:bg-muted/50 p-3 rounded-lg">
                                                    <h3 className="text-xs text-muted-foreground">Subject</h3>
                                                    <p className="text-sm font-medium">{selectedContact.subject}</p>
                                                </div>
                                                <div className="bg-muted/80 dark:bg-muted/50 p-3 rounded-lg">
                                                    <h3 className="text-xs text-muted-foreground">Message</h3>
                                                    <p className="text-sm font-medium">{selectedContact.message}</p>
                                                </div>
                                                <div className="bg-muted/80 dark:bg-muted/50 p-3 rounded-lg">
                                                    <h3 className="text-xs text-muted-foreground">Received on</h3>
                                                    <p className="text-sm font-medium">
                                                        {new Date(selectedContact.createdAt).toLocaleString("en-US", {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric",
                                                            hour: "numeric",
                                                            minute: "2-digit",
                                                            hour12: true
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </SheetContent>
                                </Sheet>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
