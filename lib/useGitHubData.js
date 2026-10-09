"use client";

import { useEffect, useState } from "react";

let pendingRequest = null;

function loadGitHubData() {
  if (!pendingRequest) {
    pendingRequest = fetch("/api/github")
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed with ${response.status}`);
        return response.json();
      })
      .catch((error) => {
        pendingRequest = null;
        throw error;
      });
  }
  return pendingRequest;
}

export function useGitHubData(enabled) {
  const [state, setState] = useState({ status: "idle", data: null });

  useEffect(() => {
    if (!enabled) return undefined;
    let active = true;
    loadGitHubData()
      .then((data) => {
        if (active) setState({ status: "success", data });
      })
      .catch(() => {
        if (active) setState({ status: "error", data: null });
      });
    return () => {
      active = false;
    };
  }, [enabled]);

  return state;
}
