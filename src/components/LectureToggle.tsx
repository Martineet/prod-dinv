'use client';

import { useState } from 'react';

interface LectureToggleProps {
  children: React.ReactNode;
}

/**
 * Wraps content with a lecture-mode toggle (📖 button).
 * When active, applies `.lecture-bg` to the wrapper for warm serif styling.
 */
export function LectureToggle({ children }: LectureToggleProps) {
  const [lecture, setLecture] = useState(false);

  return (
    <div className={lecture ? 'lecture-bg' : ''}>
      <div className="lecture-toggle-bar">
        <button
          type="button"
          className={`lecture-toggle-btn${lecture ? ' active' : ''}`}
          onClick={() => setLecture((v) => !v)}
        >
          <span className="lecture-toggle-icon">📖</span>
        </button>
      </div>
      {children}
    </div>
  );
}