module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
      'no-underscore-dangle': [
        'error',
        {
          allow: ['_id'],
        },
      ],
    }
}
