import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { Admin } from '@/app/lib/definitions';

async function getAdmin(email: string): Promise<Admin | undefined> {
  try {
    const admin = await sql<Admin>`
      SELECT id, name, email, password 
      FROM administrators 
      WHERE email=${email}
    `;
    console.log('Admin encontrado:', admin.rows[0] ? true : false);
    if(admin.rows[0]) {
      console.log('Password en DB:', admin.rows[0].password);
    }
    return admin.rows[0];
  } catch (error) {
    console.error('Failed to fetch admin:', error);
    throw new Error('Failed to fetch admin.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [Credentials({
    async authorize(credentials) {
      const parsedCredentials = z
        .object({ email: z.string().email(), password: z.string().min(6) })
        .safeParse(credentials);
        
      if (parsedCredentials.success) {
        const { email, password } = parsedCredentials.data;
        console.log('Password ingresado:', password);
        
        const user = await getAdmin(email);
        
        if (!user) return null;
        
        // Comparación directa 
        const passwordsMatch = user.password === password;
        console.log('Comparando:', { 
          passwordIngresado: password, 
          passwordEnDB: user.password,
          coinciden: passwordsMatch 
        });

        if (passwordsMatch) return user;
      }
      console.log('Credenciales inválidas');
      return null;
    },
  }),
  ],
});