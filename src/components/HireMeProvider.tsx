'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

const MAILTO =
  'mailto:hritikjasnani.design@gmail.com?subject=Design%20Project%20Inquiry&body=Hi%20Hritik,%0A%0AI%20came%20across%20your%20work%20and%20I%20am%20interested%20in%20collaborating%20with%20you%20on%20a%20design%20project.%0A%0AHere%20is%20a%20brief%20overview%20of%20what%20I%20am%20looking%20for:%0A%0AProject%20Type:%20%0ATimeline:%20%0ABudget:%20%0A%0ALooking%20forward%20to%20hearing%20from%20you.%0A%0ABest%20regards,%0A%5BYour%20Name%5D';

type HireMeContextType = { handleHireMeClick: () => void };

const HireMeContext = createContext<HireMeContextType>({ handleHireMeClick: () => {} });

export const useHireMe = () => useContext(HireMeContext);

export default function HireMeProvider({ children }: { children: ReactNode }) {
  const [showToast, setShowToast] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleHireMeClick = useCallback(() => {
    window.location.href = MAILTO;
    setShowToast(true);
    setCopied(false);
    setTimeout(() => setShowToast(false), 8000);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('hritikjasnani.design@gmail.com');
    setCopied(true);
  };

  return (
    <HireMeContext.Provider value={{ handleHireMeClick }}>
      {children}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] bg-off-white text-ink px-6 py-4 rounded-sm shadow-2xl flex items-center gap-6 text-xs font-body min-w-[320px] max-w-[480px]">
          <div className="flex-1">
            <p className="font-medium text-ink mb-1">Opening mail app…</p>
            <p className="text-smoke">
              Nothing happened?{' '}
              <button
                onClick={copyEmail}
                className="underline text-brand-red hover:text-ink transition-colors cursor-pointer bg-transparent border-none p-0 inline font-medium"
              >
                {copied ? '✓ Email copied!' : 'Copy email address'}
              </button>
            </p>
          </div>
          <button
            onClick={() => setShowToast(false)}
            className="text-smoke hover:text-ink cursor-pointer bg-transparent border-none p-0 text-lg shrink-0 transition-colors"
          >
            ✕
          </button>
        </div>
      )}
    </HireMeContext.Provider>
  );
}
