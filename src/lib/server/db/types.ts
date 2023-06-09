export type Player = {
    player_name: string;
    player_ranking: number;
    player_position: string;
    player_nfl_team: string;
    player_bye_week: number;
    player_drafted: string;
};

export type Owner = {
    owner_name: string;
    owner_pick: number;
};

export type Index = {
    draft_index: number;
};
