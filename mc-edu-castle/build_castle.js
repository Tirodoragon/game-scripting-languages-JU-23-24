function buildCastle() {
    const width: number = 21;
    const height: number = 7;
    const length: number = 21;

    const playerPos = player.position();
    const playerDirection = Math.round(player.getOrientation());
    let offsetX: number = 0;
    let offsetZ: number = 0;

    if (playerDirection >= 45 && playerDirection < 135) {
        offsetX = -47;
        offsetZ = -(width / 2);
    } else if (playerDirection >= 135 || playerDirection < -135) {
        offsetX = -(width / 2);
        offsetZ = -47;
    } else if (playerDirection >= -135 && playerDirection < -45) {
        offsetX = 27;
        offsetZ = -(width / 2);
    } else {
        offsetX = -(width / 2);
        offsetZ = 27;
    }

    const castleX: number = playerPos.getValue(Axis.X) + offsetX;
    const castleY: number = playerPos.getValue(Axis.Y) - 1;
    const castleZ: number = playerPos.getValue(Axis.Z) + offsetZ;

    buildFloor(castleX, castleY, castleZ, width, length);
    buildWalls(castleX, castleY, castleZ, width, height, length);
    buildRoof(castleX, castleY, castleZ, width, height, length);
    buildLadder(castleX, castleY, castleZ, width, height, length);
    placeGlowstone(castleX, castleY, castleZ, width, height, length);
    buildTowers(castleX, castleY, castleZ, width, height, length);
    buildMoat(castleX, castleY, castleZ, width, length);
}

function buildFloor(castleX: number, castleY: number, castleZ: number, width: number, length: number) {
    const floor = blocks.block(NETHERRACK);
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < length; j++) {
            blocks.place(floor, world(castleX + i, castleY, castleZ + j));
        }
    }
}

function buildWalls(castleX: number, castleY: number, castleZ: number, width: number, height: number, length: number) {
    const bottomWall = blocks.block(BLACKSTONE);
    const wall = blocks.block(NETHER_BRICK);
    const corner = blocks.block(OBSIDIAN);
    const gate = blocks.block(NETHER_BRICK_FENCE)
    const window = blocks.block(BLACK_STAINED_GLASS);

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            const doorWidth = 3;
            const doorStart = Math.floor((width - doorWidth) / 2);
            if (i >= doorStart && i < doorStart + doorWidth && j < 6) {
                if (j >= 3 && j <= 6) {
                    blocks.place(gate, world(castleX + i, castleY + j + 1, castleZ));
                }
                continue;
            }
            if (j === 0) {
                blocks.place(bottomWall, world(castleX + i, castleY + j + 1, castleZ));
            } else if (((i >= 3 && i <= 4) || (i >= width - 5 && i <= width - 4) || (i === 3 || i === width - 5)) && j > 0 && j < 6) {
                blocks.place(window, world(castleX + i, castleY + j + 1, castleZ));
            } else if (i === 0 || i === width - 1) {
                blocks.place(corner, world(castleX + i, castleY + j + 1, castleZ));
            } else {
                blocks.place(wall, world(castleX + i, castleY + j + 1, castleZ));
            }
        }
    }

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            if (j === 0) {
                blocks.place(bottomWall, world(castleX + i, castleY + j + 1, castleZ + length - 1));
            } else if (((i >= 3 && i <= 4) || (i >= width - 5 && i <= width - 4) || (i === 3 || i === width - 5)) && j > 0 && j < 6) {
                blocks.place(window, world(castleX + i, castleY + j + 1, castleZ + length - 1));
            } else if (i === 0 || i === width - 1) {
                blocks.place(corner, world(castleX + i, castleY + j + 1, castleZ + length - 1));
            } else {
                blocks.place(wall, world(castleX + i, castleY + j + 1, castleZ + length - 1));
            }
        }
    }

    for (let i = 1; i < length - 1; i++) {
        for (let j = 0; j < height; j++) {
            if (j === 0) {
                blocks.place(bottomWall, world(castleX, castleY + j + 1, castleZ + i));
                blocks.place(bottomWall, world(castleX + width - 1, castleY + j + 1, castleZ + i));
            } else if (((i >= 3 && i <= 4) || (i >= length - 5 && i <= length - 4) || (i === 3 || i === length - 5)) && j > 0 && j < 6) {
                blocks.place(window, world(castleX, castleY + j + 1, castleZ + i));
                blocks.place(window, world(castleX + width - 1, castleY + j + 1, castleZ + i));
            } else {
                blocks.place(wall, world(castleX, castleY + j + 1, castleZ + i));
                blocks.place(wall, world(castleX + width - 1, castleY + j + 1, castleZ + i));
            }
        }
    }
}

function buildRoof(castleX: number, castleY: number, castleZ: number, width: number, height: number, length: number) {
    const roof = blocks.block(POLISHED_BLACKSTONE);
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < length; j++) {
            const ladderWidth = 3;
            const ladderStart = Math.floor((width - ladderWidth) / 2);
            if (i >= ladderStart && i < ladderStart + ladderWidth && j == length - 2) {
                continue;
            }
            blocks.place(roof, world(castleX + i, castleY + height + 1, castleZ + j));
        }
    }

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < length; j++) {
            if (i === 0 || i === width - 1 || j === 0 || j === length - 1) {
                if ((i + j) % 2 === 0) {
                    blocks.place(roof, world(castleX + i, castleY + height + 2, castleZ + j));
                }
            }
        }
    }
}

