import React, { useEffect } from 'react';

const MobileProtection: React.FC = () => {
  useEffect(() => {
    // Disable right-click context menu
    const disableRightClick = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable text selection
    const disableTextSelection = () => {
      document.body.style.userSelect = 'none';
      (document.body.style as any).webkitUserSelect = 'none';
      (document.body.style as any).mozUserSelect = 'none';
      (document.body.style as any).msUserSelect = 'none';
    };

    // Disable keyboard shortcuts
    const disableKeyboardShortcuts = (e: KeyboardEvent) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S, etc.
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && (e.key === 'u' || e.key === 'U')) ||
        (e.ctrlKey && (e.key === 's' || e.key === 'S')) ||
        (e.ctrlKey && (e.key === 'a' || e.key === 'A')) ||
        (e.ctrlKey && (e.key === 'c' || e.key === 'C')) ||
        (e.ctrlKey && (e.key === 'v' || e.key === 'V'))
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Disable drag and drop
    const disableDragDrop = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Add mobile-specific protections
    const addMobileProtections = () => {
      // Disable long press context menu on mobile
      document.addEventListener('contextmenu', disableRightClick);
      
      // Disable text selection
      disableTextSelection();
      
      // Disable copy/paste
      document.addEventListener('copy', disableRightClick);
      document.addEventListener('cut', disableRightClick);
      document.addEventListener('paste', disableRightClick);
      
      // Disable screenshot detection (iOS)
      if ('ontouchstart' in window) {
        document.addEventListener('touchstart', (e) => {
          if (e.touches.length > 1) {
            e.preventDefault();
          }
        }, { passive: false });
      }
    };

    // Apply all protections
    document.addEventListener('contextmenu', disableRightClick);
    document.addEventListener('keydown', disableKeyboardShortcuts);
    document.addEventListener('dragstart', disableDragDrop);
    document.addEventListener('drop', disableDragDrop);
    addMobileProtections();

    // Add CSS to prevent selections and screenshots
    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
      
      /* Prevent screenshot overlays */
      body::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: transparent;
        z-index: 9999;
        pointer-events: none;
      }
      
      /* Hide content during screenshot attempts */
      @media print {
        body { display: none !important; }
      }
    `;
    document.head.appendChild(style);

    // Console warning
    console.clear();
    console.warn('⚠️ ALGOT ACADEMY - SECURITY NOTICE ⚠️');
    console.warn('This content is protected by copyright.');
    console.warn('Screenshots, recordings, and unauthorized access are prohibited.');
    console.warn('All activities are monitored and logged.');

    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
      document.removeEventListener('keydown', disableKeyboardShortcuts);
      document.removeEventListener('dragstart', disableDragDrop);
      document.removeEventListener('drop', disableDragDrop);
      document.head.removeChild(style);
    };
  }, []);

  return null;
};

export default MobileProtection;
