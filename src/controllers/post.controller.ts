import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

export async function createPost(req: AuthenticatedRequest, res: Response) {
  const { title, content } = req.body;
  const image = req.file?.filename;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        image,
        authorId: req.userId!,
      },
      select: {
        id: true,
        title: true,
        content: true,
        image: true,
        publishedAt: true,
        updatedAt: true,
        author: {
          select: { name: true },
        },
      },
    });

    if (!title || title.length > 150 || !content || content.length > 1000) {
      return res.status(400).json({ message: "Título ou conteúdo excede o limite permitido." });
    }

    return res.status(201).json({ message: "Artigo criado com sucesso.", post });
  } catch (err) {
    console.error("Erro em createPost:", err);
    return res.status(500).json({ message: "Erro ao criar post." });
  }
}

export async function getAllPosts(req: Request, res: Response) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        title: true,
        content: true,
        image: true,
        publishedAt: true,
        updatedAt: true,
        author: {
          select: { name: true },
        },
      },
    });

    return res.json(posts);
  } catch (err) {
    console.error("Erro em getAllPosts:", err);
    return res.status(500).json({ message: "Erro ao listar posts." });
  }
}

export async function getPostById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        title: true,
        content: true,
        image: true,
        publishedAt: true,
        updatedAt: true,
        author: {
          select: { name: true },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post não encontrado." });
    }

    return res.json(post);
  } catch (err) {
    console.error("Erro em getPostById:", err);
    return res.status(500).json({ message: "Erro ao buscar post." });
  }
}

export async function deletePost(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({ where: { id: Number(id) } });

    if (!post || post.authorId !== req.userId) {
      return res.status(403).json({ message: "Acesso negado." });
    }

    await prisma.post.delete({ where: { id: Number(id) } });

    return res.json({ message: "Post deletado com sucesso." });
  } catch (err) {
    console.error("Erro em deletePost:", err);
    return res.status(500).json({ message: "Erro ao deletar post." });
  }
}

export async function getMyPosts(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    const posts = await prisma.post.findMany({
      where: { authorId: req.userId },
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        title: true,
        content: true,
        image: true,
        publishedAt: true,
        updatedAt: true,
      },
    });

    return res.json(posts);
  } catch (err) {
    console.error("Erro em getMyPosts:", err);
    return res.status(500).json({ message: "Erro ao buscar seus artigos." });
  }
}

export async function updatePost(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const { title, content, image } = req.body;

  try {
    const post = await prisma.post.findUnique({ where: { id: Number(id) } });

    if (!post || post.authorId !== req.userId) {
      return res.status(403).json({ message: "Acesso negado." });
    }

    const updated = await prisma.post.update({
      where: { id: Number(id) },
      data: { title, content, image },
      select: {
        id: true,
        title: true,
        content: true,
        image: true,
        publishedAt: true,
        updatedAt: true,
      },
    });

    return res.json({ message: "Post atualizado com sucesso.", post: updated });
  } catch (err) {
    console.error("Erro em updatePost:", err);
    return res.status(500).json({ message: "Erro ao atualizar post." });
  }
}
