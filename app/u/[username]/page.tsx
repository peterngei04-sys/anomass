import type { Metadata } from "next";
import PublicMessageClient from "./PublicMessageClient";

const SITE_URL = "https://anomass.vercel.app";

type PageProps = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { username: rawUsername } = await params;
  const username = decodeURIComponent(rawUsername).toLowerCase();

  const title = `Send an anonymous message to @${username}`;
  const description =
    `Have something to say to @${username}? Send an anonymous message on Anomass. No names attached.`;
  const url = `${SITE_URL}/u/${encodeURIComponent(username)}`;
  const image = `${SITE_URL}/opengraph-image`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Anomass",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "Anomass — anonymous messages, real feelings.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default function PublicMessagePage() {
  return <PublicMessageClient />;
}
