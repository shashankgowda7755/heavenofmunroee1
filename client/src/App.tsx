import React from "react";
import { Router, Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import Home from "@/pages/home";
import InquiryPage from "@/pages/inquiry";
import PrivacyPage from "@/pages/privacy";
import TermsPage from "@/pages/terms";
import NotFound from "@/pages/not-found";
import ErrorBoundary from "@/components/ErrorBoundary";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import { InstallBannerProvider } from "@/contexts/InstallBannerContext";

function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/inquiry" component={InquiryPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/terms" component={TermsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <InstallBannerProvider>
          <Router>
            <PWAInstallPrompt />
            <AppRouter />
          </Router>
        </InstallBannerProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
