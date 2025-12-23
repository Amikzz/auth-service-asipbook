-- CreateTable
CREATE TABLE `asipiya_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `google_id` VARCHAR(191) NULL,
    `title` VARCHAR(191) NULL,
    `First_Name` VARCHAR(191) NULL,
    `Last_Name` VARCHAR(191) NULL,
    `Pro_Pic` VARCHAR(191) NULL,
    `Contact_No_01` VARCHAR(191) NULL,
    `Contact_No_02` VARCHAR(191) NULL,
    `country` VARCHAR(191) NULL,
    `state` VARCHAR(191) NULL,
    `district` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `Street_Address` VARCHAR(191) NULL,
    `emailVerified` BOOLEAN NOT NULL DEFAULT false,
    `mobileVerified` BOOLEAN NOT NULL DEFAULT false,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `Asipiya_Comment` VARCHAR(191) NULL,
    `otp` VARCHAR(191) NULL,
    `otpExpiresAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `generatedid` INTEGER NULL,

    UNIQUE INDEX `asipiya_users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_privilages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `User_idUser` INTEGER NOT NULL,
    `Branch_idBranch` INTEGER NOT NULL,
    `account` BOOLEAN NOT NULL DEFAULT false,
    `customerManagement` BOOLEAN NOT NULL DEFAULT false,
    `addCustomer` BOOLEAN NOT NULL DEFAULT false,
    `editCustomer` BOOLEAN NOT NULL DEFAULT false,
    `changeCustomerStatus` BOOLEAN NOT NULL DEFAULT false,
    `customerCreditLogs` BOOLEAN NOT NULL DEFAULT false,
    `recordPayment` BOOLEAN NOT NULL DEFAULT false,
    `customerReturns` BOOLEAN NOT NULL DEFAULT false,
    `addCustomerReturn` BOOLEAN NOT NULL DEFAULT false,
    `editCustomerReturn` BOOLEAN NOT NULL DEFAULT false,
    `processCustomerReturn` BOOLEAN NOT NULL DEFAULT false,
    `quotationManagement` BOOLEAN NOT NULL DEFAULT false,
    `addQuotation` BOOLEAN NOT NULL DEFAULT false,
    `editQuotation` BOOLEAN NOT NULL DEFAULT false,
    `deleteQuotation` BOOLEAN NOT NULL DEFAULT false,
    `invoices` BOOLEAN NOT NULL DEFAULT false,
    `addInvoices` BOOLEAN NOT NULL DEFAULT false,
    `editInvoices` BOOLEAN NOT NULL DEFAULT false,
    `deleteInvoices` BOOLEAN NOT NULL DEFAULT false,
    `maximumItemDiscount` INTEGER NOT NULL DEFAULT 0,
    `maximumBillDiscount` INTEGER NOT NULL DEFAULT 0,
    `duePayments` BOOLEAN NOT NULL DEFAULT false,
    `processDuePayments` BOOLEAN NOT NULL DEFAULT false,
    `productCategoryManagement` BOOLEAN NOT NULL DEFAULT false,
    `addEditProductCategory` BOOLEAN NOT NULL DEFAULT false,
    `productsManagement` BOOLEAN NOT NULL DEFAULT false,
    `addProducts` BOOLEAN NOT NULL DEFAULT false,
    `editProducts` BOOLEAN NOT NULL DEFAULT false,
    `changeStatusProducts` BOOLEAN NOT NULL DEFAULT false,
    `grn` BOOLEAN NOT NULL DEFAULT false,
    `addGrns` BOOLEAN NOT NULL DEFAULT false,
    `editGrns` BOOLEAN NOT NULL DEFAULT false,
    `processGrns` BOOLEAN NOT NULL DEFAULT false,
    `barcodes` BOOLEAN NOT NULL DEFAULT false,
    `damageNote` BOOLEAN NOT NULL DEFAULT false,
    `addDamageNote` BOOLEAN NOT NULL DEFAULT false,
    `suppliersManagement` BOOLEAN NOT NULL DEFAULT false,
    `addSuppliers` BOOLEAN NOT NULL DEFAULT false,
    `editSuppliers` BOOLEAN NOT NULL DEFAULT false,
    `changeSuppliersStatus` BOOLEAN NOT NULL DEFAULT false,
    `deleteSuppliers` BOOLEAN NOT NULL DEFAULT false,
    `supplierCreditLogs` BOOLEAN NOT NULL DEFAULT false,
    `purchaseReturns` BOOLEAN NOT NULL DEFAULT false,
    `addPurchaseReturns` BOOLEAN NOT NULL DEFAULT false,
    `editPurchaseReturns` BOOLEAN NOT NULL DEFAULT false,
    `processPurchaseReturns` BOOLEAN NOT NULL DEFAULT false,
    `salesmen` BOOLEAN NOT NULL DEFAULT false,
    `addSalesmen` BOOLEAN NOT NULL DEFAULT false,
    `editSalesmen` BOOLEAN NOT NULL DEFAULT false,
    `changeSalesmenStatus` BOOLEAN NOT NULL DEFAULT false,
    `earningsExpenses` BOOLEAN NOT NULL DEFAULT false,
    `addEarningsExpenses` BOOLEAN NOT NULL DEFAULT false,
    `earningsExpensesCategory` BOOLEAN NOT NULL DEFAULT false,
    `reports` BOOLEAN NOT NULL DEFAULT false,
    `itemReports` BOOLEAN NOT NULL DEFAULT false,
    `customerCreditLogReports` BOOLEAN NOT NULL DEFAULT false,
    `invoiceDetailReports` BOOLEAN NOT NULL DEFAULT false,
    `stockCardReports` BOOLEAN NOT NULL DEFAULT false,
    `plReports` BOOLEAN NOT NULL DEFAULT false,
    `stockDetailReports` BOOLEAN NOT NULL DEFAULT false,
    `supplierReports` BOOLEAN NOT NULL DEFAULT false,
    `earningReports` BOOLEAN NOT NULL DEFAULT false,
    `expensesReports` BOOLEAN NOT NULL DEFAULT false,
    `customerReports` BOOLEAN NOT NULL DEFAULT false,
    `userReports` BOOLEAN NOT NULL DEFAULT false,
    `productReports` BOOLEAN NOT NULL DEFAULT false,
    `paymentReports` BOOLEAN NOT NULL DEFAULT false,
    `returnReports` BOOLEAN NOT NULL DEFAULT false,
    `monthlySalesReports` BOOLEAN NOT NULL DEFAULT false,
    `dailySalesReports` BOOLEAN NOT NULL DEFAULT false,
    `apps` BOOLEAN NOT NULL DEFAULT false,
    `pos` BOOLEAN NOT NULL DEFAULT true,
    `addQuantity` BOOLEAN NOT NULL DEFAULT false,
    `adjustQuantity` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `company` (
    `idCompany` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `Address` VARCHAR(191) NULL,
    `Status` VARCHAR(191) NULL DEFAULT '1',
    `Company_Email` VARCHAR(191) NULL,
    `Company_Website` VARCHAR(191) NULL,
    `Company_Category_idCompany_Category` INTEGER NULL,

    PRIMARY KEY (`idCompany`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `branch` (
    `idBranch` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `Registered_Date` VARCHAR(191) NULL,
    `Expire_On` VARCHAR(191) NULL,
    `Address` VARCHAR(191) NULL,
    `Contact_no` VARCHAR(191) NULL,
    `Status` VARCHAR(191) NULL DEFAULT '1',
    `Company_idCompany` INTEGER NOT NULL,

    PRIMARY KEY (`idBranch`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `company_has_asipiya_user` (
    `Company_idCompany` INTEGER NOT NULL,
    `Asipiya_User_idAsipiya_User` INTEGER NOT NULL,
    `Role` VARCHAR(191) NULL,
    `Created_Date` VARCHAR(191) NULL,
    `Expire_On` VARCHAR(191) NULL,
    `Status` VARCHAR(191) NULL DEFAULT '1',

    PRIMARY KEY (`Company_idCompany`, `Asipiya_User_idAsipiya_User`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CompanyCategory` (
    `idCompany_Category` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`idCompany_Category`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_privilages` ADD CONSTRAINT `user_privilages_User_idUser_fkey` FOREIGN KEY (`User_idUser`) REFERENCES `asipiya_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `branch` ADD CONSTRAINT `branch_Company_idCompany_fkey` FOREIGN KEY (`Company_idCompany`) REFERENCES `company`(`idCompany`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `company_has_asipiya_user` ADD CONSTRAINT `company_has_asipiya_user_Company_idCompany_fkey` FOREIGN KEY (`Company_idCompany`) REFERENCES `company`(`idCompany`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `company_has_asipiya_user` ADD CONSTRAINT `company_has_asipiya_user_Asipiya_User_idAsipiya_User_fkey` FOREIGN KEY (`Asipiya_User_idAsipiya_User`) REFERENCES `asipiya_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
