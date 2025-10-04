
import React, { useEffect, useRef } from 'react';

interface AdPlaceholderProps {
  id: string;
  style?: React.CSSProperties;
  scriptSrc?: string;
}

export default function AdPlaceholder({ id, style, scriptSrc }: AdPlaceholderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scriptSrc || !containerRef.current) {
      return;
    }
    
    // Prevent re-injecting the script
    if (containerRef.current.querySelector('script')) {
        return;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = scriptSrc;
    script.async = true;
    
    containerRef.current.appendChild(script);

  }, [scriptSrc]);

  if (!scriptSrc) {
    return (
      <div
        id={id}
        className="w-full bg-gray-100 border-2 border-dashed border-gray-300 p-4 rounded-lg text-center flex flex-col items-center justify-center"
        style={style}
      >
        <strong className="text-gray-600">Ad Placeholder</strong>
        <div className="text-xs text-gray-500 mt-2">Integrate your ad network script here (e.g., AdSense)</div>
        <div className="mt-1 text-xs text-gray-400">Container ID: {id}</div>
      </div>
    );
  }

  return (
    <div ref={containerRef} id={id} style={style} className="w-full flex items-center justify-center">
      {/* Ad content will be injected here by the script */}
    </div>
  );
}
