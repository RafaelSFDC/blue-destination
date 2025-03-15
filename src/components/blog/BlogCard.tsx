import Link from "next/link";
import Image from "next/image";
import { CalendarIcon, Clock } from "lucide-react";
import { BlogPost } from "@/schemas/blog";

export function BlogCard({ blog }: { blog: BlogPost }) {
  return (
    <Link href={`/blog/${blog.$id}`}>
      <article className="group overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md">
        <div className="aspect-video w-full overflow-hidden">
          <Image
            src={blog.featuredImage || "/placeholder.svg"}
            alt={blog.title}
            width={600}
            height={340}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-3 w-3" />
              <span>{blog.publishedAt}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{blog.readingTime}</span>
            </div>
          </div>
          <h3 className="mt-2 line-clamp-2 font-semibold group-hover:text-primary">
            {blog.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {blog.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <Image
              src={blog.author?.avatar || "/placeholder.svg"}
              alt={blog.author?.name || "Author"}
              width={24}
              height={24}
              className="h-6 w-6 rounded-full object-cover"
            />
            <span className="text-xs">{blog.author?.name}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
