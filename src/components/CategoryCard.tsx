import Link from "next/link";
import Image from "next/image";

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
  count: number;
}

export function CategoryCard({ id, name, image, count }: CategoryCardProps) {
  return (
    <Link href={`/categoria/${id}`}>
      <div className="group relative overflow-hidden rounded-lg">
        <div className="aspect-square w-full overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={300}
            height={300}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <h3 className="text-lg font-bold">{name}</h3>
            <p className="text-sm">{count} destinos</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
