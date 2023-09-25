// Import necessary modules and plugins
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration
export default defineConfig({
  plugins: [react()], // Use the Vite React plugin

  // Define environment variables using import.meta.env
  // define: {
  //   'import.meta.env.VITE_FIREBASE_API_KEY': import.meta.env.VITE_FIREBASE_API_KEY,
  //   'import.meta.env.VITE_FIREBASE_AUTH_DOMAIN': import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  //   'import.meta.env.VITE_FIREBASE_PROJECT_ID': import.meta.env.VITE_FIREBASE_PROJECT_ID,
  //   'import.meta.env.VITE_FIREBASE_STORAGE_BUCKET': import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  //   'import.meta.env.VITE_MESSAGING_SENDER': import.meta.env.VITE_MESSAGING_SENDER,
  //   'import.meta.env.VITE_APP_ID': import.meta.env.VITE_APP_ID,
  // },
})
