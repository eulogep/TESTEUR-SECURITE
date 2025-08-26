import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <Card className="max-w-md w-full">
        <CardContent className="p-6 text-center space-y-4">
          <div className="flex justify-center">
            <AlertCircle className="h-10 w-10 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold">Page non trouvée</h2>
          <p className="text-muted-foreground">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <div className="flex justify-center">
            <Button asChild>
              <Link to="/">Retour à l’accueil</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
