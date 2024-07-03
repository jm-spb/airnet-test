import webpack from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

export type BuildMode = webpack.Configuration['mode'];
export type WebpackConfig = webpack.Configuration | DevServerConfiguration;

export interface BuildPaths {
  entry: string;
  build: string;
  html: string;
  src: string;
}

export interface BuildEnv {
  mode: BuildMode;
  port: number;
}

export interface BuildOptions {
  mode: BuildMode;
  paths: BuildPaths;
  isDev: boolean;
  port: number;
}
