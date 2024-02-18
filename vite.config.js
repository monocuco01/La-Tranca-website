// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'mock-aws-s3': '/absolute/path/to/mock-aws-s3',
      'aws-sdk': '/absolute/path/to/aws-sdk',
      'nock': '/absolute/path/to/nock',
    },
  },
});
