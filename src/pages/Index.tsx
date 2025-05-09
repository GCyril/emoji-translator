import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Welcome to Your App!</CardTitle>
          <CardDescription>
            Explore the features we've built.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg text-gray-700">
            Start by checking out our new Emoji Translator.
          </p>
          <Link to="/emoji-translator">
            <Button size="lg" className="w-full">Go to Emoji Translator</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;