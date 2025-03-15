import { useState, useEffect } from "react";
import {
  addToWishlist,
  removeFromWishlist,
  checkWishlistItem,
} from "@/actions/wishlist";

interface UseWishlistProps {
  itemId: string;
  itemType: "destination" | "package";
  userId?: string;
  onError?: (error: Error) => void;
  onSuccess?: (action: "add" | "remove") => void;
}

export function useWishlist({
  itemId,
  itemType,
  userId,
  onError,
  onSuccess,
}: UseWishlistProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [wishlistItemId, setWishlistItemId] = useState<string | null>(null);

  useEffect(() => {
    async function checkFavorite() {
      if (!userId) return;

      try {
        const item = await checkWishlistItem(userId, itemId, itemType);
        if (item) {
          setIsFavorite(true);
          setWishlistItemId(item.$id);
        }
      } catch (error) {
        console.error("Erro ao verificar favoritos:", error);
        onError?.(error as Error);
      }
    }

    checkFavorite();
  }, [userId, itemId, itemType, onError]);

  const toggleFavorite = async () => {
    if (!userId) return;

    setIsLoading(true);

    try {
      if (isFavorite && wishlistItemId) {
        await removeFromWishlist(wishlistItemId);
        setIsFavorite(false);
        setWishlistItemId(null);
        onSuccess?.("remove");
      } else {
        const item = await addToWishlist(userId, itemId, itemType);
        setIsFavorite(true);
        setWishlistItemId(item.$id);
        onSuccess?.("add");
      }
    } catch (error) {
      console.error("Erro ao atualizar favoritos:", error);
      onError?.(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isFavorite,
    isLoading,
    toggleFavorite,
  };
}
