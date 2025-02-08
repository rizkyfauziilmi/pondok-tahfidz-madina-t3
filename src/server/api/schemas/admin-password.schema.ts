import { z } from "zod";

export const setAdminPasswordSchema = z.object({
  password: z
    .string({
      required_error: "Password harus diisi",
    })
    .min(8, { message: "Password minimal 8 karakter" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
      message: "Password harus kombinasi huruf dan angka",
    }),
});

export const becomeAdminSchema = z.object({
  password: z
    .string({
      required_error: "Password harus diisi",
    })
    .min(1, { message: "Password harus diisi" }),
});

export const updateAdminPasswordSchema = z.object({
  oldPassword: z
    .string({
      required_error: "Password lama harus diisi",
    })
    .min(1, { message: "Password lama harus diisi" }),
  newPassword: z
    .string({
      required_error: "Password baru harus diisi",
    })
    .min(8, { message: "Password baru minimal 8 karakter" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
      message: "Password baru harus kombinasi huruf dan angka",
    }),
});
