import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "segredo_default";

export async function registro(req: Request, res: Response) {
  const { name, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "Email já cadastrado." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return res.status(201).json({ message: "Usuário criado com sucesso!", userId: user.id });
  } catch (error) {
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
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
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
    return res.status(500).json({ message: "Erro no servidor." });
  }
}
