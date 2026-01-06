// Serializable types for passing from Server to Client Components
// Avoids Prisma Decimal serialization issues

export interface ProductImage {
  id: string;
  url: string;
  publicId: string;
  productId: string | null;
  createdAt: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductBrand {
  id: string;
  name: string;
  imageUrl: string | null;
  imagePublicId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductInventory {
  id: string;
  productId: string;
  stock: number;
  reservedStock: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductWithDetails {
  id: string;
  name: string;
  description: string | null;
  price: string; // Serialized from Decimal
  categoryId: string | null;
  brandId: string | null;
  purposeId: string | null;
  hasVariants: boolean;
  status: string;
  isArchived: boolean;
  priority: number;
  version: number;
  createdAt: string;
  updatedAt: string;
  images: ProductImage[];
  category: ProductCategory | null;
  brand: ProductBrand | null;
  inventory?: ProductInventory | null;
}

export interface CategoryWithCount {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  _count: {
    products: number;
  };
}

// Helper function to serialize Prisma data
export function serializeProduct(product: unknown): ProductWithDetails {
  const p = product as Record<string, unknown>;
  return {
    ...p,
    price: p.price?.toString() || "0",
    createdAt: (p.createdAt as Date)?.toISOString() || "",
    updatedAt: (p.updatedAt as Date)?.toISOString() || "",
    images: ((p.images as unknown[]) || []).map((img: unknown) => {
      const i = img as Record<string, unknown>;
      return {
        ...i,
        createdAt: (i.createdAt as Date)?.toISOString() || "",
      };
    }),
    category: p.category
      ? {
          ...(p.category as Record<string, unknown>),
          createdAt:
            (
              (p.category as Record<string, unknown>).createdAt as Date
            )?.toISOString() || "",
          updatedAt:
            (
              (p.category as Record<string, unknown>).updatedAt as Date
            )?.toISOString() || "",
        }
      : null,
    brand: p.brand
      ? {
          ...(p.brand as Record<string, unknown>),
          createdAt:
            (
              (p.brand as Record<string, unknown>).createdAt as Date
            )?.toISOString() || "",
          updatedAt:
            (
              (p.brand as Record<string, unknown>).updatedAt as Date
            )?.toISOString() || "",
        }
      : null,
    inventory: p.inventory
      ? {
          ...(p.inventory as Record<string, unknown>),
          createdAt:
            (
              (p.inventory as Record<string, unknown>).createdAt as Date
            )?.toISOString() || "",
          updatedAt:
            (
              (p.inventory as Record<string, unknown>).updatedAt as Date
            )?.toISOString() || "",
        }
      : null,
  } as ProductWithDetails;
}

export function serializeCategory(category: unknown): CategoryWithCount {
  const c = category as Record<string, unknown>;
  return {
    ...c,
    createdAt: (c.createdAt as Date)?.toISOString() || "",
    updatedAt: (c.updatedAt as Date)?.toISOString() || "",
  } as CategoryWithCount;
}
