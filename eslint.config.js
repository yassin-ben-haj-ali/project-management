
export default (
    [
        {
            ignores: ['node_modules/**'],
        },
        {
            files: ['**/*.js'],
            languageOptions: {
                ecmaVersion: 2021,
                sourceType: 'module',
                globals: {
                    browser: true,
                    node: true,
                    es2021: true,
                },
            },
            rules: {
                'no-console': ['error', { allow: ['warn', 'error'] }],
                'eqeqeq': ['error', 'always'],
                'no-unused-vars': 'warn',
                'prefer-const': 'error',
                'arrow-parens': ['error', 'always'],
            },
        },
    ]);
