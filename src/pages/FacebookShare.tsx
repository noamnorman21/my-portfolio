// import React, { useEffect } from "react";

// // Extend the Window interface to include fbAsyncInit
// declare global {
//   interface Window {
//     fbAsyncInit?: () => void;
//     FB?: any;
//   }
// }

// const FacebookShare: React.FC = () => {
//   useEffect(() => {
//     // Load the Facebook SDK
//     if (!window.FB) {
//       window.fbAsyncInit = function () {
//         window.FB.init({
//           appId: "688096043671560", // 🔁 שימי את ה-App ID האמיתי שלך
//           xfbml: true,
//           version: "v19.0", // גרסה עדכנית
//         });
//       };

//       const script = document.createElement("script");
//       script.src = "https://connect.facebook.net/en_US/sdk.js";
//       script.async = true;
//       document.body.appendChild(script);
//     }
//   }, []);

//   const handleFBShare = () => {
//     if (!window.FB) {
//       alert("Facebook SDK not loaded yet.");
//       return;
//     }

//     window.FB.ui(
//       {
//         method: "share",
//         href: "https://www.izkor.gov.il/facebook/memory/a9c2e6e8-2c97-4c7d-84b8-c003d8e875c2", // 🖼 כתובת הדף שאת משתפת
//       },
//       function (response: any) {
//         if (response && !response.error_message) {
//           alert("Shared successfully");
//         } else {
//           alert("Error while sharing.");
//         }
//       }
//     );
//   };

//   return <button onClick={handleFBShare}>שיתוף בפייסבוק</button>;
// };

// export default FacebookShare;

import React from "react";

const FacebookShareButton = () => {
  const fbAppUrl =
    "fb://facewebmodal/f?href=https://www.izkor.gov.il/facebook/memory/a9c2e6e8-2c97-4c7d-84b8-c003d8e875c2"; // קישור לאפליקציה
  const fbWebUrl =
    "https://www.facebook.com/sharer/sharer.php?u=https://www.izkor.gov.il/facebook/memory/a9c2e6e8-2c97-4c7d-84b8-c003d8e875c2"; // קישור לדפדפן

  const handleShare = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // אם זה מכשיר נייד, מנסה לפתוח באפליקציה
      window.open(fbAppUrl);

      // אם לא נפתח אחרי 1.5 שניות, פותח את הדף בדפדפן
      setTimeout(() => {
        window.open(fbWebUrl);
        // window.location.href = fbWebUrl;
      }, 1500);
    } else {
      // אם זה דסקטופ, פותח את השיתוף בדפדפן
      window.open(fbWebUrl, "_blank");
    }
  };

  return <button onClick={handleShare}>שיתוף בפייסבוק</button>;
};

export default FacebookShareButton;
