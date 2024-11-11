import localFont from "next/font/local";
import HomePage from "@/src/components/home/home-page";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home({ data }) {
  return (
    <>
      <div>
        <HomePage data={data} />
      </div>
    </>
  );
}


export async function getServerSideProps() {
  const { events_categories } = await import('/data/data.json');

  return {
    props: {
      data: events_categories,
    },
  };
}