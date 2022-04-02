const CopyWebpackPlugin = require('copy-webpack-plugin')

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

    config.plugins.push(
        new CopyWebpackPlugin({
            patterns: [
                {from: "src/Data/database.en.items.json", to: "data/database.en.items.json"},
                {from: "src/Data/database.en.pins.json", to: "data/database.en.pins.json"},
                {from: "src/Data/database.ru.items.json", to: "data/database.ru.items.json"},
                {from: "src/Data/database.ru.pins.json", to: "data/database.ru.pins.json"},
                {from: "src/Data/database.pl.items.json", to: "data/database.pl.items.json"},
                {from: "src/Data/database.pl.pins.json", to: "data/database.pl.pins.json"}
            ],
        })
    );

    return config;
}