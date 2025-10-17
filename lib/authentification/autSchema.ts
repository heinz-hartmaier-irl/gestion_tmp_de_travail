import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Email invalide"),
    password: z.string().min(4, "Le mot de passe doit contenir au moins 6 caractères"),
});

export const registerSchema = z.object({
    nom: z.string().min(2, "Nom trop court"),
    prenom: z.string().min(2, "Prénom trop court"),
    email: z.string().email("Email invalide"),
    password: z.string().min(4, "Mot de passe trop court"),
});
