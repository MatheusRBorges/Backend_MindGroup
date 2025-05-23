import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

const JWT_SECRET = process.env.JWT_SECRET || "segredo_default";

export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "Email já cadastrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
      select: { id: true, name: true, email: true },
    });

    return res.status(201).json({ message: "Usuário criado com sucesso!", user });
  } catch (error) {
    console.error("Erro no register:", error);
    return res.status(500).json({ message: "Erro no servidor." });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(404).json({ message: "Usuário não encontrado." });

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) return res.status(401).json({ message: "Senha incorreta." });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "2d" });

    return res.status(200).json({
      message: "Login realizado com sucesso.",
      token,
      user: { id: user.id, name: user.name, email: user.email, avatar: user.avatar },
    });
  } catch (err) {
    console.error("Erro no login:", err);
    return res.status(500).json({ message: "Erro no servidor." });
  }
}

export async function forgotPassword(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(404).json({ message: "Usuário não encontrado." });

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return res.status(200).json({ message: "Senha atualizada com sucesso." });
  } catch (error) {
    console.error("Erro em forgotPassword:", error);
    return res.status(500).json({ message: "Erro no servidor." });
  }
}

export async function profile(req: AuthenticatedRequest, res: Response) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, name: true, email: true, avatar: true },
    });

    if (!user) return res.status(404).json({ message: "Usuário não encontrado." });

    return res.json(user);
  } catch (error) {
    console.error("Erro em profile:", error);
    return res.status(500).json({ message: "Erro ao buscar perfil." });
  }
}

export async function updateProfile(req: AuthenticatedRequest, res: Response) {
  const { name, email, password } = req.body;

  try {
    const updateData: { name: string; email: string; password?: string } = { name, email };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updated = await prisma.user.update({
      where: { id: req.userId },
      data: updateData,
      select: { id: true, name: true, email: true },
    });

    return res.json({ message: "Perfil atualizado com sucesso.", user: updated });
  } catch (err) {
    console.error("Erro em updateProfile:", err);
    return res.status(500).json({ message: "Erro ao atualizar perfil." });
  }
}

export async function updateAvatar(req: AuthenticatedRequest, res: Response) {
  const { avatar } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id: req.userId },
      data: { avatar },
      select: { id: true, name: true, email: true, avatar: true },
    });

    return res.json({ message: "Avatar atualizado com sucesso.", user });
  } catch (err) {
    console.error("Erro em updateAvatar:", err);
    return res.status(500).json({ message: "Erro ao atualizar avatar." });
  }
}

export async function uploadAvatarFile(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const avatar = req.file?.filename;

  if (!avatar) {
    return res.status(400).json({ message: "Nenhum arquivo enviado." });
  }

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { avatar },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
      },
    });

    return res.json({ message: "Avatar atualizado com sucesso.", user });
  } catch (err) {
    console.error("Erro ao atualizar avatar:", err);
    return res.status(500).json({ message: "Erro ao atualizar avatar." });
  }
}