import { AlertCircle } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "~/components/ui/alert"
import { Button } from "./ui/button"


type ErrorAlertProps = {
    title?: string
    message?: string
    buttonFunction?: () => void
    buttonText?: string
}

export const ErrorAlert = ({
    title = "Ups! Terjadi kesalahan",
    message = "Maaf, kami mengalami kesulitan memproses permintaan Anda.",
    buttonFunction,
    buttonText,
}: ErrorAlertProps) => {
    return (
        <Alert variant="destructive">
            <div className="justify-between flex items-center">
                <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 mt-1" />
                    <div>
                        <AlertTitle>
                            {title}
                        </AlertTitle>
                        <AlertDescription>
                            {message}
                        </AlertDescription>
                    </div>
                </div>
                {buttonFunction && buttonText && (
                    <Button variant="outline" size="sm" className="w-fit" onClick={buttonFunction}>
                        {buttonText}
                    </Button>
                )}
            </div>
        </Alert>
    )
}

