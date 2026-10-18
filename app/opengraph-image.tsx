import { ImageResponse } from "next/og";

export const alt = "Anomass — anonymous messages, real feelings.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "76px",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #fff1f7 0%, #f8eaff 48%, #eee8ff 100%)",
          color: "#25143b",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "430px",
            height: "430px",
            borderRadius: "50%",
            background: "#f9b8dc",
            opacity: 0.42,
            right: "-90px",
            top: "-130px",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background: "#c9b5ff",
            opacity: 0.45,
            right: "90px",
            bottom: "-180px",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            fontSize: "34px",
            fontWeight: 800,
            letterSpacing: "-1px",
          }}
        >
          <div
            style={{
              width: "58px",
              height: "58px",
              borderRadius: "19px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #f05aa6, #8b5cf6)",
              color: "white",
              fontSize: "36px",
            }}
          >
            a.
          </div>
          anomass
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "48px",
            maxWidth: "900px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "23px",
              fontWeight: 700,
              letterSpacing: "4px",
              color: "#9251b8",
            }}
          >
            YOUR WORDS. YOUR WAY.
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "15px",
              fontSize: "76px",
              lineHeight: 1.08,
              fontWeight: 800,
              letterSpacing: "-3px",
            }}
          >
            <span>Say what you feel.</span>
            <span style={{ color: "#a344cf" }}>Keep your name out.</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "28px",
              fontSize: "27px",
              color: "#66556f",
            }}
          >
            Get honest messages. No names attached.
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            right: "78px",
            bottom: "55px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "30px",
            padding: "14px 24px",
            background: "#ffffffcc",
            color: "#7540ad",
            fontSize: "21px",
            fontWeight: 700,
          }}
        >
          anomass.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
