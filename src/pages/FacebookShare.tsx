import React, { useEffect } from "react";

declare global {
  interface Window {
    fbAsyncInit?: () => void;
    FB?: any;
  }
}

const FacebookShare: React.FC = () => {
  const shareUrl =
    "https://www.izkor.gov.il/facebook/memory/a9c2e6e8-2c97-4c7d-84b8-c003d8e875c2";
  const shareImage =
    "https://izkorimg.azureedge.net/ner/izkor_candle_general_image_v2.jpg";
  const shareText = "לזכר נופלי מערכות ישראל ופעולות האיבה";

  useEffect(() => {
    if (!window.FB) {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: "688096043671560",
          xfbml: true,
          cookie: true,
          version: "v22.0",
        });
      };

      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleFBSDKShare = () => {
    if (!window.FB) {
      alert("Facebook SDK not loaded yet.");
      return;
    }

    window.FB.ui(
      {
        method: "share",
        href: shareUrl,
        display: "popup",
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

  const handleFacebookAppShare = () => {
    // ניסיון לפתוח ישירות באפליקציית פייסבוק
    const fbAppLink = `fb://facewebmodal/f?href=${encodeURIComponent(
      shareUrl
    )}`;
    window.open(fbAppLink, "_blank");
  };

  const handleWebShare = () => {
    const shareRedirectUrl = `https://www.izkor.gov.il/share/a9c2e6e8-2c97-4c7d-84b8-c003d8e875c2`;
    const shareText = "לזכר נופלי מערכות ישראל ופעולות האיבה";

    if (navigator.share) {
      navigator
        .share({
          title: "שיתוף זיכרון",
          text: shareText,
          url: shareRedirectUrl,
        })
        .then(() => console.log("Shared via Web Share API"))
        .catch((err) => console.error("Web Share failed:", err));
    } else {
      alert("השיתוף דרך הדפדפן לא נתמך");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <button onClick={handleFBSDKShare}>שיתוף דרך פייסבוק (דפדפן)</button>
      <button onClick={handleFacebookAppShare}>פתיחה באפליקציית פייסבוק</button>
      <button onClick={handleWebShare}>שיתוף דרך מערכת (Web Share API)</button>
      <a href={shareUrl} target="_blank" rel="noopener noreferrer">
        לשיתוף רגיל (קישור)
      </a>
    </div>
  );
};

export default FacebookShare;
