const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { 
                            // '@primary-color': '#27a4a1',
                            "@border-radius-base" : '5px',
                            '@menu-inline-toplevel-item-height' : '55px',
                            '@menu-item-height': '55px',
                            '@menu-bg': '#0c1427',
                            '@menu-item-color': '#fff',
                            '@height-base': '40px',
                            
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};