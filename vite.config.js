import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/React_CRUD/',  // تأكد أن الاسم هنا يتوافق مع اسم المشروع في GitHub
});