function placeGlowstone(castleX: number, castleY: number, castleZ: number, width: number, height: number, length: number) {
    const glowstone = blocks.block(GLOWSTONE);
    blocks.place(glowstone, world(castleX + 1, castleY + height + 1, castleZ + 1));
    blocks.place(glowstone, world(castleX + width - 2, castleY + height + 1, castleZ + 1));
    blocks.place(glowstone, world(castleX + 1, castleY + height + 1, castleZ + length - 2));
    blocks.place(glowstone, world(castleX + width - 2, castleY + height + 1, castleZ + length - 2));
}

function buildMoat(castleX: number, castleY: number, castleZ: number, width: number, length: number) {
    const water = blocks.block(WATER);

    const expansions: number[] = [];
    for (let i = 1; i <= 13; i++) {
        expansions.push(i);
    }

    for (const expansion of expansions) {
        for (let i = -expansion; i <= width + expansion - 1; i++) {
            for (let j = -expansion; j <= length + expansion - 1; j++) {
                if (i === -expansion || i === width + expansion - 1 || j === -expansion || j === length + expansion - 1) {
                    for (let k = 0; k >= -2; k--) {
                        blocks.place(water, world(castleX + i, castleY + k, castleZ + j));
                    }
                }
            }
        }
    }

    const bridgeWidth = 3;
    const bridgeLength = expansions.length;
    const bridgeHeight = 0;

    const bridgeStartX = castleX + Math.floor(width / 2) - Math.floor(bridgeWidth / 2);
    const bridgeStartZ = castleZ - bridgeLength;

    for (let i = 0; i < bridgeWidth; i++) {
        for (let j = 0; j < bridgeLength; j++) {
            blocks.place(blocks.block(RED_NETHER_BRICK), world(bridgeStartX + i, castleY + bridgeHeight, bridgeStartZ + j));
        }
    }
}

function buildTowers(castleX: number, castleY: number, castleZ: number, width: number, height: number, length: number) {
    const ladder = blocks.blockWithData(LADDER, NORTH);

    const towerWidth = 7;
    const towerDepth = 7;
    const towerHeight = height * 2;

    const towerPosX1 = castleX;
    const towerPosX2 = castleX + width - towerWidth;

    const towerBaseY = castleY + height + 2;

    for (let i = 0; i < towerWidth; i++) {
        for (let j = 0; j < towerDepth; j++) {
            for (let k = 0; k < towerHeight; k++) {
                if (i === 3 && j === 3) {
                    continue;
                }
                if (i === 3 && j >= 3 && j <= 6 && (k === 0 || k === 1)) {
                    continue;
                }
                blocks.place(blocks.block(NETHER_BRICK), world(towerPosX1 + i, towerBaseY + k, castleZ + j));
            }
        }
    }

    for (let i = 0; i < towerWidth; i++) {
        for (let j = 0; j < towerDepth; j++) {
            for (let k = 0; k < towerHeight; k++) {
                if (i === 3 && j === 3) {
                    continue;
                }
                if (i === 3 && j >= 3 && j <= 6 && (k === 0 || k === 1)) {
                    continue;
                }
                blocks.place(blocks.block(NETHER_BRICK), world(towerPosX2 + i, towerBaseY + k, castleZ + j));
            }
        }
    }

    for (let k = 0; k < towerHeight; k++) {
        blocks.place(ladder, world(towerPosX1 + 3, towerBaseY + k, castleZ + 3));
        blocks.place(ladder, world(towerPosX2 + 3, towerBaseY + k, castleZ + 3));
    }

    for (let i = 0; i < towerWidth; i++) {
        for (let j = 0; j < towerDepth; j++) {
            if (i === 0 || i === towerWidth - 1 || j === 0 || j === towerDepth - 1) {
                if ((i + j) % 2 === 0) {
                    blocks.place(blocks.block(POLISHED_BLACKSTONE), world(towerPosX1 + i, towerBaseY + towerHeight, castleZ + j));
                }
            }
        }
    }

    for (let i = 0; i < towerWidth; i++) {
        for (let j = 0; j < towerDepth; j++) {
            if (i === 0 || i === towerWidth - 1 || j === 0 || j === towerDepth - 1) {
                if ((i + j) % 2 === 0) {
                    blocks.place(blocks.block(POLISHED_BLACKSTONE), world(towerPosX2 + i, towerBaseY + towerHeight, castleZ + j));
                }
            }
        }
    }
}

function buildLadder(castleX: number, castleY: number, castleZ: number, width: number, height: number, length: number) {
    const ladder = blocks.blockWithData(LADDER, SOUTH)
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height + 1; j++) {
            const ladderWidth = 3;
            const ladderStart = Math.floor((width - ladderWidth) / 2);
            if (i >= ladderStart && i < ladderStart + ladderWidth && j < 8) {
                blocks.place(ladder, world(castleX + i, castleY + j + 1, castleZ + length - 2));
            }
        }
    }
}

player.onChat("build", buildCastle);