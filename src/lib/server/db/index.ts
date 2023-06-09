import Database from "better-sqlite3";
import type { Index, Owner, Player } from "./types";
import { DB_PATH, LOG_FILE } from "$env/static/private";
import fs from "node:fs";

const db = new Database(DB_PATH);

export function getUndraftedPlayers(): Player[] {
    const sql = `select * from player where player_drafted == 'false';`;
    const statement = db.prepare(sql);
    const rows = statement.all();
    return rows as Player[];
}

export function getOwners(): Owner[] {
    const sql = `select * from owner;`;
    const statement = db.prepare(sql);
    const rows = statement.all();
    return rows as Owner[];
}

export function getOwnerById(ownerId: number): Owner {
    const sql = `select * from owner where owner_pick = $ownerId`;
    const statement = db.prepare(sql);
    const row = statement.get({ ownerId });
    return row as Owner;
}

export function getPlayersByOwnerId(ownerId: number): number[] {
    const sql = `select player_ranking from team where owner_pick = $ownerId`;
    const statement = db.prepare(sql);
    const rows = statement.all({ ownerId });
    return rows as number[];
}

export function getPlayersByIdList(playerRankings: any[]): Player[] {
    const sql = `select * from player where player_ranking = $playerId`;
    const statement = db.prepare(sql);
    var players: Player[] = [];
    playerRankings.forEach((playerRanking) => {
        let playerId = playerRanking.player_ranking;
        let player = statement.get({ playerId }) as Player;
        players.push(player);
    });
    return players;
}

export function getDraftingIndex(): number {
    const sql = `select * from draftingindex`;
    const statement = db.prepare(sql);
    const row = statement.get() as Index;
    return row.draft_index as number;
}

export function updateDraftingIndex(i: number) {
    const sql = `update draftingindex set draft_index = $i`;
    const statement = db.prepare(sql);
    const row = statement.run({ i });
    return row;
}

export function draftPlayer(ownerId: number, playerId: number) {
    const sql = `insert into team values($ownerId, $playerId)`;
    const statement = db.prepare(sql);
    const row = statement.run({ ownerId, playerId });
    const sql2 = `update player set player_drafted = 'true' where player_ranking = $playerId`;
    const statement2 = db.prepare(sql2);
    statement2.run({ playerId });
    const owner: Owner = getOwnerById(ownerId);
    const player: Player = getPlayersByIdList([{ player_ranking: playerId }])[0];
    fs.appendFile(LOG_FILE, `${owner.owner_name} drafted ${player.player_position} ${player.player_name}`, (error) => {
        if (error) console.log(error);
    });
    return row;
}

export function reset() {
    const sql = `delete from team`;
    const statement = db.prepare(sql);
    statement.run();
    const sql2 = `update player set player_drafted = 'false' where player_drafted = 'true'`;
    const statement2 = db.prepare(sql2);
    statement2.run();
    const sql3 = `update draftingindex set draft_index = 0`;
    const statement3 = db.prepare(sql3);
    statement3.run();
    return;
}

export function addOwner(ownerId: number, ownerName: string) {
    const sql = `insert into owner values($ownerName, $ownerId)`;
    const statement = db.prepare(sql);
    const row = statement.run({ ownerName, ownerId });
    return row;
}

export function deleteOwner(ownerId: number) {
    const sql = `delete from owner where owner_pick = $ownerId`;
    const statement = db.prepare(sql);
    const row = statement.run({ ownerId });
    return row;
}
