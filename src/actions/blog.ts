"use server";
import { createAdminClient, createSessionClient } from "@/lib/appwrite/config";
import { ID, Query } from "node-appwrite";
import {
  blogPostSchema,
  type BlogPost,
  updateBlogPostSchema,
  type BlogPostFilter,
  blogCategorySchema,
  type BlogCategory,
  blogAuthorSchema,
  type BlogAuthor,
  blogCommentSchema,
  type BlogComment,
} from "@/schemas/blog";
import { COLLECTIONS, DATABASE_ID } from "@/lib/appwrite/enviroments";

// Posts
export async function createBlogPost(postData: BlogPost) {
  const validatedData = blogPostSchema.parse(postData);

  const { databases } = await createAdminClient();
  try {
    return await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.blog, // Corrigido de blog_posts para blog
      ID.unique(),
      validatedData
    );
  } catch (error) {
    console.error("Erro ao criar post:", error);
    throw error;
  }
}

export async function getBlogPosts(filter?: BlogPostFilter) {
  const { databases } = await createSessionClient();
  try {
    const queries: string[] = [];

    if (filter) {
      if (filter.status) queries.push(Query.equal("status", filter.status));
      if (filter.categoryId)
        queries.push(Query.equal("categoryId", filter.categoryId));
      if (filter.authorId)
        queries.push(Query.equal("authorId", filter.authorId));
      if (filter.featured)
        queries.push(Query.equal("settings.featured", filter.featured));
      if (filter.fromDate)
        queries.push(Query.greaterThan("publishedAt", filter.fromDate));
      if (filter.toDate)
        queries.push(Query.lessThan("publishedAt", filter.toDate));
      if (filter.tags?.length)
        queries.push(Query.contains("tags", filter.tags));
      if (filter.search) {
        queries.push(Query.search("title", filter.search));
        queries.push(Query.search("content", filter.search));
      }
    }

    const posts = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.blog, // Corrigido de blog_posts para blog
      queries
    );
    return posts as unknown as {
      documents: BlogPost[];
    };
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    throw error;
  }
}

export async function getBlogPost(id: string) {
  const { databases } = await createSessionClient();
  try {
    return await databases.getDocument(DATABASE_ID, COLLECTIONS.blog, id);
  } catch (error) {
    console.error("Erro ao buscar post:", error);
    throw error;
  }
}

export async function updateBlogPost(id: string, postData: Partial<BlogPost>) {
  const validatedData = updateBlogPostSchema.parse(postData);

  const { databases } = await createAdminClient();
  try {
    return await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.blog, // Corrigido de blog_posts para blog
      id,
      validatedData
    );
  } catch (error) {
    console.error("Erro ao atualizar post:", error);
    throw error;
  }
}

export async function deleteBlogPost(id: string) {
  const { databases } = await createAdminClient();
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTIONS.blog, id);
    return true;
  } catch (error) {
    console.error("Erro ao deletar post:", error);
    throw error;
  }
}

// Categories
export async function createBlogCategory(categoryData: BlogCategory) {
  const validatedData = blogCategorySchema.parse(categoryData);

  const { databases } = await createAdminClient();
  try {
    return await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.blog_categories,
      ID.unique(),
      validatedData
    );
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    throw error;
  }
}

export async function getBlogCategories() {
  const { databases } = await createSessionClient();
  try {
    return await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.blog_categories
    );
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    throw error;
  }
}

// Authors
export async function createBlogAuthor(authorData: BlogAuthor) {
  const validatedData = blogAuthorSchema.parse(authorData);

  const { databases } = await createAdminClient();
  try {
    return await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.blog_authors,
      ID.unique(),
      validatedData
    );
  } catch (error) {
    console.error("Erro ao criar autor:", error);
    throw error;
  }
}

export async function getBlogAuthors() {
  const { databases } = await createSessionClient();
  try {
    return await databases.listDocuments(DATABASE_ID, COLLECTIONS.blog_authors);
  } catch (error) {
    console.error("Erro ao buscar autores:", error);
    throw error;
  }
}

// Comments
export async function createBlogComment(commentData: BlogComment) {
  const validatedData = blogCommentSchema.parse(commentData);

  const { databases } = await createAdminClient();
  try {
    return await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.blog_comments,
      ID.unique(),
      validatedData
    );
  } catch (error) {
    console.error("Erro ao criar comentário:", error);
    throw error;
  }
}

export async function getBlogComments(postId: string) {
  const { databases } = await createSessionClient();
  try {
    return await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.blog_comments,
      [Query.equal("postId", postId)]
    );
  } catch (error) {
    console.error("Erro ao buscar comentários:", error);
    throw error;
  }
}

export async function updateBlogComment(
  id: string,
  status: "approved" | "rejected"
) {
  const { databases } = await createAdminClient();
  try {
    return await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.blog_comments,
      id,
      { status }
    );
  } catch (error) {
    console.error("Erro ao atualizar comentário:", error);
    throw error;
  }
}

// Utilities
export async function incrementBlogPostViews(id: string) {
  const { databases } = await createAdminClient();
  try {
    const post = await databases.getDocument(DATABASE_ID, COLLECTIONS.blog, id);
    return await databases.updateDocument(DATABASE_ID, COLLECTIONS.blog, id, {
      viewsCount: (post.viewsCount || 0) + 1,
    });
  } catch (error) {
    console.error("Erro ao incrementar visualizações:", error);
    throw error;
  }
}
