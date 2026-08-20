import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1800);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast-notification ${type}`}>
      <div className="toast-icon-circle">
        <span className="toast-check-arrow">✓</span>
      </div>
      <div className="toast-message-text">{message}</div>
      <button type="button" onClick={onClose} className="toast-close-btn">
        ✕
      </button>
    </div>
  );
};

export default Toast;
