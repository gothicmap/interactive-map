const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = function override(config, env) {
    if (!config.plugins) {
        config.plugins = [];
    }

    if (!config.resolve) {
        config.resolve = {
            fallback: {
                fs: false
            }
        }
    } else {
        if (!config.resolve.fallback) {
            config.resolve.fallback = {
                fs: false,
                path: false
            }
        } else {
            config.resolve.fallback.fs = false
            config.resolve.fallback.path = false
        }
    }

    const wasmExtensionRegExp = /\.wasm$/;

    config.resolve.extensions.push('.wasm');

    config.module.rules.forEach(rule => {
        (rule.oneOf || []).forEach(oneOf => {
            if (oneOf.loader && oneOf.loader.indexOf('file-loader') >= 0) {
                // make file-loader ignore WASM files
                oneOf.exclude.push(wasmExtensionRegExp);
            }
        });
    });

    // add a dedicated loader for WASM
    config.module.rules.push({
        test: wasmExtensionRegExp,
        include: path.resolve(__dirname, 'src'),
        use: [{loader: require.resolve('wasm-loader'), options: {}}]
    });

    config.plugins.push(
        new CopyWebpackPlugin({
            patterns: [
                {from: "node_modules/canvaskit-wasm/bin/canvaskit.wasm", to: "canvaskit.wasm"},
                {from: "src/data", to: "data"}
            ],
        })
    );

    return config;
}