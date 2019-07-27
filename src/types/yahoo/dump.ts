export interface YahooLeagueMeta {
  league_key: string;
  league_id: string;
  name: string;
  url: string;
  logo_url: string;
  password: string;
  draft_status: string;
  num_teams: number;
  edit_key: string;
  weekly_deadline: string;
  league_update_timestamp?: any; // TODO: figure out type
  scoring_type: string;
  league_type: string;
  renew: string;
  renewed: string;
  iris_group_chat_id: string;
  short_invitation_url: string;
  allow_add_to_dl_extra_pos: number;
  is_pro_league: string;
  is_cash_league: string;
  current_week: string;
  start_week: string;
  start_date: string;
  end_week: string;
  end_date: string;
  game_code: string;
  season: string;
}

export interface YahooLeagueSettings {
  settings: [YahooLeagueSettingsInfo];
}

interface YahooLeagueSettingsInfo {
  draft_type: string;
  is_auction_draft: string;
  scoring_type: string;
  persistent_url: string;
  uses_playoff: string;
  has_playoff_consolation_games: boolean;
  playoff_start_week: string;
  uses_playoff_reseeding: number;
  uses_lock_eliminated_teams: number;
  num_playoff_teams: string;
  num_playoff_consolation_teams: number;
  has_multiweek_championship: number;
  waiver_type: string;
  waiver_rule: string;
  uses_faab: string;
  draft_time: string;
  draft_pick_time: string;
  post_draft_players: string;
  max_teams: string;
  waiver_time: string;
  trade_end_date: string;
  trade_ratify_type: string;
  trade_reject_time: string;
  player_pool: string;
  cant_cut_list: string;
  can_trade_draft_picks: string;
  roster_positions: {
    roster_position: {
      position: string;
      position_type: string;
      count: number;
    };
  }[];
  stat_categories: {
    stats: {
      stat: {
        stat_id: number;
        enabled: string;
        name: string;
        display_name: string;
        sort_order: string;
        position_type: string;
        stat_position_types: {
          stat_position_type: {
            position_type: string;
            is_only_display_stat?: string;
          };
        }[];
        is_only_display_stat?: string;
        is_excluded_from_display?: string;
      };
    }[];
  };
  stat_modifiers: {
    stats: {
      stat: {
        stat_id: number;
        value: string;
      };
    }[];
  };
  divisions: {
    division: {
      division_id: number;
      name: string;
    };
  }[];
  pickem_enabled: string;
  uses_fractional_points: string;
  uses_negative_points: string;
}

export interface YahooLeagueStandings {
  standings: [YahooLeagueStandingsInfo];
}

interface YahooLeagueStandingsInfo {
  teams: { [key: string]: number | YahooLeagueStandingsTeam };
}

interface YahooLeagueStandingsTeam {
  team: [YahooLeagueStandingsTeamInfo, YahooLeagueStandingsTeamPoints, YahooLeagueStandingsTeamStandings];
}

type YahooLeagueStandingsTeamInfo = any[];

interface YahooLeagueStandingsTeamPoints {
  team_points: {
    coverage_type: string;
    season: string;
    total: string;
  };
}

interface YahooLeagueStandingsTeamStandings {
  team_standings: {
    rank: string;
    outcome_totals: YahooLeagueStandingsTeamStandingsOutcomes;
    divisional_outcome_totals: YahooLeagueStandingsTeamStandingsOutcomes;
    points_for: string;
    points_against: number;
  };
}

interface YahooLeagueStandingsTeamStandingsOutcomes {
  wins: number;
  losses: number;
  ties: number;
  percentage: string;
}

type YahooLeagueScoreboardInfo = {
  [key: string]: string | { matchups: YahooLeagueScoreboardMatchups };
};

export interface YahooLeagueScoreboard {
  scoreboard: {
    [key: string]: string | YahooLeagueScoreboardInfo;
  };
}

type YahooLeagueScoreboardMatchupsInfo = {
  [key: string]: number | YahooLeagueScoreboardMatchup;
};

interface YahooLeagueScoreboardMatchups extends YahooLeagueScoreboardMatchupsInfo {
  count: number;
}

type YahooLeagueScoreboardMatchupInfo = {
  [key: string]:
    | number
    | string
    | {
        teams: { [key: string]: {} };
      };
};

interface YahooLeagueScoreboardMatchup extends YahooLeagueScoreboardMatchupInfo {
  week: string;
  week_start: string;
  week_end: string;
  status: string;
  is_playoffs: string;
  is_consolation: string;
  is_matchup_recap_available: number;
}
