import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useApp } from "@/lib/app-state";

export function PageHeader({ title, back = "/" }: { title: string; back?: string }) {
  const { lang } = useApp();
  const Arrow = lang === "ar" ? ArrowRight : ArrowLeft;
  return (
    <div className="flex items-center gap-3 px-5 pt-5">
      <Link to={back} className="glass tap-scale flex size-10 items-center justify-center rounded-2xl">
        <Arrow className="size-4" />
      </Link>
      <h1 className="text-lg font-bold tracking-tight">{title}</h1>
    </div>
  );
}
