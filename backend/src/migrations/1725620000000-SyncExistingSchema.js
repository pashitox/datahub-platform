const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class SyncExistingSchema1725620000000 {
  async up(queryRunner) {
    // Esta migración está vacía porque ya creamos las tablas manualmente
    console.log('Schema already synchronized manually');
  }

  async down(queryRunner) {
    // Revertir no hace nada ya que fue manual
    console.log('Manual changes cannot be reverted automatically');
  }
}
