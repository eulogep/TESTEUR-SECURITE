import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Save,
  Upload,
  Play,
  Pause,
  Settings,
  FileText,
  RefreshCw,
} from "lucide-react";

interface AttackConfigPanelProps {
  onStartAttack?: () => void;
  onSaveConfig?: (config: any) => void;
  onLoadConfig?: () => void;
}

const AttackConfigPanel = ({
  onStartAttack = () => {},
  onSaveConfig = () => {},
  onLoadConfig = () => {},
}: AttackConfigPanelProps) => {
  const [attackRunning, setAttackRunning] = useState(false);
  const [selectedTab, setSelectedTab] = useState("target");
  const [threadCount, setThreadCount] = useState([4]);
  const [useProxy, setUseProxy] = useState(false);
  // Proxy testing state
  const [proxiesText, setProxiesText] = useState("");
  const [proxyStatuses, setProxyStatuses] = useState<{ host: string; status: "ok" | "bad" | "testing" }[]>([]);

  const handleStartAttack = () => {
    setAttackRunning(!attackRunning);
    onStartAttack();
  };

  // Simulate proxy testing with simple mock logic
  const handleTestProxies = () => {
    const lines = proxiesText
      .split(/\n|,/)
      .map((l) => l.trim())
      .filter(Boolean)
      .slice(0, 10);
    if (lines.length === 0) {
      // Populate with a few demo proxies if none provided
      lines.push("192.168.0.10:9050", "10.0.0.2:8080", "172.16.0.5:1080");
    }
    const initial = lines.map((host) => ({ host, status: "testing" as const }));
    setProxyStatuses(initial);
    // After a short delay, mark random results
    setTimeout(() => {
      setProxyStatuses((prev) =>
        prev.map((p) => ({
          ...p,
          status: Math.random() > 0.35 ? "ok" : "bad",
        }))
      );
    }, 700);
  };

  return (
    <Card className="w-full max-w-md bg-background border-border shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Attack Configuration</CardTitle>
            <CardDescription>
              Configure your security testing parameters
            </CardDescription>
          </div>
          <Badge
            variant={attackRunning ? "destructive" : "outline"}
            className="ml-2"
          >
            {attackRunning ? "Running" : "Ready"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="target">Target</TabsTrigger>
            <TabsTrigger value="dictionary">Dictionary</TabsTrigger>
            <TabsTrigger value="mutations">Mutations</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="target" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="target-url">Target URL/Host</Label>
              <Input id="target-url" placeholder="https://example.com/login" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-port">Port</Label>
              <Input id="target-port" placeholder="443" type="number" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="auth-type">Authentication Type</Label>
              <Select defaultValue="form">
                <SelectTrigger id="auth-type">
                  <SelectValue placeholder="Select authentication type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="form">Form-based</SelectItem>
                  <SelectItem value="basic">HTTP Basic</SelectItem>
                  <SelectItem value="digest">HTTP Digest</SelectItem>
                  <SelectItem value="ntlm">NTLM</SelectItem>
                  <SelectItem value="oauth">OAuth</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username-field">Username Field Identifier</Label>
              <Input id="username-field" placeholder="username" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password-field">Password Field Identifier</Label>
              <Input id="password-field" placeholder="password" />
            </div>
          </TabsContent>

          <TabsContent value="dictionary" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username-list">Username List</Label>
              <div className="flex gap-2">
                <Select defaultValue="default">
                  <SelectTrigger id="username-list">
                    <SelectValue placeholder="Select username list" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default List</SelectItem>
                    <SelectItem value="common">Common Usernames</SelectItem>
                    <SelectItem value="admin">Admin Accounts</SelectItem>
                    <SelectItem value="custom">Custom List</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password-list">Password List</Label>
              <div className="flex gap-2">
                <Select defaultValue="default">
                  <SelectTrigger id="password-list">
                    <SelectValue placeholder="Select password list" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default List</SelectItem>
                    <SelectItem value="common">Common Passwords</SelectItem>
                    <SelectItem value="rockyou">RockYou</SelectItem>
                    <SelectItem value="custom">Custom List</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom-dictionary">
                Custom Dictionary Entries
              </Label>
              <ScrollArea className="h-[100px] border rounded-md p-2">
                <Textarea
                  id="custom-dictionary"
                  placeholder="Enter custom words, one per line"
                  className="min-h-[80px] border-none focus-visible:ring-0"
                />
              </ScrollArea>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="save-dictionary" />
              <Label htmlFor="save-dictionary">
                Save dictionary for future use
              </Label>
            </div>
          </TabsContent>

          <TabsContent value="mutations" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="leet-speak">Leet Speak Substitutions</Label>
                <Switch id="leet-speak" />
              </div>
              <div className="text-sm text-muted-foreground">
                Convert letters to numbers (e.g., a→4, e→3, l→1).
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="case-variations">Case Variations</Label>
                <Switch id="case-variations" />
              </div>
              <div className="text-sm text-muted-foreground">
                Try different case combinations (lowercase, UPPERCASE, Title
                Case).
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="date-append">Date Appending</Label>
                <Switch id="date-append" />
              </div>
              <div className="text-sm text-muted-foreground">
                Append common date formats (2023, 23, etc.).
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="special-chars">Special Characters</Label>
                <Switch id="special-chars" />
              </div>
              <div className="text-sm text-muted-foreground">
                Add special characters (!@#$%) at beginning/end.
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom-rules">Custom Mutation Rules</Label>
              <Textarea
                id="custom-rules"
                placeholder="Enter custom rules in format: find:replace"
                className="min-h-[80px]"
              />
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="thread-count">
                  Thread Count: {threadCount}
                </Label>
              </div>
              <Slider
                id="thread-count"
                min={1}
                max={32}
                step={1}
                value={threadCount}
                onValueChange={setThreadCount}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Low (1)</span>
                <span>High (32)</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="request-delay">Request Delay (ms)</Label>
              <Input id="request-delay" type="number" placeholder="100" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="use-proxy">Use Proxy/Tor</Label>
                <Switch
                  id="use-proxy"
                  checked={useProxy}
                  onCheckedChange={setUseProxy}
                />
              </div>
            </div>

            {useProxy && (
              <div className="space-y-2">
                <Label htmlFor="proxy-list">Proxy List</Label>
                <Textarea
                  id="proxy-list"
                  placeholder="Enter proxies in format: ip:port (one per line)"
                  className="min-h-[80px]"
                  value={proxiesText}
                  onChange={(e) => setProxiesText(e.target.value)}
                />
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex gap-1"
                    onClick={handleTestProxies}
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span>Test Proxies</span>
                  </Button>
                  {proxyStatuses.length > 0 && (
                    <div className="text-xs text-muted-foreground">
                      {proxyStatuses.filter((p) => p.status === "ok").length} OK / {proxyStatuses.length}
                    </div>
                  )}
                </div>
                {proxyStatuses.length > 0 && (
                  <div className="mt-2 border rounded-md divide-y">
                    {proxyStatuses.map((p) => (
                      <div key={p.host} className="flex items-center justify-between px-2 py-1 text-xs">
                        <span className="font-mono">{p.host}</span>
                        <span
                          className={
                            p.status === "testing"
                              ? "text-amber-600"
                              : p.status === "ok"
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {p.status === "testing" ? "Testing…" : p.status === "ok" ? "OK" : "Bad"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-throttle">Auto-throttle Requests</Label>
                <Switch id="auto-throttle" />
              </div>
              <div className="text-sm text-muted-foreground">
                Automatically adjust request rate to avoid detection.
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-4" />

        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onSaveConfig}>
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button variant="outline" size="sm" onClick={onLoadConfig}>
              <FileText className="h-4 w-4 mr-1" />
              Load
            </Button>
          </div>
          <Button
            onClick={handleStartAttack}
            variant={attackRunning ? "destructive" : "default"}
            size="sm"
          >
            {attackRunning ? (
              <>
                <Pause className="h-4 w-4 mr-1" />
                Stop
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-1" />
                Start
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttackConfigPanel;