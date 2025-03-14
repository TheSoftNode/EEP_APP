import React, { useState, useRef, ChangeEvent, DragEvent, JSX } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Upload,
    File,
    Trash2,
    Download,
    FileText,
    Archive,
    Code
} from 'lucide-react';
import { motion } from 'framer-motion';

interface FileUploaderProps {
    selectedCloud: string;
}

interface UploadedFile {
    id: string;
    name: string;
    size: number;
    type: string;
    uploadDate: string;
    status: string;
    cloud: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ selectedCloud }) => {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [uploading, setUploading] = useState<boolean>(false);
    const [dragActive, setDragActive] = useState<boolean>(false);

    // File input ref
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handle file selection
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
        if (!e.target.files) return;

        const selectedFiles = Array.from(e.target.files);
        handleFiles(selectedFiles);
    };

    // Handle file drop
    const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFiles = Array.from(e.dataTransfer.files);
            handleFiles(droppedFiles);
        }
    };

    // Process selected files
    const handleFiles = (selectedFiles: File[]): void => {
        setUploading(true);

        // Simulate upload delay
        setTimeout(() => {
            const newFiles = selectedFiles.map(file => ({
                id: Date.now() + Math.random().toString(36).substring(2, 9),
                name: file.name,
                size: file.size,
                type: file.type,
                uploadDate: new Date().toISOString(),
                status: 'uploaded',
                cloud: selectedCloud
            }));

            setFiles(prev => [...prev, ...newFiles]);
            setUploading(false);
        }, 1500);
    };

    // Delete file
    const deleteFile = (id: string): void => {
        setFiles(prev => prev.filter(file => file.id !== id));
    };

    // Format file size
    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    // Get icon based on file type
    const getFileIcon = (type: string): JSX.Element => {
        if (type.includes('zip') || type.includes('compressed')) {
            return <Archive className="w-5 h-5 text-yellow-500" />;
        } else if (type.includes('javascript') || type.includes('typescript') || type.includes('json')) {
            return <Code className="w-5 h-5 text-blue-500" />;
        } else {
            return <FileText className="w-5 h-5 text-gray-500" />;
        }
    };

    // Drag handlers
    const handleDragEnter = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <Card className="shadow-lg mb-8">
            <CardHeader>
                <CardTitle className="text-xl">File Management</CardTitle>
                <CardDescription>
                    Upload and manage your application files for {selectedCloud}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {/* Upload area */}
                <div
                    className={`border-2 border-dashed rounded-lg p-8 mb-6 text-center transition-colors ${dragActive
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        multiple
                        className="hidden"
                    />

                    <div className="flex flex-col items-center">
                        <Upload className="w-12 h-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium mb-2">
                            {dragActive ? 'Drop files here' : 'Drag & Drop Files Here'}
                        </h3>
                        <p className="text-gray-500 mb-4">
                            or
                        </p>
                        <Button
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-gradient-to-r from-blue-500 to-violet-500"
                        >
                            Browse Files
                        </Button>
                        <p className="text-sm text-gray-500 mt-2">
                            Upload application code, configuration files, or ZIP packages
                        </p>
                    </div>
                </div>

                {/* Loading indicator */}
                {uploading && (
                    <div className="flex justify-center items-center py-4">
                        <div className="w-6 h-6 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
                        <span className="ml-2">Uploading files...</span>
                    </div>
                )}

                {/* File list */}
                {files.length > 0 && (
                    <div>
                        <h3 className="font-medium mb-3">Uploaded Files</h3>
                        <div className="space-y-2">
                            {files.map(file => (
                                <motion.div
                                    key={file.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-white"
                                >
                                    <div className="flex items-center">
                                        {getFileIcon(file.type)}
                                        <div className="ml-3">
                                            <p className="font-medium">{file.name}</p>
                                            <p className="text-xs text-gray-500">
                                                {formatFileSize(file.size)} • Uploaded to {file.cloud}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <Download className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-gray-500 hover:text-red-500"
                                            onClick={() => deleteFile(file.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default FileUploader;