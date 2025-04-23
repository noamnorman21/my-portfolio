import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const ShareRedirect: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    // תני לו זמן קטן לסרוק את המטא ואז להפנות
    const timeout = setTimeout(() => {
      if (id) {
        window.location.replace(`https://www.izkor.gov.il/fallen/${id}`);
      }
    }, 1000); // שנייה אחת

    return () => clearTimeout(timeout);
  }, [id]);

  const imageUrl =
    "https://izkorimg.azureedge.net/2025/290e4ed8-91e3-4b3d-b6f5-b3fa6516dcbb.jpg";

  return (
    <>
      <Helmet>
        <meta property="og:title" content="נר זיכרון" />
        <meta
          property="og:description"
          content="לזכר נופלי מערכות ישראל ופעולות האיבה"
        />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://www.izkor.gov.il/fallen/${id}`}
        />
      </Helmet>
      <p>מעביר לעמוד ההנצחה...</p>
    </>
  );
};

export default ShareRedirect;
