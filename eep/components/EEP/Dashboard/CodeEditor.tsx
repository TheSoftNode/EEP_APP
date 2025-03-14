import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Download, Save, Upload } from 'lucide-react';
import Editor, { OnMount } from '@monaco-editor/react';

interface CodeEditorProps {
    selectedCloud: 'AWS' | 'Azure' | 'GCP';
    selectedService: 'databases' | 'backend' | 'frontend';
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ selectedCloud, selectedService }) => {
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
    const [fileUploaded, setFileUploaded] = useState<boolean>(false);
    const [fileName, setFileName] = useState<string>('');
    const [code, setCode] = useState<string>('');
    const [language, setLanguage] = useState<string>('javascript');

    // References
    const fileInputRef = useRef<HTMLInputElement>(null);
    const editorRef = useRef<any>(null);

    // Set up editor reference when Monaco loads
    const handleEditorDidMount: OnMount = (editor) => {
        editorRef.current = editor;
    };

    // Initial setup and when cloud/service changes
    useEffect(() => {
        const defaultCode = getDefaultTemplate();
        setCode(defaultCode);

        // Set language based on service
        const fileExtension = getFileExtensionForService(selectedCloud, selectedService);
        setLanguage(getLanguageForExtension(fileExtension));
    }, [selectedCloud, selectedService]);

    // Get file extension based on cloud and service
    const getFileExtensionForService = (cloud: string, service: string): string => {
        if (service === 'backend') {
            return '.js'; // Default to JavaScript
        } else if (service === 'databases') {
            return '.json';
        } else {
            return '.js';
        }
    };

    // Get Monaco language ID based on file extension
    const getLanguageForExtension = (extension: string): string => {
        const extensionMap: Record<string, string> = {
            '.js': 'javascript',
            '.ts': 'typescript',
            '.jsx': 'javascript',
            '.tsx': 'typescript',
            '.json': 'json',
            '.html': 'html',
            '.css': 'css',
            '.yaml': 'yaml',
            '.py': 'python',
        };

        return extensionMap[extension] || 'plaintext';
    };

    // File upload handler
    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setFileUploaded(true);

            // Read file content
            const reader = new FileReader();
            reader.onload = (event) => {
                const content = event.target?.result as string;
                if (content) {
                    setCode(content);

                    // Set language based on file extension
                    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
                    setLanguage(getLanguageForExtension(extension));
                }
            };
            reader.readAsText(file);
        }
    };

    // Save code to file
    const handleSaveCode = (): void => {
        // Get current value from editor ref (more reliable than state)
        const currentCode = editorRef.current ? editorRef.current.getValue() : code;

        if (!currentCode) return;

        // Create blob and download link
        const blob = new Blob([currentCode], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName || `${selectedCloud}_${selectedService}_code${getFileExtensionForService(selectedCloud, selectedService)}`;
        document.body.appendChild(a);
        a.click();

        // Clean up
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 0);
    };

    // Handle download button click
    const handleDownload = (): void => {
        handleSaveCode();
    };

    // Default code template based on selected cloud and service
    const getDefaultTemplate = (): string => {
        if (selectedCloud === 'AWS' && selectedService === 'backend') {
            return `// AWS Lambda function template
exports.handler = async (event) => {
    try {
        // Your code here
        const response = {
            statusCode: 200,
            body: JSON.stringify('Hello from Lambda!'),
        };
        return response;
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify('Error executing function'),
        };
    }
};`;
        }

        if (selectedCloud === 'Azure' && selectedService === 'backend') {
            return `// Azure Function template
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name
        : "Pass a name in the query string or request body";
        
    context.res = {
        status: 200,
        body: responseMessage
    };
}`;
        }

        if (selectedCloud === 'GCP' && selectedService === 'backend') {
            return `// Google Cloud Function template
exports.handler = (req, res) => {
    try {
        // Your code here
        const name = req.query.name || req.body.name || 'World';
        res.status(200).send(\`Hello \${name}!\`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};`;
        }

        if (selectedService === 'databases') {
            return `// ${selectedCloud} ${selectedService} configuration
{
  "database": {
    "name": "my-database",
    "type": "relational",
    "connections": 10,
    "options": {
      "autoBackup": true,
      "encryption": true,
      "multiZone": true
    }
  }
}`;
        }

        return `// ${selectedCloud} ${selectedService} template
// Start coding here...
`;
    };

    return (
        <Card className={`shadow-xl mb-8 ${isFullscreen ? 'fixed inset-0 z-50 m-0 rounded-none' : ''}`}>
            <CardHeader className="border-b border-gray-200 bg-gray-50 flex flex-row items-center justify-between p-4">
                <CardTitle className="text-md flex items-center">
                    <Code className="w-5 h-5 mr-2 text-blue-500" />
                    Cloud Code Editor
                    {fileName && <span className="ml-2 text-gray-500 text-sm">- {fileName}</span>}
                </CardTitle>
                <div className="flex items-center space-x-2">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept=".js,.ts,.json,.yaml,.html,.css,.py"
                        className="hidden"
                    />
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-gray-600"
                    >
                        <Upload className="w-4 h-4 mr-1" />
                        Upload
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-gray-600"
                        onClick={handleSaveCode}
                    >
                        <Save className="w-4 h-4 mr-1" />
                        Save
                    </Button>
                    {fileUploaded && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-gray-600"
                            onClick={handleDownload}
                        >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-600"
                        onClick={() => setIsFullscreen(!isFullscreen)}
                    >
                        {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <Editor
                    height={isFullscreen ? "calc(100vh - 80px)" : "400px"}
                    language={language}
                    value={code}
                    theme="vs-dark"
                    onChange={(value) => setCode(value || '')}
                    onMount={handleEditorDidMount}
                    options={{
                        minimap: { enabled: true },
                        scrollBeyondLastLine: false,
                        fontSize: 14,
                        lineNumbers: 'on',
                        wordWrap: 'on',
                        formatOnPaste: true,
                        formatOnType: true,
                        snippetSuggestions: 'inline',
                        suggestOnTriggerCharacters: true,
                        tabSize: 2,
                        automaticLayout: true,
                    }}
                    loading={
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                            <span className="ml-2">Loading editor...</span>
                        </div>
                    }
                />
            </CardContent>
        </Card>
    );
};

export default CodeEditor;