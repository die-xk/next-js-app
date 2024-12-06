interface PaddleStatic {
  Setup: (options: { vendor: number }) => void;
  Environment: {
    sandbox: string;
    production: string;
    set: (environment: 'sandbox' | 'production') => void;
  };
  Checkout: {
    open: (options: {
      items: Array<{
        priceId: string;
        quantity: number;
      }>;
      settings?: {
        displayMode: 'inline' | 'overlay';
        theme: 'light' | 'dark';
        locale: string;
        successUrl?: string;
      };
      customData?: Record<string, any>;
      successCallback?: (data: any) => void;
      closeCallback?: () => void;
      errorCallback?: (error: any) => void;
    }) => void;
  };
}

declare global {
  interface Window {
    Paddle: PaddleStatic;
  }
}

export {}; 