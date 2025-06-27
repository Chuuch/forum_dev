import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Невалиден имейл"),
  password: z.string().min(6, "Паролата трябва да съдържа поне 6 символа."),
});

export const registerSchema = z.object({
  email: z.string().email("Невалиден имейл"),
  password: z.string().min(6, "Паролата трябва да съдържа поне 6 символа."),
  username: z
    .string()
    .min(4, "Потребителското име трябва да съдържа поне 4 символа."),
});

export const contactSchema = z.object({
  username: z
    .string()
    .min(4, "Потребителското име трябва да съдържа поне 4 символа."),
  email: z.string().email("Невалиден имейл"),
  message: z.string().min(10, "Съобщението трябва да съдържа поне 10 символа"),
});
