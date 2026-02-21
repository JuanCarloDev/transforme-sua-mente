"use client";

import { useEffect, useRef } from "react";

const BOT_PATTERNS = [
  /bot/i, /crawler/i, /spider/i, /scraper/i, /headless/i,
  /phantom/i, /selenium/i, /puppeteer/i, /playwright/i,
  /chrome-lighthouse/i, /pingdom/i, /uptimerobot/i, /gtmetrix/i,
  /googlebot/i, /bingbot/i, /yandexbot/i, /facebookexternalhit/i,
  /twitterbot/i, /linkedinbot/i, /whatsapp/i, /telegrambot/i,
  /slackbot/i, /discordbot/i, /semrushbot/i, /ahrefsbot/i,
];

export function useVisitorTracking() {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) return;

    const track = async () => {
      hasTracked.current = true;

      const ua = navigator.userAgent;
      if (BOT_PATTERNS.some((p) => p.test(ua))) return;
      if (typeof window === "undefined" || !window.screen || !navigator.language) return;

      try {
        await fetch("/api/track-visitor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userAgent: ua,
            referrer: document.referrer,
            timestamp: new Date().toISOString(),
            screen: { width: window.screen.width, height: window.screen.height },
            language: navigator.language,
          }),
        });
      } catch (err) {
        console.error("Erro no tracking:", err);
      }
    };

    setTimeout(track, 500);
  }, []);
}
