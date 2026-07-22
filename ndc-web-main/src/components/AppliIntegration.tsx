"use client";

import { useEffect } from "react";

export default function AppliIntegration() {
  useEffect(() => {
    // Function to remove the modal and its close button
    const handleCloseModal = () => {
      const host = document.querySelector("appli-integration");
      const closeBtn = document.querySelector("#custom-appli-close-btn");
      if (host) host.remove();
      if (closeBtn) closeBtn.remove();
    };

    // Function to inject styles and trigger click
    const initializeAndOpen = (host: HTMLElement) => {
      // Create and inject custom close button
      if (!document.querySelector("#custom-appli-close-btn")) {
        const closeBtn = document.createElement("button");
        closeBtn.id = "custom-appli-close-btn";
        closeBtn.innerHTML = "✕";
        closeBtn.style.cssText = `
          position: fixed;
          top: 15px;
          right: 15px;
          z-index: 2147483647;
          background: #ff0000;
          color: white;
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          cursor: pointer;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 5px rgba(0,0,0,0.5);
          transition: transform 0.2s;
        `;
        closeBtn.onmouseover = () => closeBtn.style.transform = "scale(1.1)";
        closeBtn.onmouseout = () => closeBtn.style.transform = "scale(1)";
        closeBtn.onclick = handleCloseModal;
        document.body.appendChild(closeBtn);
      }

      // Styling logic: Wait for shadowRoot and inject styles
      const styleInterval = setInterval(() => {
        if (host.shadowRoot) {
          if (!host.shadowRoot.querySelector("#custom-appli-styles")) {
            const style = document.createElement("style");
            style.id = "custom-appli-styles";
            style.textContent = `
              div[style*="fixed"] {
                padding: 0 !important;
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
              }
              div[style*="fixed"] > div {
                width: 100% !important;
                max-width: 100% !important;
                border-radius: 0 !important;
                height: 100vh !important;
                margin: 0 !important;
              }
              iframe {
                width: 100% !important;
                height: 100% !important;
              }
            `;
            host.shadowRoot.appendChild(style);

            // Trigger the click once styles are ready
            const button = host.shadowRoot.querySelector("button");
            if (button) {
              button.click();
            }
            clearInterval(styleInterval);
          }
        }
      }, 100);

      // Backup click attempt if styles already exist
      setTimeout(() => {
        if (host.shadowRoot) {
          const button = host.shadowRoot.querySelector("button");
          if (button) button.click();
        }
      }, 500);
    };

    // Event listener logic: Listen for custom event to open the modal
    const handleOpenModal = () => {
      let host = document.querySelector("appli-integration") as HTMLElement;

      if (!host) {
        host = document.createElement("appli-integration");
        host.setAttribute("id", "68afee1c37e33175ed91cb17");
        document.body.appendChild(host);
        initializeAndOpen(host);
      } else {
        // If already exists, just try to click the button
        if (host.shadowRoot) {
          const button = host.shadowRoot.querySelector("button");
          if (button) {
            button.click();
            // Re-ensure close button exists if modal re-opens
            if (!document.querySelector("#custom-appli-close-btn")) {
              initializeAndOpen(host);
            }
          }
        }
      }
    };

    window.addEventListener("open-appli-modal", handleOpenModal);

    return () => {
      window.removeEventListener("open-appli-modal", handleOpenModal);
      handleCloseModal();
    };
  }, []);

  return null;
}
