import Link from "next/link";
import { Category } from "@/schemas/categories";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/categoria/${category.$id}`}>
      <div className="group relative overflow-hidden rounded-lg">
        <div className="aspect-square w-full overflow-hidden">
          {/* <Icon className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" /> */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <h3 className="text-lg font-bold">{category.name}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
}
