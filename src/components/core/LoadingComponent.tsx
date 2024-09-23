import { cn } from "@/lib/utils";


export const LoadingComponent = ({
  loading,
  label = "Loading",
}: {
  loading: boolean;
  label?: string;
}) => {
  if (!loading) return null; 

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80"
      )}
    >
      {/* Loading SVG */}
      <object
        type="image/svg+xml"
        data={"/loading-img.svg"}
        className="w-36 h-36"
        aria-label="Loading Image"
      />
      
      {/* Label */}
      {label && (
        <p className="mt-4 text-lg font-medium text-red-600">{label}</p>
      )}
    </div>
  );
};
