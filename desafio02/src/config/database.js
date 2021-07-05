module.exports = {
  dialect: 'postgres',
  host: '10.0.10.140',
  username: 'postgres',
  password: 'docker',
  database: 'fastfeet',
  define: {
    timestamps: true,
    // "undersored" com D no final pelo AMOR de deus
    underscored: true,
    underscoredAll: true,
  },
};
