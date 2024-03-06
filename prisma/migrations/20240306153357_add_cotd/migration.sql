-- CreateTable
CREATE TABLE "ConnectionOfDay" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConnectionOfDay_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConnectionOfDay_date_key" ON "ConnectionOfDay"("date");

-- AddForeignKey
ALTER TABLE "ConnectionOfDay" ADD CONSTRAINT "ConnectionOfDay_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
