import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const { name, email } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { username: name, email },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// Other controller functions similarly...
