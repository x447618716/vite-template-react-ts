import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import basicSsl from '@vitejs/plugin-basic-ssl';
import autoprefixer from 'autoprefixer';
import visualizer from 'rollup-plugin-visualizer';
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const isProduction = mode === 'production';
    const plugins = isProduction
        ? [
              visualizer({
                  filename: './dist/stats.html', // 报告输出路径
                  open: true, // 构建后自动打开
                  gzipSize: true, // 显示gzip压缩大小
                  brotliSize: true // 显示brotli压缩大小
              })
          ]
        : [basicSsl()];
    return {
        base: '/',
        plugins: [
            react(),
            AutoImport({
                imports: ['react', 'react-router', 'react-i18next'],
                dirs: ['src/services/dto/**', 'src/services/vo/**', 'src/enums/**', 'src/hooks/**', 'src/utils/**'],
                dts: 'types/auto-imports.d.ts'
            }),
            ...plugins
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        build: {
            minify: isProduction ? 'terser' : false,
            terserOptions: isProduction
                ? {
                      compress: {
                          drop_console: true // 移除所有console.*
                      },
                      format: {
                          comments: false // 删除注释
                      }
                  }
                : undefined
        },
        server: {
            open: true,
            host: '0.0.0.0'
        },
        css: {
            postcss: {
                plugins: [tailwindcss(), autoprefixer()]
            }
        },
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: 'src/setupTests',
            mockReset: true
        }
    };
});
