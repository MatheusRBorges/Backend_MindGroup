import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

export const Like = async (req: AuthenticatedRequest, res: Response) => {
  const postId = Number(req.params.id);
  const userId = req.userId;

  if (!userId) return res.status(401).json({ message: "Não autenticado." });

  try {
    const existing = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existing) {
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
      return res.json({ liked: false });
    } else {
      await prisma.like.create({
        data: {
          userId,
          postId,
        },
      });
      return res.json({ liked: true });
    }
  } catch (err) {
    return res.status(500).json({ message: "Erro ao processar like." });
  }
};

export const getContarLike = async (req: Request, res: Response) => {
  const postId = Number(req.params.id);

  try {
    const count = await prisma.like.count({ where: { postId } });
    return res.json({ count });
  } catch (err) {
    return res.status(500).json({ message: "Erro ao buscar likes." });
  }
};

export const hasUserLiked = async (req: AuthenticatedRequest, res: Response) => {
  const postId = Number(req.params.id);
  const userId = req.userId;

  if (!userId) return res.status(401).json({ message: "Não autenticado." });

  try {
    const like = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
    return res.json({ liked: !!like });
  } catch (err) {
    return res.status(500).json({ message: "Erro ao verificar like." });
  }
};

export const deletePost = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({ where: { id: Number(id) } });

    if (!post || post.authorId !== req.userId) {
      return res.status(403).json({ message: "Acesso negado." });
    }

    await prisma.like.deleteMany({ where: { postId: Number(id) } });
    await prisma.post.delete({ where: { id: Number(id) } });

    return res.json({ message: "Post deletado com sucesso." });
  } catch (err) {
    console.error("Erro em deletePost:", err);
    return res.status(500).json({ message: "Erro ao deletar post." });
  }
};
