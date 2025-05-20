import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

export async function createPost(req: AuthenticatedRequest, res: Response) {
  const { title, content, image } = req.body;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        image,
        authorId: req.userId!,
      },
    });

    return res.status(201).json(post);
  } catch (err) {
    return res.status(500).json({ message: "Erro ao criar post." });
  }
}

export async function getAllPosts(req: Request, res: Response) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { publishedAt: "desc" },
    });

    return res.json(posts);
  } catch (err) {
    return res.status(500).json({ message: "Erro ao listar posts." });
  }
}

export async function getPostById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
      include: { author: true },
    });

    if (!post) return res.status(404).json({ message: "Post não encontrado." });

    return res.json(post);
  } catch (err) {
    return res.status(500).json({ message: "Erro ao buscar post." });
  }
}

export async function deletePost(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({ where: { id: Number(id) } });

    if (!post || post.authorId !== req.userId)
      return res.status(403).json({ message: "Acesso negado." });

    await prisma.post.delete({ where: { id: Number(id) } });

    return res.json({ message: "Post deletado com sucesso." });
  } catch (err) {
    return res.status(500).json({ message: "Erro ao deletar post." });
  }
}
