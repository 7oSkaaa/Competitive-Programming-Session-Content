import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface BackLinkProps {
  fallback?: string;
  label: string;
  className?: string;
}

export default function BackLink({
  fallback = "/",
  label,
  className,
}: BackLinkProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => {
        const idx = window.history.state?.idx;
        if (typeof idx === "number" && idx > 0) {
          navigate(-1);
        } else {
          navigate(fallback);
        }
      }}
      className={className}
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </button>
  );
}
