import { useState } from "react";
import { Shield, Settings, File, Folder, Archive, FileText, Plus, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

interface ProtectedFile {
  id: string;
  name: string;
  type: "document" | "archive" | "presentation" | "text" | "folder";
  size?: string;
  modified: string;
  isProtected: boolean;
}

const FileProtectionSystem = () => {
  const [protectionEnabled, setProtectionEnabled] = useState(true);
  const [files, setFiles] = useState<ProtectedFile[]>([
    {
      id: "1",
      name: "Important Documents",
      type: "folder",
      modified: "2 hours ago",
      isProtected: true,
    },
    {
      id: "2",
      name: "family_photos.zip",
      type: "archive",
      size: "2.4 GB",
      modified: "1 day ago",
      isProtected: true,
    },
    {
      id: "3",
      name: "work_presentation.pptx",
      type: "presentation",
      size: "45 MB",
      modified: "3 hours ago",
      isProtected: false,
    },
    {
      id: "4",
      name: "System Backup",
      type: "folder",
      modified: "1 week ago",
      isProtected: true,
    },
    {
      id: "5",
      name: "temp_download.txt",
      type: "text",
      size: "1.2 KB",
      modified: "5 minutes ago",
      isProtected: false,
    },
  ]);

  const protectedCount = files.filter(file => file.isProtected).length;

  const getFileIcon = (type: string) => {
    switch (type) {
      case "folder":
        return <Folder className="w-5 h-5" />;
      case "archive":
        return <Archive className="w-5 h-5" />;
      case "presentation":
        return <File className="w-5 h-5" />;
      case "text":
        return <FileText className="w-5 h-5" />;
      default:
        return <File className="w-5 h-5" />;
    }
  };

  const toggleFileProtection = (fileId: string) => {
    setFiles(files.map(file => 
      file.id === fileId 
        ? { ...file, isProtected: !file.isProtected }
        : file
    ));
    
    const file = files.find(f => f.id === fileId);
    if (file) {
      toast({
        title: file.isProtected ? "Protection Removed" : "Protection Added",
        description: `${file.name} ${file.isProtected ? "is no longer" : "is now"} protected`,
      });
    }
  };

  const toggleSystemProtection = () => {
    setProtectionEnabled(!protectionEnabled);
    toast({
      title: protectionEnabled ? "Protection Disabled" : "Protection Enabled",
      description: protectionEnabled 
        ? "File protection system has been disabled"
        : "File protection system is now active",
    });
  };

  const addNewFile = () => {
    toast({
      title: "Add File",
      description: "File selection dialog would open here",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Shield 
                className={`w-8 h-8 ${protectionEnabled ? 'text-protection-active animate-shield-pulse' : 'text-protection-inactive'}`} 
              />
              {protectionEnabled && (
                <div className="absolute inset-0 rounded-full shadow-protection opacity-50" />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">File Protection System</h1>
              <p className="text-muted-foreground">
                Protection is {protectionEnabled ? 'active' : 'inactive'} - {protectedCount} items secured
              </p>
            </div>
          </div>
          <Badge 
            variant={protectionEnabled ? "default" : "secondary"}
            className={`${protectionEnabled ? 'bg-protection-active text-protection-active-foreground' : ''} px-4 py-2 font-semibold`}
          >
            {protectionEnabled ? 'ACTIVE' : 'INACTIVE'}
          </Badge>
        </div>

        {/* Control Panel */}
        <Card className="bg-card border-border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Shield className={`w-5 h-5 ${protectionEnabled ? 'text-protection-active' : 'text-protection-inactive'}`} />
                <span className="font-medium">Protection Enabled</span>
              </div>
              <Switch
                checked={protectionEnabled}
                onCheckedChange={toggleSystemProtection}
                className="data-[state=checked]:bg-protection-active"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="text-muted-foreground border-border hover:bg-file-item-hover"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </Card>

        {/* Files Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Desktop Files</h2>
              <p className="text-muted-foreground">{protectedCount} protected items</p>
            </div>
            <Button 
              onClick={addNewFile}
              className="bg-protection-active hover:bg-protection-active/90 text-protection-active-foreground"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add File
            </Button>
          </div>

          <div className="space-y-3">
            {files.map((file) => (
              <Card 
                key={file.id}
                className="bg-file-item border-border hover:bg-file-item-hover transition-all duration-200 cursor-pointer group"
              >
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`p-2 rounded-lg ${file.isProtected ? 'bg-protection-active/20 text-protection-active' : 'bg-muted text-muted-foreground'}`}>
                      {getFileIcon(file.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-foreground">{file.name}</h3>
                        {file.isProtected && (
                          <Badge 
                            variant="secondary"
                            className="bg-protection-active/20 text-protection-active border-protection-active/30 text-xs"
                          >
                            Protected
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {file.size && <span>{file.size}</span>}
                        <span>Modified {file.modified}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFileProtection(file.id);
                    }}
                    className={`${
                      file.isProtected 
                        ? 'text-protection-active hover:bg-protection-active/10' 
                        : 'text-muted-foreground hover:bg-muted'
                    } opacity-0 group-hover:opacity-100 transition-opacity`}
                  >
                    {file.isProtected ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Shield className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileProtectionSystem;