import path from 'path';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildPaths, WebpackConfig } from './config/build/types/config';

export default (env: BuildEnv) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
  };

  const mode = env.mode || 'development';
  // instead of explicit check: if (mode === 'devepolment')
  const isDev = mode === 'development';
  const port = env.port || 3000;

  const config: WebpackConfig = buildWebpackConfig({
    mode,
    paths,
    isDev,
    port,
  });

  return config;
};
