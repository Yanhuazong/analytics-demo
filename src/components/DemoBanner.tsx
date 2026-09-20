import { ReactNode } from "react";

export default function DemoBanner({ children }: { children: ReactNode }) {
  return <div className="demo-banner">{children}</div>;
}
