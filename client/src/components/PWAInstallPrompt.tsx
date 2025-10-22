import React, { useState, useEffect } from 'react';
import { X, Download, Smartphone } from 'lucide-react';
import { useInstallBanner } from '@/contexts/InstallBannerContext';

// PWA install prompt appears within 2 seconds when page loads
// Respects user dismissal for current session only
// To reset for immediate testing: sessionStorage.removeItem('pwa-install-dismissed')
// To force show for testing: window.dispatchEvent(new Event('beforeinstallprompt'))

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function PWAInstallPrompt() {
  console.log('PWA Install Prompt: Component rendering');
  const { setInstallBannerVisible } = useInstallBanner();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [sessionDismissed, setSessionDismissed] = useState(false);


  useEffect(() => {
    console.log('PWA Install Prompt: useEffect running');
    
    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppiOS = (window.navigator as any).standalone === true;
    
    console.log('PWA Install Prompt: isStandalone =', isStandalone, 'isInWebAppiOS =', isInWebAppiOS);
    
    if (isStandalone || isInWebAppiOS) {
      console.log('PWA Install Prompt: App is already installed');
      setIsInstalled(true);
      return;
    }

    // Check if user has dismissed the prompt in current session only
    const sessionDismissedFlag = sessionStorage.getItem('pwa-install-dismissed');
    
    console.log('PWA Install Prompt: sessionDismissedFlag =', sessionDismissedFlag);
    
    // Only block if dismissed in current session
    if (sessionDismissedFlag) {
      console.log('PWA Install Prompt: Blocked by session dismissal');
      return;
    }
    
    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      
      // Double-check dismiss status when event fires (session only)
      const currentSessionDismissed = sessionStorage.getItem('pwa-install-dismissed');
      
      if (currentSessionDismissed) {
        e.preventDefault();
        return;
      }
      
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);

    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Detect browser and OS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isChrome = /Chrome/.test(navigator.userAgent);
    const isEdge = /Edg/.test(navigator.userAgent);
    
    // Show install prompt within 2 seconds if conditions are met
    console.log('PWA Install Prompt: Setting up timers');
    const showTimer = setTimeout(() => {
      console.log('PWA Install Prompt: 2-second timer fired - conditions:', {
        isInstalled,
        sessionDismissedFlag,
        showPrompt
      });
      if (!isInstalled && !sessionDismissedFlag) {
        console.log('PWA Install Prompt: Showing prompt via 2-second timer');
        setShowPrompt(true);
        setInstallBannerVisible(true);
      }
    }, 2000);
    
    // Also listen for native beforeinstallprompt event with early fallback
    const fallbackTimer = setTimeout(() => {
      console.log('PWA Install Prompt: 1-second fallback timer fired - conditions:', {
        deferredPrompt,
        showPrompt,
        isInstalled,
        sessionDismissedFlag
      });
      if (!deferredPrompt && !showPrompt && !isInstalled && !sessionDismissedFlag) {
        console.log('PWA Install Prompt: Showing prompt via fallback timer');
        setShowPrompt(true);
        setInstallBannerVisible(true);
      }
    }, 1000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(showTimer);
      clearTimeout(fallbackTimer);
    };
  }, [sessionDismissed]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setShowPrompt(false);
        setSessionDismissed(true);
        setInstallBannerVisible(false);
        sessionStorage.setItem('pwa-install-dismissed', 'true');
      } else if (outcome === 'dismissed') {
        setShowPrompt(false);
        setSessionDismissed(true);
        setInstallBannerVisible(false);
        sessionStorage.setItem('pwa-install-dismissed', 'true');
      }
    } else {
      // For browsers that don't support beforeinstallprompt
      // Just hide the banner without showing alert
      setShowPrompt(false);
      setSessionDismissed(true);
      setInstallBannerVisible(false);
      sessionStorage.setItem('pwa-install-dismissed', 'true');
    }
    
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setSessionDismissed(true);
    setInstallBannerVisible(false);
    sessionStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Don't show if dismissed, installed, or conditions not met
  if (!showPrompt || isInstalled || sessionDismissed) {
    return null;
  }

  return (
    <div 
      className="fixed top-0 left-0 right-0 bg-red-600 text-white px-4 py-3 shadow-lg"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10000,
        width: '100%'
      }}
      data-testid="pwa-install-banner"
    >
      <div className="container mx-auto flex items-center justify-between max-w-screen-xl">
        <div className="flex items-center space-x-3">
          <div className="bg-white p-1 rounded-lg">
            <img 
              src="/images/logoon.png" 
              alt="Heaven of Munroe Logo" 
              className="w-10 h-10 object-contain" 
              loading="eager"
            />
          </div>
          <div>
            <p className="font-semibold text-sm">
              Install Heaven of Munroe App
            </p>
            <p className="text-xs text-blue-100">
              Get faster access and offline features
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleInstallClick}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors flex items-center space-x-2"
            data-testid="button-install-pwa"
          >
            <Download className="w-4 h-4" />
            <span>Install</span>
          </button>
          
          <button
            onClick={handleDismiss}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Dismiss install prompt"
            data-testid="button-dismiss-pwa"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}