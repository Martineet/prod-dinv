'use client';

import { useState } from 'react';

interface LectureToggleProps {
  /**
   * Render prop — receives the toggle button node so it can be placed
   * inside the page's own content shell, matching the original layout.
   */
  children: (toggleBar: React.ReactNode) => React.ReactNode;
}

/**
 * Wraps content with a lecture-mode toggle (📖 button).
 * When active, applies `.lecture-bg` to the wrapper for warm serif styling.
 * The toggle button is injected via render prop so it sits inside the
 * page's content shell, not outside it.
 */
export function LectureToggle({ children }: LectureToggleProps) {
  const [lecture, setLecture] = useState(false);

  const toggleBar = (
    <div className="lecture-toggle-bar">
      <button
        type="button"
        className={`lecture-toggle-btn${lecture ? ' active' : ''}`}
        onClick={() => setLecture((v) => !v)}
      >
        <span className="lecture-toggle-icon">📖</span>
      </button>
    </div>
  );

  return (
    <div className={lecture ? 'lecture-bg' : ''}>
      {children(toggleBar)}
    </div>
  );
}