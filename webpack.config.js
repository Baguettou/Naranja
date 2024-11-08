const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    entry: './src/main.js', //  Apunta a main.js en la raíz.
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module:{
        rules:[
            {test:/\.css$/, use:['style-loader', 'css-loader']},

            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            limit: 10000, // Convierte SVGs menores a 10KB a data URLs.  Ajusta según tus necesidades
                            // encoding: 'base64'
                        }
                    }
                    
                ]
            },
            {
                test: /\.css$/i,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                url: false, // Necesario para evitar que css-loader modifique las urls de las fuentes
                            }
                        }
                    ]
            },

            
        ],
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html' // También index.html en la raíz.
        })
    ],
    devServer:{
        static: './', // Sirve archivos estáticos desde la raíz.
    },
    mode: 'development'
  };