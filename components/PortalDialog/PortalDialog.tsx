'use client';

import React, { useCallback, useState } from 'react';

type DialogVariant = 'info' | 'success' | 'danger';
type DialogMode = 'alert' | 'confirm';

interface DialogOptions {
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: DialogVariant;
}

interface DialogState extends Required<Pick<DialogOptions, 'title' | 'confirmText' | 'cancelText' | 'variant'>> {
  mode: DialogMode;
  message?: string;
  resolve: (value: boolean) => void;
}

const palette = {
  info: {
    iconBg: '#eff6ff',
    iconColor: '#2563eb',
    border: '#bfdbfe',
    button: '#163b63',
  },
  success: {
    iconBg: '#ecfdf5',
    iconColor: '#059669',
    border: '#a7f3d0',
    button: '#059669',
  },
  danger: {
    iconBg: '#fff1f2',
    iconColor: '#e11d48',
    border: '#fecdd3',
    button: '#e11d48',
  },
};

function DialogIcon({ variant }: { variant: DialogVariant }) {
  if (variant === 'success') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (variant === 'danger') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 9v4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M12 17h.01" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
        <path d="M10.3 4.2 2.8 17a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 11v6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12 7h.01" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function usePortalDialog() {
  const [dialogState, setDialogState] = useState<DialogState | null>(null);

  const openDialog = useCallback((mode: DialogMode, options: DialogOptions) => {
    return new Promise<boolean>((resolve) => {
      setDialogState({
        mode,
        title: options.title,
        message: options.message,
        confirmText: options.confirmText || (mode === 'confirm' ? 'Confirm' : 'Close'),
        cancelText: options.cancelText || 'Cancel',
        variant: options.variant || 'info',
        resolve,
      });
    });
  }, []);

  const confirmDialog = useCallback((options: DialogOptions) => openDialog('confirm', options), [openDialog]);
  const showAlert = useCallback((options: DialogOptions | string) => {
    const normalized = typeof options === 'string' ? { title: options, variant: 'info' as DialogVariant } : options;
    return openDialog('alert', normalized).then(() => undefined);
  }, [openDialog]);

  const closeDialog = (value: boolean) => {
    const current = dialogState;
    setDialogState(null);
    current?.resolve(value);
  };

  const current = dialogState ? palette[dialogState.variant] : palette.info;
  const dialog = dialogState ? (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 500,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 18,
      background: 'rgba(15, 23, 42, 0.54)',
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{
        width: '100%',
        maxWidth: 430,
        borderRadius: 28,
        background: '#fff',
        border: '1px solid rgba(255,255,255,0.8)',
        boxShadow: '0 28px 80px rgba(15, 23, 42, 0.28)',
        overflow: 'hidden',
        fontFamily: "var(--font-dm-sans-var), 'DM Sans', sans-serif",
      }}>
        <div style={{ position: 'relative', padding: 28 }}>
          <button
            type="button"
            onClick={() => closeDialog(false)}
            aria-label="Close dialog"
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              width: 36,
              height: 36,
              border: '1px solid #e5e7eb',
              borderRadius: 14,
              background: '#fff',
              color: '#64748b',
              cursor: 'pointer',
              fontSize: 20,
              lineHeight: '1',
            }}
          >
            x
          </button>

          <div style={{
            width: 58,
            height: 58,
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: current.iconColor,
            background: current.iconBg,
            border: `1px solid ${current.border}`,
            marginBottom: 20,
          }}>
            <DialogIcon variant={dialogState.variant} />
          </div>

          <h3 style={{ margin: 0, paddingRight: 44, fontSize: 22, lineHeight: 1.2, color: '#0f172a', fontWeight: 900 }}>
            {dialogState.title}
          </h3>
          {dialogState.message && (
            <p style={{ margin: '10px 0 0', color: '#64748b', fontSize: 14, lineHeight: 1.6, fontWeight: 600 }}>
              {dialogState.message}
            </p>
          )}

          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 28, flexWrap: 'wrap' }}>
            {dialogState.mode === 'confirm' && (
              <button
                type="button"
                onClick={() => closeDialog(false)}
                style={{
                  padding: '12px 18px',
                  borderRadius: 16,
                  border: '1px solid #e2e8f0',
                  background: '#fff',
                  color: '#475569',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                {dialogState.cancelText}
              </button>
            )}
            <button
              type="button"
              onClick={() => closeDialog(true)}
              style={{
                padding: '12px 18px',
                borderRadius: 16,
                border: 0,
                background: current.button,
                color: '#fff',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '0 12px 28px rgba(15, 23, 42, 0.18)',
              }}
            >
              {dialogState.confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return { dialog, confirmDialog, showAlert };
}
