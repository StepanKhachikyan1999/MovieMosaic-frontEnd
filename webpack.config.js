const path = require("path");
module.exports = {
    resolve: {
        extensions: [".js", ".jsx", "ts", "tsx"],
        fallback: {
            https: require.resolve('https-browserify'),
        },
    },
    devServer: {
        contentBase: path.join(__dirname, "public"), // Serve files from this directory
        port: 3000, // Port for the development server
        open: true, // Open the default web browser when the server starts
        historyApiFallback: true, // Redirects 404s to index.html
    },
};