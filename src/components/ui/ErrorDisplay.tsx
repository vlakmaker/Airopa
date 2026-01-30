import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Button } from "./button";

interface ErrorDisplayProps {
  error: Error;
  retryCallback?: () => void;
  className?: string;
}

export function ErrorDisplay({
  error,
  retryCallback,
  className = ""
}: ErrorDisplayProps) {
  return (
    <Alert variant="destructive" className={className}>
      <AlertTitle>Error Loading Content</AlertTitle>
      <AlertDescription className="flex flex-col gap-2">
        <p>{error.message}</p>
        {retryCallback && (
          <Button
            variant="outline"
            size="sm"
            onClick={retryCallback}
            className="self-start mt-2"
          >
            Try Again
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}