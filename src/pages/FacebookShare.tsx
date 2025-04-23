import React, { useEffect } from "react";

// Extend the Window interface to include fbAsyncInit
declare global {
  interface Window {
    fbAsyncInit?: () => void;
    FB?: any;
  }
}

const FacebookShare: React.FC = () => {
  useEffect(() => {
    // Load the Facebook SDK
    if (!window.FB) {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: "688096043671560", // 🔁 שימי את ה-App ID האמיתי שלך
          xfbml: true,
          status: true,
          version: "v22.0", // גרסה עדכנית
        });
      };

      // const script = document.createElement("script");
      // script.src = "https://connect.facebook.net/en_US/sdk.js";
      // script.async = true;
      // document.body.appendChild(script);
    }
  }, []);

  const handleFBShare = () => {
    if (!window.FB) {
      alert("Facebook SDK not loaded yet.");
      return;
    }

    window.FB.ui(
      {
        method: "share",
        display: "popup",
        // method: 'share_open_graph',
        // action_type: 'og.likes',
        // action_properties: JSON.stringify({
        //     object:'https://developers.facebook.com/docs/',
        // })

        href: "https://www.izkor.gov.il/facebook/memory/a9c2e6e8-2c97-4c7d-84b8-c003d8e875c2", // 🖼 כתובת הדף שאת משתפת
      },
      function (response: any) {
        if (response && !response.error_message) {
          alert("Shared successfully");
        } else {
          alert("Error while sharing.");
        }
      }
    );
  };

  return <button onClick={handleFBShare}>שיתוף בפייסבוק</button>;
};

export default FacebookShare;
