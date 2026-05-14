import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'rate_limited';

interface EmailCaptureProps {
  /** Visual treatment. `light` for dark backgrounds (Hero, CTA on black). `dark` for light backgrounds. */
  tone?: 'light' | 'dark';
  /** Inline label rendered as a small uppercase kicker above the input. */
  label?: string;
  /** Override the submit button copy. */
  submitLabel?: string;
  /** Override success copy. */
  successText?: string;
  /** Optional className passed to the wrapping form. */
  className?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EmailCapture({
  tone = 'dark',
  label,
  submitLabel = 'Get Early Access',
  successText = "You're on the list. Confirmation in your inbox.",
  className,
}: EmailCaptureProps) {
  const endpoint = import.meta.env.VITE_EMAIL_ENDPOINT as string | undefined;
  const endpointConfigured = typeof endpoint === 'string' && endpoint.length > 0;

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const isLight = tone === 'light';

  const inputClasses = isLight
    ? 'bg-transparent border-neutral-700 text-white placeholder:text-neutral-500 focus:border-white'
    : 'bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-black dark:text-white placeholder:text-neutral-400 focus:border-black dark:focus:border-white';

  const buttonClasses = isLight
    ? 'bg-white text-black hover:bg-neutral-200'
    : 'bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200';

  const labelClasses = isLight
    ? 'text-neutral-400'
    : 'text-neutral-500 dark:text-neutral-400';

  const helpClasses = isLight
    ? 'text-neutral-500'
    : 'text-neutral-500 dark:text-neutral-400';

  const errorClasses = isLight ? 'text-red-400' : 'text-red-600 dark:text-red-400';

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!EMAIL_RE.test(trimmed)) {
      setStatus('error');
      setMessage('That email doesn’t look right.');
      return;
    }

    if (!endpointConfigured) {
      setStatus('error');
      setMessage('Email signup is not configured yet. Try again soon.');
      return;
    }

    setStatus('submitting');
    setMessage(null);

    try {
      const res = await fetch(endpoint!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });

      if (res.status === 429) {
        setStatus('rate_limited');
        setMessage('Too many attempts. Try again in a few minutes.');
        return;
      }

      if (!res.ok) {
        setStatus('error');
        setMessage('Something went wrong on our end. Try again in a minute.');
        return;
      }

      setStatus('success');
      setMessage(null);
    } catch {
      setStatus('error');
      setMessage('Network error. Check your connection and try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className ?? ''} noValidate>
      {label && (
        <div className={`mb-2 text-[10px] font-mono font-bold uppercase tracking-widest ${labelClasses}`}>
          {label}
        </div>
      )}

      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={`flex items-center gap-3 text-sm font-medium ${isLight ? 'text-white' : 'text-black dark:text-white'}`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center ${isLight ? 'bg-white text-black' : 'bg-black text-white dark:bg-white dark:text-black'}`}>
              <Check className="w-3.5 h-3.5" />
            </span>
            <span>{successText}</span>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row gap-2 max-w-md">
              <input
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error' || status === 'rate_limited') {
                    setStatus('idle');
                    setMessage(null);
                  }
                }}
                placeholder="you@example.com"
                aria-label="Email address"
                disabled={status === 'submitting'}
                className={`flex-1 px-4 py-3 text-sm border focus:outline-none transition-colors disabled:opacity-60 ${inputClasses}`}
              />
              <button
                type="submit"
                disabled={status === 'submitting'}
                className={`flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-60 shrink-0 ${buttonClasses}`}
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Submitting
                  </>
                ) : (
                  <>
                    {submitLabel}
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>

            {message && (status === 'error' || status === 'rate_limited') ? (
              <p className={`mt-2 text-xs ${errorClasses}`}>{message}</p>
            ) : (
              <p className={`mt-2 text-xs ${helpClasses}`}>
                We'll email when testnet ships. No newsletters, no drip campaigns.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
