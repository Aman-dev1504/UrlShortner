"use client";
import React, { useEffect, useState } from "react";
import {
  Copy,
  ExternalLink,
  Eye,
  Loader2,
  Pencil,
  Trash,
  EllipsisVertical,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Server function imports (assumed to exist)
import getAllLinks from "@/server_functions/getAllLinks";
import deleteOneByAlias from "@/server_functions/deleteOneByAlias";
import editOneById from "@/server_functions/editOneById";

export default function LinksManagementPage() {
  const [allLinks, setAllLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);

  // Fetch links
  useEffect(() => {
    const fetchAllLinks = async () => {
      try {
        const data = await getAllLinks();
        setAllLinks(JSON.parse(data));
        setLoading(false);
      } catch (err) {
        toast.error("Failed to fetch links");
        setLoading(false);
      }
    };
    fetchAllLinks();
  }, [isDeleted]);

  // Delete link handler
  const handleDelete = async (id) => {
    try {
      await deleteOneByAlias({ id });
      toast.success("Link deleted successfully");
      setIsDeleted(true);
      setTimeout(() => setIsDeleted(false), 500);
    } catch (err) {
      toast.error("Failed to delete link");
    }
  };

  // Edit link handler
  const handleEdit = async (e) => {
    e.preventDefault();
    setIsEditing(true);

    const formData = new FormData(e.target);
    const alias = formData.get("alias");
    const url = formData.get("url");
    const id = formData.get("id");

    try {
      const response = await editOneById({ id, url, ali: alias });
      const result = JSON.parse(response);

      if (!result.message) {
        toast.success("Link updated successfully");
        setIsDeleted(true);
        setTimeout(() => setIsDeleted(false), 500);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("Failed to update link");
    } finally {
      setIsEditing(false);
      setSelectedLink(null);
    }
  };

  // Copy link to clipboard
  const copyToClipboard = (link) => {
    navigator.clipboard.writeText(
      `https://${window.location.host}/${link.alias}`
    );
    toast.success("Link copied to clipboard");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl mt-20">
      <Card className="w-full bg-white dark:bg-black border dark:border-gray-700 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold text-primary dark:text-primary-400">
            Your Shortened Links
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {loading ? (
            <div className="flex justify-center items-center h-24">
              <Loader2 className="h-6 w-6 animate-spin text-primary dark:text-primary-400" />
            </div>
          ) : allLinks.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 h-24 flex items-center justify-center">
              No shortened links found
            </div>
          ) : (
            <div className="space-y-3">
              {allLinks.map((link) => (
                <div
                  key={link._id}
                  className="flex items-center justify-between p-3 
                  bg-gray-50 dark:bg-black 
                  border dark:border-gray-700 
                  rounded-md 
                  hover:bg-gray-900 dark:hover:bg-gray-900 
                  transition-colors group"
                >
                  <div className="flex-1 min-w-0 mr-2">
                    <Link
                      href={`https://${window.location.host}/${link.alias}`}
                      target="_blank"
                      className="flex items-center space-x-1 truncate 
                      text-primary dark:text-primary-400 
                      hover:underline"
                    >
                      <span className="truncate text-sm">{link.alias}</span>
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary dark:text-primary-400" />
                    </Link>
                    <div className="mt-1">
                      <Badge
                        variant="outline"
                        className="text-xs 
                        bg-white dark:bg-gray-900 
                        border-primary/20 dark:border-primary-400/20 
                        text-primary/80 dark:text-primary-400/80"
                      >
                        <Eye className="h-3 w-3 mr-1 text-primary dark:text-primary-400" />
                        {link.clicks}
                      </Badge>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 
                        hover:bg-primary/10 dark:hover:bg-primary-400/20"
                      >
                        <EllipsisVertical className="h-4 w-4 text-primary dark:text-primary-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-48 
                      bg-white dark:bg-black 
                      border dark:border-gray-700"
                    >
                      <DropdownMenuItem
                        onSelect={() => copyToClipboard(link)}
                        className="cursor-pointer 
                        hover:bg-primary/10 dark:hover:bg-primary-400/20"
                      >
                        <Copy className="mr-2 h-4 w-4 text-primary dark:text-primary-400" />
                        <span>Copy Link</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onSelect={() => setSelectedLink(link)}
                        className="cursor-pointer 
                        hover:bg-primary/10 dark:hover:bg-primary-400/20"
                      >
                        <Pencil className="mr-2 h-4 w-4 text-primary dark:text-primary-400" />
                        <span>Edit</span>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator className="dark:bg-gray-700" />

                      <DropdownMenuItem
                        onSelect={() => handleDelete(link._id)}
                        className="cursor-pointer 
                        text-red-500 dark:text-red-400 
                        hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Link Dialog */}
      {selectedLink && (
        <Dialog
          open={!!selectedLink}
          onOpenChange={() => setSelectedLink(null)}
        >
          <DialogContent
            className="max-w-md 
            bg-white dark:bg-black 
            border dark:border-gray-900"
          >
            <DialogHeader>
              <DialogTitle className="text-primary dark:text-primary-400">
                Edit Link
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <Label className="dark:text-gray-300">Alias</Label>
                <Input
                  name="alias"
                  defaultValue={selectedLink.alias}
                  className="
                  focus:border-primary focus:ring-primary
                  dark:bg-gray-900 dark:border-gray-700 
                  dark:text-white 
                  dark:focus:border-primary-400 dark:focus:ring-primary-400"
                />
              </div>
              <div>
                <Label className="dark:text-gray-300">Destination URL</Label>
                <Input
                  name="url"
                  defaultValue={selectedLink.destination_url}
                  className="
                  focus:border-primary focus:ring-primary
                  dark:bg-gray-900 dark:border-gray-700 
                  dark:text-white 
                  dark:focus:border-primary-400 dark:focus:ring-primary-400"
                />
              </div>
              <Input
                type="hidden"
                name="id"
                value={selectedLink._id}
                readOnly
              />
              <div className="flex space-x-2">
                <Button
                  type="submit"
                  disabled={isEditing}
                  className="w-full 
                  bg-primary hover:bg-primary/90
                  dark:bg-primary-400 dark:hover:bg-primary-400/90"
                >
                  {isEditing ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Save Changes"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedLink(null)}
                  className="w-full 
                  dark:border-gray-700 dark:text-white 
                  dark:hover:bg-gray-800"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
