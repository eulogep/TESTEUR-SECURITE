import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  Database,
  FileText,
  Globe,
  Lock,
  Server,
} from "lucide-react";

interface ProtocolTabsProps {
  onProtocolChange?: (protocol: string) => void;
  onParametersChange?: (parameters: any) => void;
}

const ProtocolTabs = ({
  onProtocolChange = () => {},
  onParametersChange = () => {},
}: ProtocolTabsProps) => {
  const [activeProtocol, setActiveProtocol] = useState("http");

  const handleProtocolChange = (value: string) => {
    setActiveProtocol(value);
    onProtocolChange(value);
  };

  return (
    <div className="w-full bg-background rounded-md border p-4">
      <h2 className="text-xl font-semibold mb-4">Protocol Selection</h2>
      <Tabs defaultValue="http" onValueChange={handleProtocolChange}>
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="http" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            HTTP/S
          </TabsTrigger>
          <TabsTrigger value="ssh" className="flex items-center gap-2">
            <Server className="h-4 w-4" />
            SSH
          </TabsTrigger>
          <TabsTrigger value="ftp" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            FTP
          </TabsTrigger>
          <TabsTrigger value="rdp" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            RDP
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Database
          </TabsTrigger>
        </TabsList>

        <TabsContent value="http" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="http-url">Target URL</Label>
                  <Input
                    id="http-url"
                    placeholder="https://example.com/login"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="http-method">HTTP Method</Label>
                  <Select defaultValue="post">
                    <SelectTrigger id="http-method">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="get">GET</SelectItem>
                      <SelectItem value="post">POST</SelectItem>
                      <SelectItem value="put">PUT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="http-username-field">Username Field</Label>
                  <Input id="http-username-field" placeholder="username" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="http-password-field">Password Field</Label>
                  <Input id="http-password-field" placeholder="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="http-success">Success Indicator</Label>
                  <Input id="http-success" placeholder="Dashboard" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="http-failure">Failure Indicator</Label>
                  <Input id="http-failure" placeholder="Invalid credentials" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Label>Advanced Options</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="http-cookies" />
                  <label
                    htmlFor="http-cookies"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Maintain cookies
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="http-headers" />
                  <label
                    htmlFor="http-headers"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Custom headers
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ssh" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ssh-host">SSH Host</Label>
                  <Input id="ssh-host" placeholder="example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ssh-port">Port</Label>
                  <Input id="ssh-port" placeholder="22" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ssh-timeout">Connection Timeout (sec)</Label>
                  <Input id="ssh-timeout" placeholder="5" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ssh-key-auth">Key Authentication</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="ssh-key-auth" />
                    <Label htmlFor="ssh-key-auth">Use key authentication</Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ssh-key-path">Key Path (optional)</Label>
                  <Input id="ssh-key-path" placeholder="/path/to/key.pem" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ftp" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ftp-host">FTP Host</Label>
                  <Input id="ftp-host" placeholder="ftp.example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ftp-port">Port</Label>
                  <Input id="ftp-port" placeholder="21" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ftp-mode">Connection Mode</Label>
                  <Select defaultValue="passive">
                    <SelectTrigger id="ftp-mode">
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passive">Passive</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ftp-secure">Secure Connection</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="ftp-secure" />
                    <Label htmlFor="ftp-secure">Use FTPS (FTP over SSL)</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rdp" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rdp-host">RDP Host</Label>
                  <Input id="rdp-host" placeholder="rdp.example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rdp-port">Port</Label>
                  <Input id="rdp-port" placeholder="3389" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rdp-domain">Domain (optional)</Label>
                  <Input id="rdp-domain" placeholder="CONTOSO" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rdp-security">Security Level</Label>
                  <Select defaultValue="negotiate">
                    <SelectTrigger id="rdp-security">
                      <SelectValue placeholder="Select security level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="negotiate">Negotiate</SelectItem>
                      <SelectItem value="rdp">RDP</SelectItem>
                      <SelectItem value="tls">TLS</SelectItem>
                      <SelectItem value="nla">NLA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="db-type">Database Type</Label>
                  <Select defaultValue="mysql">
                    <SelectTrigger id="db-type">
                      <SelectValue placeholder="Select database type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mysql">MySQL</SelectItem>
                      <SelectItem value="postgresql">PostgreSQL</SelectItem>
                      <SelectItem value="mssql">MS SQL Server</SelectItem>
                      <SelectItem value="oracle">Oracle</SelectItem>
                      <SelectItem value="mongodb">MongoDB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-host">Host</Label>
                  <Input id="db-host" placeholder="db.example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-port">Port</Label>
                  <Input id="db-port" placeholder="3306" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-name">Database Name</Label>
                  <Input id="db-name" placeholder="mydb" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-ssl">SSL Connection</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="db-ssl" />
                    <Label htmlFor="db-ssl">Use SSL</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex items-center gap-2">
        <Button variant="outline" className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          Validate Configuration
        </Button>
        <Button className="ml-auto">Apply Protocol Settings</Button>
      </div>
    </div>
  );
};

export default ProtocolTabs;
