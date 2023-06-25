-- AlterTable
ALTER TABLE `accounts` MODIFY `refresh_token` TEXT NULL,
    MODIFY `access_token` TEXT NULL,
    MODIFY `scope` TEXT NULL,
    MODIFY `id_token` TEXT NULL;

-- AlterTable
ALTER TABLE `books` MODIFY `cover_url` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `avatar_url` TEXT NULL;
