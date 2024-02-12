-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN DEFAULT false,
    "projectId" INTEGER,
    "pomodoro" INTEGER DEFAULT 1,
    "sessions" INTEGER DEFAULT 0,
    "draft" BOOLEAN DEFAULT false,
    "createdBy" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiredAt" DATETIME
);
INSERT INTO "new_Task" ("_id", "completed", "createdAt", "createdBy", "draft", "expiredAt", "pomodoro", "projectId", "sessions", "title", "updatedAt") SELECT "_id", "completed", "createdAt", "createdBy", "draft", "expiredAt", "pomodoro", "projectId", "sessions", "title", "updatedAt" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
