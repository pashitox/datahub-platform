import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRefreshTokensTable1725621000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE refresh_tokens (
        id SERIAL PRIMARY KEY,
        token TEXT NOT NULL UNIQUE,
        user_id INTEGER NOT NULL,
        is_active BOOLEAN DEFAULT true,
        device_info TEXT,
        ip_address VARCHAR(45),
        created_at TIMESTAMP DEFAULT NOW(),
        expires_at TIMESTAMP NOT NULL,
        CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );
      
      CREATE INDEX idx_refresh_tokens_token_user ON refresh_tokens (token, user_id);
      CREATE INDEX idx_refresh_tokens_user ON refresh_tokens (user_id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE refresh_tokens`);
  }
}
