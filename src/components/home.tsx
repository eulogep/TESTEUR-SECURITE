import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Dashboard from "./Dashboard";
import HackerBackground from "./HackerBackground";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col hacker-theme noise scanlines">
      <HackerBackground />
      <header className="border-b bg-card/70 backdrop-blur p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold glitch" data-text="Security Testing Tool">Security Testing Tool</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">Documentation</Button>
            <Button variant="ghost" size="sm">Settings</Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">À propos</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>À propos</DialogTitle>
                  <DialogDescription>
                    Application réalisée par MABIALA EULOGE JUNIOR. Outil avancé de tests de sécurité pour usages autorisés uniquement.
                  </DialogDescription>
                </DialogHeader>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>Fonctionnalités principales : configuration des attaques, dictionnaires personnalisés, règles de mutation, contrôle de performance, sélection de protocoles, et monitoring en temps réel.</p>
                  <p>Respectez les lois et politiques en vigueur. Usage strictement encadré pour le pentest autorisé.</p>
                </div>
              </DialogContent>
            </Dialog>
            <div className="h-8 w-8 rounded-full bg-primary/80 neon-border flex items-center justify-center text-primary-foreground">
              <span className="text-sm font-medium">US</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4">
        <Card className="bg-card/70 backdrop-blur shadow-md neon-border">
          <Dashboard />
        </Card>
      </main>

      <footer className="border-t bg-card/70 backdrop-blur p-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>
            Advanced Security Testing Brute Force Tool - For authorized
            penetration testing only
          </p>
          <p className="mt-1">Application réalisée par MABIALA EULOGE JUNIOR</p>
          <p className="mt-1">
            © {new Date().getFullYear()} Security Research Team
          </p>
        </div>
      </footer>
    </div>
  );
}