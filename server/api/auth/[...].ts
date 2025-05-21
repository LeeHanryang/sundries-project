// ~/server/api/auth/[...].ts
import { NuxtAuthHandler } from '#auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import KakaoProvider from 'next-auth/providers/kakao'

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret, // 반드시 설정

  providers: [
    // ⚠️ Vite SSR 호환 위해 .default() 형태로 호출 :contentReference[oaicite:1]{index=1}
    // Google
    // @ts-expect-error
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: { prompt: 'consent', access_type: 'offline', response_type: 'code' },
      },
    }),

    // GitHub
    // @ts-expect-error
    GithubProvider.default({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      // scope: 'read:user user:email', // 필요 시 직접 지정
    }),

    // Kakao (Auth.js 내장) :contentReference[oaicite:2]{index=2}
    // @ts-expect-error
    KakaoProvider.default({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30, // 30 일
  },
})
