-- CREATE DATABASE freibadampel;
-- use freibadampel;

CREATE TABLE SwimmingPool (
    id INTEGER NOT NULL AUTO_INCREMENT,
    swimmingPoolName TEXT NOT NULL,
    swimmingPoolToken TEXT NOT NULL,  -- id with 4 digits (leading zeros) + 8 ASCII characters (0-9, a-z, A-Z)
    swimmingPoolJsonData LONGTEXT NOT NULL,
    swimmingPoolImage LONGTEXT NOT NULL,
    swimmingPoolDateCreated INTEGER NOT NULL,  -- UNIX time
    swimmingPoolDateModified INTEGER NOT NULL,  -- UNIX time
    PRIMARY KEY (id)
);

CREATE TABLE SwimmingPoolJsonDataBackup (
    id INTEGER NOT NULL AUTO_INCREMENT,
    swimmingPoolId INTEGER NOT NULL,
    swimmingPoolJsonData LONGTEXT NOT NULL,
    swimmingPoolDateCreated INTEGER NOT NULL,  -- UNIX time
    PRIMARY KEY (id),
    FOREIGN KEY (swimmingPoolId) REFERENCES SwimmingPool(id)
);

CREATE TABLE User (
    id INTEGER NOT NULL AUTO_INCREMENT,
    userLogin TEXT NOT NULL,
    userPasswordHash TEXT NOT NULL,
    userName TEXT NOT NULL,
    userMail TEXT NOT NULL,
    userInstitute TEXT,
    userDateCreated INTEGER NOT NULL,  -- UNIX time
    userDateModified INTEGER NOT NULL,  -- UNIX time
    PRIMARY KEY (id)
);

CREATE TABLE UserAccess (
    id INTEGER NOT NULL AUTO_INCREMENT,
    userAccessUserId INTEGER NOT NULL,
    userAccessSwimmingPoolId INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userAccessUserId) REFERENCES User(id),
    FOREIGN KEY (userAccessSwimmingPoolId) REFERENCES SwimmingPool(id)
);
