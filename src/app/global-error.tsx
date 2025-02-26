'use client'
import { RefreshCw, ServerCrash } from "lucide-react"
import { ErrorDisplay } from "~/components/error-display"

// Error boundaries must be Client Components

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        // global-error must include html and body tags
        <html>
            <body>
                <ErrorDisplay
                    icon={<ServerCrash className="h-16 w-16 text-muted-foreground" />}
                    title="Terjadi kesalahan"
                    message={error.digest ? `Error ID: ${error.digest}` : error.message}
                    iconButton={<RefreshCw className="h-4 w-4 mr-2" />}
                    buttonText="Coba lagi"
                    onReset={reset}
                />
            </body>
        </html>
    )
}