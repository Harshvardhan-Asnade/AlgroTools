import { Wrench } from "lucide-react";

export default function PlaceholderTool() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 min-h-[300px] rounded-lg border-2 border-dashed">
      <Wrench className="w-16 h-16 text-muted-foreground mb-4" />
      <h2 className="text-2xl font-bold text-foreground">Tool Coming Soon!</h2>
      <p className="mt-2 text-muted-foreground">
        This tool is currently under construction. Check back later!
      </p>
    </div>
  );
}
