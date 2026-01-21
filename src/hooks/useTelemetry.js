"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const TelemetryContext = createContext(undefined);

const DEFAULT_METRICS = {
  threatsBlocked: 14214,
  activeScans: 848,
  systemIntegrity: 99.9,
};

const DEFAULT_TRACE = {
  userInput: 'ignore previous instructions',
  blocked: true,
  status: 'blocked: prompt injection detected',
  policy: 'policy: response sanitized',
};

export function TelemetryProvider({ children }) {
  const [metrics, setMetrics] = useState(DEFAULT_METRICS);
  const [lastTrace, setLastTrace] = useState(DEFAULT_TRACE);
  const [statusText, setStatusText] = useState("PROMPT INJECTION BLOCKED");

  const recordEvent = useCallback(({ input, blocked }) => {
    setMetrics((prev) => ({
      threatsBlocked: prev.threatsBlocked + (blocked ? 1 : 0),
      activeScans: prev.activeScans + 1,
      systemIntegrity: prev.systemIntegrity,
    }));

    const status = blocked ? "blocked: prompt injection detected" : "allowed: request processed";
    const policy = blocked ? "policy: response sanitized" : "policy: response allowed";
    setLastTrace({
      userInput: input,
      blocked,
      status,
      policy,
    });
    setStatusText(blocked ? "PROMPT INJECTION BLOCKED" : "SYSTEM ACTIVE");
  }, []);

  const telemetryUrl = process.env.NEXT_PUBLIC_TELEMETRY_URL;

  useEffect(() => {
    if (!telemetryUrl) return;
    let isActive = true;

    const fetchTelemetry = async () => {
      try {
        const response = await fetch(telemetryUrl, { cache: "no-store" });
        if (!response.ok) return;
        const data = await response.json();
        if (!isActive) return;
        if (data.metrics) {
          setMetrics((prev) => ({ ...prev, ...data.metrics }));
        }
        if (data.lastTrace) {
          setLastTrace((prev) => ({ ...prev, ...data.lastTrace }));
        }
        if (data.statusText) {
          setStatusText(data.statusText);
        }
      } catch (err) {
        // Ignore telemetry fetch errors until backend is configured.
      }
    };

    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 5000);
    return () => {
      isActive = false;
      clearInterval(interval);
    };
  }, [telemetryUrl]);

  const value = useMemo(
    () => ({
      metrics,
      lastTrace,
      statusText,
      recordEvent,
    }),
    [metrics, lastTrace, statusText, recordEvent]
  );

  return <TelemetryContext.Provider value={value}>{children}</TelemetryContext.Provider>;
}

export function useTelemetry() {
  const context = useContext(TelemetryContext);
  if (!context) {
    throw new Error("useTelemetry must be used within TelemetryProvider");
  }
  return context;
}
