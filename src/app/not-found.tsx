import { AlertCircle } from "lucide-react"
import { ErrorDisplay } from "~/components/error-display"

export default function NotFoundPage() {
    return <ErrorDisplay
        icon={<AlertCircle className="h-16 w-16 text-destructive" />}
        title="Halaman tidak ditemukan"
        message="Halaman yang Anda cari tidak ditemukan. Silakan coba kembali atau hubungi kami jika Anda merasa ini adalah kesalahan."
    />
}