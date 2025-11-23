//'use client'; // if you're using App Router (optional in Rsbuild)

import { useState, type ReactNode } from 'react';

interface Tab {
  label: string;
  content: ReactNode;
  icon?: ReactNode; // optional: for icons later
}

interface TabsProps {
  tabs: Tab[];
  defaultActive?: number;
  className?: string;
}

export default function Tabs({ 
  tabs, 
  defaultActive = 0,
  className = ''
}: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultActive);

  return (
    <div className={`w-full ${className}`}>
      {/* Tab Headers */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex flex-wrap gap-1 sm:gap-6" aria-label="Tabs">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`
                group relative min-w-fit px-1 py-3 text-sm font-medium transition-all
                ${activeIndex === index
                  ? 'text-cyan-600 border-b-2 border-cyan-600'
                  : 'text-gray-500 hover:text-gray-300 hover:border-gray-100 border-b-2 border-transparent'
                }
              `}
              aria-current={activeIndex === index ? 'page' : undefined}
            >
              <span className="flex items-center gap-2">
                {tab.icon}
                {tab.label}
              </span>
              {/* Optional underline animation */}
              {activeIndex === index && (
                <span
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-cyan-600"
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        <div className="transition-opacity duration-200">
          {tabs[activeIndex].content}
        </div>
      </div>
    </div>
  );
}