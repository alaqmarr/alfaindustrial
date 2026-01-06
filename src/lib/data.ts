import { prisma } from "@/lib/db";
import {
  ProductWithDetails,
  CategoryWithCount,
  serializeProduct,
  serializeCategory,
} from "@/types";

export async function getRecentProducts(
  take = 6
): Promise<ProductWithDetails[]> {
  try {
    const products = await prisma.product.findMany({
      take,
      where: {
        isArchived: false,
      },
      orderBy: { createdAt: "desc" },
      include: {
        images: true,
        category: true,
        brand: true,
        inventory: true,
      },
    });
    return products.map(serializeProduct);
  } catch (error) {
    console.error("Error fetching recent products:", error);
    return [];
  }
}

export async function getRandomProducts(
  take = 6
): Promise<ProductWithDetails[]> {
  try {
    const count = await prisma.product.count({
      where: {
        isArchived: false,
      },
    });

    if (count === 0) return [];

    if (count <= take) {
      return getRecentProducts(take);
    }

    const randomIds = await prisma.$queryRaw<{ id: string }[]>`
      SELECT id FROM "Product" 
      WHERE "isArchived" = false
      ORDER BY RANDOM() 
      LIMIT ${take}
    `;

    const ids = randomIds.map((r) => r.id);

    const products = await prisma.product.findMany({
      where: { id: { in: ids } },
      include: {
        images: true,
        category: true,
        brand: true,
      },
    });

    return products.map(serializeProduct);
  } catch (error) {
    console.warn("Random fetch failed, falling back to recent:", error);
    return getRecentProducts(take);
  }
}

export async function getAllCategories(): Promise<CategoryWithCount[]> {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true },
      },
    },
    orderBy: { name: "asc" },
  });
  return categories.map(serializeCategory);
}

export async function getCategoryById(
  id: string
): Promise<CategoryWithCount | null> {
  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      _count: {
        select: { products: true },
      },
    },
  });
  return category ? serializeCategory(category) : null;
}

export async function getProductsByCategoryId(
  categoryId: string
): Promise<ProductWithDetails[]> {
  const products = await prisma.product.findMany({
    where: {
      categoryId,
      isArchived: false,
    },
    include: {
      images: true,
      category: true,
      brand: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return products.map(serializeProduct);
}

interface ProductFilter {
  search?: string;
  categoryId?: string;
}

export async function getProducts(
  filter: ProductFilter = {}
): Promise<ProductWithDetails[]> {
  const { search, categoryId } = filter;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {
    isArchived: false,
  };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  const products = await prisma.product.findMany({
    where,
    include: {
      images: true,
      category: true,
      brand: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return products.map(serializeProduct);
}

export async function getProductById(
  id: string
): Promise<ProductWithDetails | null> {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        category: true,
        brand: true,
        inventory: true,
      },
    });

    if (!product || product.isArchived) {
      return null;
    }

    return serializeProduct(product);
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}
