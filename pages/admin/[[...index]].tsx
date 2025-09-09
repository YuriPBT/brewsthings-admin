import dynamic from "next/dynamic";

const TinaAdmin = dynamic(() => import("tinacms").then(m => m.TinaAdmin), {
  ssr: false,
});

export default function AdminPage() {
  return <TinaAdmin />;
}
