module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module'
    },
    ignorePatterns: ['public/', 'development/'],
    env: {
        browser: true // makes HTMLElement and customElements NOT no-undef
    },
    plugins: [
        '@typescript-eslint'
    ],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'standard'
    ],
    rules: {
        indent: 'off',
        semi: 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'prefer-spread': 'off',
        'no-useless-call': 'off',
        'no-unused-vars': 'off',
        'space-before-function-paren': 'off',
        'dot-notation': 'off',
        'no-new': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        camelcase: 'off'
    }
}
