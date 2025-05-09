import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import EmojiTranslatorPage from "./components/EmojiTranslatorPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmojiTranslatorPage />} />
          {/* L'ancienne route /emoji-translator peut être conservée ou supprimée, 
              car / y mène maintenant directement. Pour la simplicité, nous la laissons 
              au cas où il y aurait des liens directs existants, mais elle est redondante. 
              Si vous préférez la supprimer, faites-le moi savoir.
          */}
          <Route path="/emoji-translator" element={<EmojiTranslatorPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;