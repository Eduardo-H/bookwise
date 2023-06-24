-- DropForeignKey
ALTER TABLE `CategoriesOnBooks` DROP FOREIGN KEY `CategoriesOnBooks_book_id_fkey`;

-- DropForeignKey
ALTER TABLE `CategoriesOnBooks` DROP FOREIGN KEY `CategoriesOnBooks_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `accounts` DROP FOREIGN KEY `accounts_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `ratings` DROP FOREIGN KEY `ratings_book_id_fkey`;

-- DropForeignKey
ALTER TABLE `ratings` DROP FOREIGN KEY `ratings_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `sessions` DROP FOREIGN KEY `sessions_user_id_fkey`;

-- CreateIndex
CREATE INDEX `CategoriesOnBooks_book_id_idx` ON `CategoriesOnBooks`(`book_id`);

-- RenameIndex
ALTER TABLE `CategoriesOnBooks` RENAME INDEX `CategoriesOnBooks_categoryId_fkey` TO `CategoriesOnBooks_categoryId_idx`;

-- RenameIndex
ALTER TABLE `accounts` RENAME INDEX `accounts_user_id_fkey` TO `accounts_user_id_idx`;

-- RenameIndex
ALTER TABLE `ratings` RENAME INDEX `ratings_book_id_fkey` TO `ratings_book_id_idx`;

-- RenameIndex
ALTER TABLE `ratings` RENAME INDEX `ratings_user_id_fkey` TO `ratings_user_id_idx`;

-- RenameIndex
ALTER TABLE `sessions` RENAME INDEX `sessions_user_id_fkey` TO `sessions_user_id_idx`;
