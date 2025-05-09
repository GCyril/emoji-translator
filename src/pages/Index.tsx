import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Bienvenue dans Votre Application !</CardTitle>
          <CardDescription>
            Explorez les fonctionnalités que nous avons créées.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg text-gray-700">
            Commencez par découvrir notre nouveau Traducteur d'Emojis.
          </p>
          <Link to="/emoji-translator">
            <Button size="lg" className="w-full">Aller au Traducteur d'Emojis</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;