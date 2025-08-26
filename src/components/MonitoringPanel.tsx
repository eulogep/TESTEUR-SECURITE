import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  PauseCircle,
  XCircle,
} from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: string;
  target: string;
  attempt: string;
  status: "success" | "failure" | "pending" | "error";
  message?: string;
}

interface AttackStats {
  totalAttempts: number;
  successfulAttempts: number;
  failedAttempts: number;
  errorAttempts: number;
  elapsedTime: string;
  requestsPerSecond: number;
  remainingTime: string;
  progress: number;
}

interface MonitoringPanelProps {
  isAttackRunning?: boolean;
  onPauseAttack?: () => void;
  onResumeAttack?: () => void;
  onStopAttack?: () => void;
  onExportResults?: () => void;
}

const MonitoringPanel: React.FC<MonitoringPanelProps> = ({
  isAttackRunning = false,
  onPauseAttack = () => {},
  onResumeAttack = () => {},
  onStopAttack = () => {},
  onExportResults = () => {},
}) => {
  const [activeTab, setActiveTab] = useState("live");

  // Mock data for demonstration
  const mockLogs: LogEntry[] = [
    {
      id: "1",
      timestamp: "2023-07-01 10:15:23",
      target: "https://example.com/login",
      attempt: "admin:password123",
      status: "failure",
    },
    {
      id: "2",
      timestamp: "2023-07-01 10:15:24",
      target: "https://example.com/login",
      attempt: "admin:admin123",
      status: "failure",
    },
    {
      id: "3",
      timestamp: "2023-07-01 10:15:25",
      target: "https://example.com/login",
      attempt: "admin:qwerty",
      status: "failure",
    },
    {
      id: "4",
      timestamp: "2023-07-01 10:15:26",
      target: "https://example.com/login",
      attempt: "admin:123456",
      status: "success",
    },
    {
      id: "5",
      timestamp: "2023-07-01 10:15:27",
      target: "https://example.com/login",
      attempt: "user:password",
      status: "error",
      message: "Connection timeout",
    },
    {
      id: "6",
      timestamp: "2023-07-01 10:15:28",
      target: "https://example.com/login",
      attempt: "user:user123",
      status: "pending",
    },
    {
      id: "7",
      timestamp: "2023-07-01 10:15:29",
      target: "https://example.com/login",
      attempt: "guest:guest",
      status: "failure",
    },
    {
      id: "8",
      timestamp: "2023-07-01 10:15:30",
      target: "https://example.com/login",
      attempt: "root:toor",
      status: "failure",
    },
    {
      id: "9",
      timestamp: "2023-07-01 10:15:31",
      target: "https://example.com/login",
      attempt: "admin:admin",
      status: "failure",
    },
    {
      id: "10",
      timestamp: "2023-07-01 10:15:32",
      target: "https://example.com/login",
      attempt: "administrator:admin123",
      status: "failure",
    },
  ];

  const mockStats: AttackStats = {
    totalAttempts: 10000,
    successfulAttempts: 1,
    failedAttempts: 8,
    errorAttempts: 1,
    elapsedTime: "00:05:23",
    requestsPerSecond: 42.5,
    remainingTime: "03:15:47",
    progress: 25,
  };

  const mockVulnerabilities = [
    {
      id: "1",
      severity: "high",
      description: "Weak password found: admin:123456",
    },
    {
      id: "2",
      severity: "medium",
      description: "No account lockout detected after multiple failed attempts",
    },
    {
      id: "3",
      severity: "low",
      description: "Password policy does not enforce special characters",
    },
  ];

  const getStatusBadge = (status: LogEntry["status"]) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-500">Success</Badge>;
      case "failure":
        return <Badge variant="secondary">Failed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: LogEntry["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "failure":
        return <XCircle className="h-4 w-4 text-gray-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full h-full bg-background">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Attack Monitoring</CardTitle>
          <div className="flex gap-2">
            {isAttackRunning ? (
              <Button variant="outline" size="sm" onClick={onPauseAttack}>
                <PauseCircle className="h-4 w-4 mr-2" /> Pause
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={onResumeAttack}>
                <Clock className="h-4 w-4 mr-2" /> Resume
              </Button>
            )}
            <Button variant="destructive" size="sm" onClick={onStopAttack}>
              <XCircle className="h-4 w-4 mr-2" /> Stop
            </Button>
            <Button variant="outline" size="sm" onClick={onExportResults}>
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="live"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="live">Live Monitoring</TabsTrigger>
            <TabsTrigger value="stats">Attack Statistics</TabsTrigger>
            <TabsTrigger value="results">Results Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="text-sm font-medium">Attack Progress</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={mockStats.progress} className="w-64" />
                  <span className="text-xs">{mockStats.progress}%</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Elapsed Time</p>
                  <p className="font-medium">{mockStats.elapsedTime}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Remaining Time
                  </p>
                  <p className="font-medium">{mockStats.remainingTime}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Requests/sec</p>
                  <p className="font-medium">{mockStats.requestsPerSecond}</p>
                </div>
              </div>
            </div>

            <div className="border rounded-md">
              <ScrollArea className="h-[400px] w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">Status</TableHead>
                      <TableHead className="w-[180px]">Timestamp</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Attempt</TableHead>
                      <TableHead className="w-[200px]">Message</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>{getStatusIcon(log.status)}</TableCell>
                        <TableCell className="font-mono text-xs">
                          {log.timestamp}
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          {log.target}
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          {log.attempt}
                        </TableCell>
                        <TableCell className="text-xs">
                          {log.message || "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">
                    Attempt Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        Total Attempts
                      </p>
                      <p className="text-2xl font-bold">
                        {mockStats.totalAttempts}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        Successful
                      </p>
                      <p className="text-2xl font-bold text-green-500">
                        {mockStats.successfulAttempts}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Failed</p>
                      <p className="text-2xl font-bold text-gray-500">
                        {mockStats.failedAttempts}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Errors</p>
                      <p className="text-2xl font-bold text-red-500">
                        {mockStats.errorAttempts}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        Elapsed Time
                      </p>
                      <p className="text-2xl font-bold">
                        {mockStats.elapsedTime}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        Remaining Time
                      </p>
                      <p className="text-2xl font-bold">
                        {mockStats.remainingTime}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        Requests/sec
                      </p>
                      <p className="text-2xl font-bold">
                        {mockStats.requestsPerSecond}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Progress</p>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={mockStats.progress}
                          className="flex-1"
                        />
                        <span>{mockStats.progress}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Attack Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full bg-muted/20 flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Chart visualization would appear here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  Detected Vulnerabilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Severity</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockVulnerabilities.map((vuln) => (
                      <TableRow key={vuln.id}>
                        <TableCell>
                          <Badge
                            className={
                              vuln.severity === "high"
                                ? "bg-red-500"
                                : vuln.severity === "medium"
                                  ? "bg-orange-500"
                                  : "bg-yellow-500"
                            }
                          >
                            {vuln.severity.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>{vuln.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Successful Attempts</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">Timestamp</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Credentials</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-mono text-xs">
                        2023-07-01 10:15:26
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        https://example.com/login
                      </TableCell>
                      <TableCell className="font-mono text-xs font-bold">
                        admin:123456
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onExportResults}>
                <Download className="h-4 w-4 mr-2" /> Export Report
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MonitoringPanel;
