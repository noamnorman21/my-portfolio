import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const ShareRedirect: React.FC = () => {
  const { id, uuid } = useParams<{ id: string; uuid: string }>();

  const redirectUrl = `https://www.izkor.gov.il/fallen/${uuid}`;
  const imageUrl = `https://izkorimg.azureedge.net/2025/${id}.jpg`; // נניח שכל ID מקבל תמונה משלו

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (id) {
        window.location.replace(redirectUrl);
      }
    }, 1000); // זמן סריקה למטא־תגים

    return () => clearTimeout(timeout);
  }, [id, redirectUrl]);

  return (
    <>
      <Helmet>
        <title>נר זיכרון</title>
        <meta property="og:title" content="נר זיכרון" />
        <meta
          property="og:description"
          content="לזכר נופלי מערכות ישראל ופעולות האיבה"
        />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={redirectUrl} />
      </Helmet>
      <p>מעביר לעמוד ההנצחה...</p>
    </>
  );
};

export default ShareRedirect;
