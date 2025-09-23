import dynamic from "next/dynamic";

// Render client-wrapped admin dashboard to avoid Turbopack issues
const AdminClient = dynamic(() => import("./admin-client"), { ssr: false });

export default function AdminRoute() {
  return <AdminClient />;
}
