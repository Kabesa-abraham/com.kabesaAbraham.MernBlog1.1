import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{ //je l'ai mis manuellement pour ne plus écrire http ect...
    proxy:{
      '/backend':{
        target:'http://localhost:3000',
        secure:false
      },
    },
  },
  plugins: [react()],
})