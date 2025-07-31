module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      startServerCommand: 'npm start',
      startServerReadyPattern: 'ready on',
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
