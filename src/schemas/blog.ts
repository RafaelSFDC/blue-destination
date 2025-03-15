import { z } from "zod";

// Schema para categorias
export const blogCategorySchema = z.object({
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
  slug: z.string().min(2, "Slug deve ter no mínimo 2 caracteres"),
  description: z.string().optional(),
  parentId: z.string().optional(),
  icon: z.string().optional(),
  color: z.string().optional(),
});

// Schema para SEO metadata
const seoMetadataSchema = z.object({
  title: z.string().optional(),
  description: z
    .string()
    .max(160, "Meta description deve ter no máximo 160 caracteres")
    .optional(),
  keywords: z.array(z.string()).optional(),
  ogImage: z.string().url("URL da imagem OG inválida").optional(),
});

// Schema para conteúdo rico (seções do post)
const contentSectionSchema = z.object({
  type: z.enum(["text", "image", "video", "quote", "code"]),
  content: z.string(),
  metadata: z.record(z.string()).optional(),
});

// Schema para autores
export const blogAuthorSchema = z.object({
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  bio: z.string().optional(),
  avatar: z.string().url("URL do avatar inválida").optional(),
  role: z
    .enum(["admin", "editor", "author", "contributor"])
    .default("contributor"),
  socialLinks: z
    .object({
      twitter: z.string().url("URL do Twitter inválida").optional(),
      linkedin: z.string().url("URL do LinkedIn inválida").optional(),
      instagram: z.string().url("URL do Instagram inválida").optional(),
    })
    .optional(),
});

// Schema principal do post
export const blogPostSchema = z.object({
  $id: z.string().optional(),
  title: z.string().min(3, "Título deve ter no mínimo 3 caracteres"),
  slug: z.string().min(3, "Slug deve ter no mínimo 3 caracteres"),
  excerpt: z.string().max(300, "Resumo deve ter no máximo 300 caracteres"),
  content: z.array(contentSectionSchema),
  featuredImage: z.string().url("URL da imagem inválida"),
  status: z.enum(["draft", "review", "published", "archived"]).default("draft"),
  publishedAt: z
    .string()
    .datetime("Data de publicação inválida")
    .default(new Date().toISOString()),
  scheduledFor: z.string().datetime("Data de agendamento inválida").optional(),
  tags: z.array(z.string()).default([]),
  seo: seoMetadataSchema.default({}),
  readingTime: z.number().min(1).optional(),
  viewsCount: z.number().default(0),
  relatedContent: z
    .object({
      destinations: z.array(z.string()).optional(),
      packages: z.array(z.string()).optional(),
    })
    .optional(),
  settings: z
    .object({
      allowComments: z.boolean().default(true),
      featured: z.boolean().default(false),
      pinned: z.boolean().default(false),
    })
    .default({}),
  author: blogAuthorSchema.optional(),
  categories: z.array(blogCategorySchema).optional(),
});

// Schema para comentários
export const blogCommentSchema = z.object({
  postId: z.string().min(1, "Post é obrigatório"),
  userId: z.string().min(1, "Usuário é obrigatório"),
  content: z.string().min(1, "Conteúdo é obrigatório"),
  status: z.enum(["pending", "approved", "rejected"]).default("pending"),
  parentId: z.string().optional(),
  createdAt: z
    .string()
    .datetime()
    .default(() => new Date().toISOString()),
});

// Schemas para filtros
export const blogPostFilterSchema = z.object({
  status: z.enum(["draft", "review", "published", "archived"]).optional(),
  categoryId: z.string().optional(),
  authorId: z.string().optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
  search: z.string().optional(),
});

// Types
export type BlogPost = z.infer<typeof blogPostSchema>;
export type BlogCategory = z.infer<typeof blogCategorySchema>;
export type BlogAuthor = z.infer<typeof blogAuthorSchema>;
export type BlogComment = z.infer<typeof blogCommentSchema>;
export type BlogPostFilter = z.infer<typeof blogPostFilterSchema>;

// Schemas para atualizações parciais
export const updateBlogPostSchema = blogPostSchema.partial();
export const updateBlogCategorySchema = blogCategorySchema.partial();
export const updateBlogAuthorSchema = blogAuthorSchema.partial();
export const updateBlogCommentSchema = blogCommentSchema.partial();
