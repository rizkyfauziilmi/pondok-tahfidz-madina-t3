import { Badge } from "./ui/badge"

export const IsPublishedBadge = ({ isPublished }: { isPublished: boolean }) => {
    if (isPublished) {
        return <Badge className="bg-green-500 text-white">Published</Badge>
    } else {
        return <Badge className="bg-red-500 text-white">Draft</Badge>
    }
}