import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { BuildOptions, WebpackConfig } from './types/config';

export function buildWebpackConfig(options: BuildOptions): WebpackConfig {
  const { mode, paths, isDev } = options;
  const devServerOptions = {
    port: options.port,
    open: true,
    historyApiFallback: true,
    hot: true,
  };

  return {
    mode,
    entry: paths.entry,
    module: {
      rules: [
        // BABEL LOADER
        {
          test: /\.(js|jsx|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        // TYPESCRIPT LOADER
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        // SASS LOADER
        {
          test: /\.s[ac]ss$/i,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: (resourcePath: string) => Boolean(resourcePath.includes('.module.')),
                  localIdentName: isDev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:8]',
                },
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      preferAbsolute: true,
      modules: [options.paths.src, 'node_modules'],
      mainFiles: ['index'],
      alias: {},
    },
    output: {
      filename: '[name].[contenthash].js',
      path: paths.build,
      clean: true,
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new HtmlWebpackPlugin({ template: paths.html }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
      // подставляем значения в переменные во время компиляции
      new webpack.DefinePlugin({
        __IS_DEV__: JSON.stringify(isDev),
      }),
      // обновляем все модули в рантайме без перезагрузки вэбпака
      ...(isDev ? [new ReactRefreshWebpackPlugin()] : []),
    ],
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? devServerOptions : undefined,
  };
}
