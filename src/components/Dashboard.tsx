import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  Shield,
  Settings,
  Database,
  Server,
  Globe,
  FileText,
} from "lucide-react";
import AttackConfigPanel from "./AttackConfigPanel";
import MonitoringPanel from "./MonitoringPanel";
import ProtocolTabs from "./ProtocolTabs";

interface DashboardProps {
  onStartAttack?: () => void;
  onStopAttack?: () => void;
  onResetAttack?: () => void;
}

const Dashboard = ({
  onStartAttack = () => {},
  onStopAttack = () => {},
  onResetAttack = () => {},
}: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("config");
  const [attackRunning, setAttackRunning] = useState(false);
  const [threadCount, setThreadCount] = useState(5);
  const [useProxy, setUseProxy] = useState(false);
  const [throttleRequests, setThrottleRequests] = useState(false);

  const handleStartAttack = () => {
    setAttackRunning(true);
    onStartAttack();
  };

  const handleStopAttack = () => {
    setAttackRunning(false);
    onStopAttack();
  };

  const handleResetAttack = () => {
    setAttackRunning(false);
    onResetAttack();
  };

  const handleExportResults = () => {
    // simple export of mock data
    const data = {
      meta: { generatedAt: new Date().toISOString() },
      settings: { threadCount, useProxy, throttleRequests },
      summary: { progress: attackRunning ? 45 : 0 },
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "security-testing-results.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveConfig = () => {
    const cfg = { threadCount, useProxy, throttleRequests };
    localStorage.setItem("securityTool.config", JSON.stringify(cfg));
  };

  const handleLoadConfig = () => {
    try {
      const raw = localStorage.getItem("securityTool.config");
      if (!raw) return;
      const cfg = JSON.parse(raw);
      if (typeof cfg.threadCount === "number") setThreadCount(cfg.threadCount);
      if (typeof cfg.useProxy === "boolean") setUseProxy(cfg.useProxy);
      if (typeof cfg.throttleRequests === "boolean") setThrottleRequests(cfg.throttleRequests);
    } catch {}
  };

  return (
    <div className="flex h-full w-full bg-background">
      {/* Left Sidebar */}
      <div className="w-64 border-r bg-muted/20 p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-bold">Security Tester</h2>
        </div>

        <nav className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setActiveTab("config")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Attack Configuration
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setActiveTab("protocols")}
          >
            <Globe className="mr-2 h-4 w-4" />
            Protocol Selection
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setActiveTab("monitoring")}
          >
            <Server className="mr-2 h-4 w-4" />
            Monitoring
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setActiveTab("results")}
          >
            <FileText className="mr-2 h-4 w-4" />
            Results
          </Button>
        </nav>

        <Separator className="my-4" />

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="thread-count">Thread Count</Label>
              <span className="text-sm">{threadCount}</span>
            </div>
            <Slider
              id="thread-count"
              min={1}
              max={20}
              step={1}
              value={[threadCount]}
              onValueChange={(value) => setThreadCount(value[0])}
              disabled={attackRunning}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="use-proxy">Use Proxy Rotation</Label>
            <Switch
              id="use-proxy"
              checked={useProxy}
              onCheckedChange={setUseProxy}
              disabled={attackRunning}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="throttle">Throttle Requests</Label>
            <Switch
              id="throttle"
              checked={throttleRequests}
              onCheckedChange={setThrottleRequests}
              disabled={attackRunning}
            />
          </div>
        </div>

        <div className="mt-auto space-y-2">
          {!attackRunning ? (
            <Button className="w-full" onClick={handleStartAttack}>
              <Play className="mr-2 h-4 w-4" />
              Start Attack
            </Button>
          ) : (
            <Button
              className="w-full"
              variant="destructive"
              onClick={handleStopAttack}
            >
              <Pause className="mr-2 h-4 w-4" />
              Stop Attack
            </Button>
          )}
          <Button
            className="w-full"
            variant="outline"
            onClick={handleResetAttack}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold neon">Security Testing Dashboard</h1>
          {attackRunning && (
            <div className="flex items-center">
              <Badge variant="destructive" className="animate-pulse mr-2">
                Attack Running
              </Badge>
              <Progress value={45} className="w-40" />
            </div>
          )}
        </div>

        <div className="mb-4 font-mono text-xs text-muted-foreground bg-muted/30 rounded px-2 py-1 neon-border">
          <span className="text-primary">user@securebreaker</span>:<span className="text-secondary-foreground">~</span>$ ./run_attack --protocol http --threads 5 <span className="typing-cursor"></span>
        </div>

        <Card className="mb-6">
          <CardContent className="p-0">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full grid grid-cols-4">
                <TabsTrigger value="config">Configuration</TabsTrigger>
                <TabsTrigger value="protocols">Protocols</TabsTrigger>
                <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
              </TabsList>

              <TabsContent value="config" className="p-4">
                <AttackConfigPanel onStartAttack={handleStartAttack} onSaveConfig={handleSaveConfig} onLoadConfig={handleLoadConfig} />
              </TabsContent>

              <TabsContent value="protocols" className="p-4">
                <ProtocolTabs />
              </TabsContent>

              <TabsContent value="monitoring" className="p-4">
                <MonitoringPanel isAttackRunning={attackRunning} onExportResults={handleExportResults} />
              </TabsContent>

              <TabsContent value="results" className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Attack Results</h3>
                    <Button variant="outline" size="sm" onClick={handleExportResults}>
                      Export Report
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground">
                          Total Attempts
                        </div>
                        <div className="text-2xl font-bold">1,245</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground">
                          Successful Attempts
                        </div>
                        <div className="text-2xl font-bold text-green-500">
                          3
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground">
                          Time Elapsed
                        </div>
                        <div className="text-2xl font-bold">00:45:12</div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="text-md font-medium mb-2">
                        Vulnerability Summary
                      </h4>
                      <ScrollArea className="h-64">
                        <div className="space-y-2">
                          <div className="p-2 border rounded-md flex items-start">
                            <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                            <div>
                              <div className="font-medium">
                                Weak Password Found
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Username: admin, Password: admin123
                              </div>
                            </div>
                          </div>
                          <div className="p-2 border rounded-md flex items-start">
                            <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                            <div>
                              <div className="font-medium">
                                Default Credentials
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Username: user, Password: password
                              </div>
                            </div>
                          </div>
                          <div className="p-2 border rounded-md flex items-start">
                            <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                            <div>
                              <div className="font-medium">
                                Common Password Pattern
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Multiple accounts using Company + Year pattern
                              </div>
                            </div>
                          </div>
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-xs text-muted-foreground text-right">
          Application réalisée par MABIALA EULOGE JUNIOR
        </div>
      </div>
    </div>
  );
};

export default Dashboard;