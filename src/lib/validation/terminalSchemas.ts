import { z } from 'zod'

export const terminalSchemas = {
    repository: z.string()
    .min(1, "repository url required")
    .refine(
        (val) => {
        // More flexible validation
        const patterns = [
            /^https?:\/\/[\w\.-]+\/[\w\.\-\/]+\.git$/,  // HTTPS URLs
            /^git@[\w\.-]+:[\w\.\-\/]+\.git$/,         // SSH URLs  
            /^[\w\.-]+\/[\w\.\-\/]+\.git$/             // Domain/repo.git
        ];
        return patterns.some(pattern => pattern.test(val));
        },
        { message: "invalid git repository format" }
    ),
    
    command: z.string()
        .min(1, "command required")
        .regex(/^[a-zA-Z0-9\s\-_\.\/]+$/, "Invalid command syntax")
        .transform((val) => val.trim()),
    
    email: z.email("invalid email format")
        .min(1, "email address required")
        .transform((val) => val.toLowerCase()),

    password: z.string()
        .min(8, "minimum 8 characters required")
        .regex(/[A-Z]/, "uppercase letter required")
        .regex(/[a-z]/, "lowercase letter required")
        .regex(/[0-9]/, "number required"),

    path: z.string()
        .min(1, "path required")
        .regex(/^[\/~]/, "path must start with / or ~")
        .regex(/^[\/\w\.\-~]+$/, "invalid path format"),

    branch: z.string()
        .min(1, "branch name required")
        .regex(/^[a-zA-Z0-9\-_\/]+$/, "invalid branch name format"),

    port: z.number()
        .min(1, "port number required")
        .max(65535, "invalid port range")
        .int("port must be integer"),
    
    environment: z.enum(['development', 'staging', 'production']),     
}