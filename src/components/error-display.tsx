"use client"

import { Button } from "~/components/ui/button"
import { Search, RefreshCw } from "lucide-react"

interface ErrorDisplayProps {
    icon?: React.ReactNode
    iconButton?: React.ReactNode
    title?: string
    message?: string
    onReset?: () => void
    buttonText?: string
}

export const ErrorDisplay = ({
    icon = <Search className="h-16 w-16 text-muted-foreground" />,
    iconButton = <RefreshCw className="h-4 w-4 mr-2" />,
    title = "Terjadi kesalahan",
    message = "Tidak dapat memuat data. Silahkan coba lagi.",
    onReset,
    buttonText,
}: ErrorDisplayProps) => {
    return (
        <div className="flex flex-col items-center h-screen justify-center text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
                {icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground mb-4 max-w-md">{message}</p>
            {onReset && buttonText && (
                <Button variant="outline" onClick={onReset}>
                    {iconButton}
                    {buttonText}
                </Button>
            )}
        </div>
    )
}