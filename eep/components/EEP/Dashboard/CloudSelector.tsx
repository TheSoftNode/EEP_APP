import React from 'react';
import { Cloud } from 'lucide-react';
import
    {
        Select,
        SelectContent,
        SelectItem,
        SelectTrigger,
        SelectValue,
    } from "@/components/ui/select";
import { CloudSelectorProps } from "@/types/eep-dashboard";

export const CloudSelector: React.FC<CloudSelectorProps> = ({
    selectedCloud,
    onCloudSelect
}) =>
{
    return (
        <div className="flex items-center">
            <Select value={selectedCloud} onValueChange={onCloudSelect}>
                <SelectTrigger
                    className="w-48 border border-indigo-200 hover:border-indigo-300 bg-white/50 backdrop-blur-sm text-gray-800 font-medium shadow-sm transition-all hover:shadow"
                >
                    <div className="flex items-center space-x-2">
                        <SelectValue
                            placeholder="Select Cloud Provider"
                            className="text-gray-700"
                        />
                    </div>
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-sm border border-indigo-100 shadow-lg">
                    <SelectItem
                        value="AWS"
                        className="hover:bg-indigo-50 focus:bg-indigo-50 cursor-pointer"
                    >
                        <div className="flex items-center space-x-2 text-gray-700">
                            <Cloud className="w-4 h-4 text-indigo-500" />
                            <span>AWS</span>
                        </div>
                    </SelectItem>
                    <SelectItem
                        value="Azure"
                        className="hover:bg-indigo-50 focus:bg-indigo-50 cursor-pointer"
                    >
                        <div className="flex items-center space-x-2 text-gray-700">
                            <Cloud className="w-4 h-4 text-blue-500" />
                            <span>Azure</span>
                        </div>
                    </SelectItem>
                    <SelectItem
                        value="GCP"
                        className="hover:bg-indigo-50 focus:bg-indigo-50 cursor-pointer"
                    >
                        <div className="flex items-center space-x-2 text-gray-700">
                            <Cloud className="w-4 h-4 text-violet-500" />
                            <span>GCP</span>
                        </div>
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default CloudSelector;