import {
  childExists,
  mightHaveBooleanValue,
  mightHaveNumberValue,
  mightHaveStringValue,
  mustHaveBooleanValue,
  mustHaveNumberValue,
  mustHaveStringValue,
} from '../../../yahoo';

export type LeagueYear = 2013 | 2014 | 2015 | 2016 | 2017 | 2018 | 2019;

export interface LeagueYearData {
  leagueMetadata?: FantasyFootballLeagueMetadata;
  leagueSettings?: FantasyFootballLeagueSettings;
  leagueScoreboard?: FantasyFootballLeagueScoreboard;
  leagueStandings?: FantasyFootballLeagueStandings;
  teams: FantasyFootballTeam[];
}

export interface FantasyFootballLeagueMetadata {
  key: string;
  id: string;
  name: string;
  url: string;
  logoUrl?: string;
  password?: string;
  draftStatus: string;
  numTeams: number;
  editKey: number;
  weeklyDeadline?: any;
  leagueUpdateTimestamp?: number;
  scoringType: string;
  leagueType: string;
  renew?: string;
  renewed?: boolean;
  irisGroupChatId: string;
  shortInvitationUrl?: string;
  allowAddToDlExtraPos: boolean;
  proLeague: boolean;
  cashLeague: boolean;
  currentWeek: number;
  startWeek: number;
  startDate: string;
  endWeek: number;
  endDate: string;
  gameCode: string;
  season: number;
  finished?: boolean;
}

export interface FantasyFootballLeagueSettings {
  draftType: string;
  auctionDraft: boolean;
  scoringType: string;
  persistentUrl?: string;
  usesPlayoff: boolean;
  hasPlayoffConsolationGames: boolean;
  playoffStartWeek: number;
  usesPlayoffReseeding: boolean;
  usesLockEliminatedTeams: boolean;
  numPlayoffTeams: number;
  numPlayoffConsolationTeams: number;
  hasMultiweekChampionship: boolean;
  waiverType: string;
  waiverRule: string;
  usesFaab: boolean;
  draftPickTime: number;
  postDraftPlayers: string;
  maxTeams: number;
  waiverTime: number;
  tradeEndDate: string;
  tradeRatifyType: string;
  tradeRejectTime: number;
  playerPool: string;
  cantCutList: string;
  canTradeDraftPicks: boolean;
  rosterPositions: RosterPosition[];
  statCategories: StatCategory[];
  statModifiers: StatModifier[];
  divisions: Division[];
  pickemEnabled: boolean;
  usesFractionalPoints: boolean;
  usesNegativePoints: boolean;
}

interface RosterPosition {
  position: string;
  positionType?: string;
  count: number;
}

interface StatCategory {
  id: number;
  enabled: boolean;
  name: string;
  displayName: string;
  sortOrder: number;
  positionType: string;
  isOnlyDisplayStat?: boolean;
  isExcludedFromDisplay?: boolean;
  positionTypes: StatPositionType[];
}

interface StatPositionType {
  positionType: string;
  isOnlyDisplayStat?: boolean;
}

interface StatModifier {
  id: number;
  value: number;
}

interface Division {
  id: number;
  name: string;
}

export interface FantasyFootballLeagueScoreboard {
  week: number;
  matchups: ScoreboardMatchup[];
}

interface ScoreboardMatchup {
  week: number;
  weekStart: string;
  weekEnd: string;
  status: string;
  playoffs: boolean;
  consolation: boolean;
  matchupRecapAvailable: boolean;
  matchupRecapUrl?: string;
  matchupRecapTitle?: string;
  matchupGrades: ScoreboardMatchupGrade[];
  tied: boolean;
  winningTeamKey?: string;
  teams: MatchupTeam[];
}

interface ScoreboardMatchupGrade {
  teamKey: string;
  grade: string;
}

export interface FantasyFootballTeam {
  key: string;
  id: number;
  name: string;
  ownedByCurrentLogin: boolean;
  url: string;
  teamLogos: TeamLogo[];
  divisionId: number;
  waiverPriority?: number;
  faabBalance?: number;
  numberOfMoves: number;
  numberOfTrades: number;
  rosterAdds?: TeamRosterAdd;
  leagueScoringType: string;
  hasDraftGrade: boolean;
  draftGrade?: string;
  draftRecapUrl?: string;
  auctionBudgetTotal?: number;
  auctionBudgetSpent?: number;
  managers: TeamManager[];
  points?: TeamPoints;
  standings?: TeamStandings;
  matchups: Matchup[];
  roster?: TeamRoster;
}

interface TeamLogo {
  size: string;
  url: string;
}

interface TeamRosterAdd {
  coverageType: string;
  coverageValue: number;
  value: number;
}

interface TeamManager {
  id: number;
  nickname: string;
  guid: string;
  commissioner: boolean;
  currentLogin: boolean;
  email?: string;
  imageUrl: string;
}

interface TeamPoints {
  coverageType: string;
  season?: number;
  total: number;
}

interface TeamStandings {
  rank: number;
  playoffSeed?: number;
  teamOutcomeTotals: StandingsTeamOutcomeTotals;
  divisionOutcomeTotals: StandingsDivisionOutcomeTotals;
  streak?: StandingsStreak;
  pointsFor: number;
  pointsAgainst?: number;
}

interface StandingsTeamOutcomeTotals {
  wins: number;
  losses: number;
  ties: number;
  pct: number;
}

interface StandingsDivisionOutcomeTotals {
  wins: number;
  losses: number;
  ties: number;
}

interface StandingsStreak {
  type: string;
  value: number;
}

interface MatchupTeam {
  id: number;
  winProbability: number;
  points: MatchupTeamPoints;
  projectedPoints: MatchupTeamPoints;
}

interface MatchupTeamPoints {
  coverageType: string;
  week: number;
  total: number;
}

interface TeamRoster {
  coverageType: string;
  week: number;
  editable: boolean;
  players: RosterPlayer[];
}

export const parseLeagueMetadata = (root: Document): FantasyFootballLeagueMetadata => {
  const league = root.getElementsByTagName('league')[0];

  const key = mustHaveStringValue(league, 'league_key');
  const id = mustHaveStringValue(league, 'league_id');
  const name = mustHaveStringValue(league, 'name');
  const url = mustHaveStringValue(league, 'url');
  const logoUrl = mightHaveStringValue(league, 'logo_url');
  const password = mightHaveStringValue(league, 'password');
  const draftStatus = mustHaveStringValue(league, 'draft_status');
  const numTeams = mustHaveNumberValue(league, 'num_teams');
  const editKey = mustHaveNumberValue(league, 'edit_key');
  const weeklyDeadline = mightHaveStringValue(league, 'weekly_deadline');
  const leagueUpdateTimestamp = mightHaveNumberValue(league, 'league_update_timestamp');
  const scoringType = mustHaveStringValue(league, 'scoring_type');
  const leagueType = mustHaveStringValue(league, 'league_type');
  const renew = mustHaveStringValue(league, 'renew');
  const renewed = childExists(league, 'renewed');
  const irisGroupChatId = mustHaveStringValue(league, 'iris_group_chat_id');
  const shortInvitationUrl = mightHaveStringValue(league, 'short_invitation_url');
  const allowAddToDlExtraPos = mightHaveBooleanValue(league, 'allow_add_to_dl_extra_pos');
  const proLeague = mightHaveBooleanValue(league, 'is_pro_league');
  const cashLeague = mightHaveBooleanValue(league, 'is_cash_league');
  const currentWeek = mustHaveNumberValue(league, 'current_week');
  const startWeek = mustHaveNumberValue(league, 'start_week');
  const startDate = mustHaveStringValue(league, 'start_date');
  const endWeek = mustHaveNumberValue(league, 'end_week');
  const endDate = mustHaveStringValue(league, 'end_date');
  const gameCode = mustHaveStringValue(league, 'game_code');
  const season = mustHaveNumberValue(league, 'season');

  return {
    key,
    id,
    name,
    url,
    logoUrl,
    password,
    draftStatus,
    numTeams,
    editKey,
    weeklyDeadline,
    leagueUpdateTimestamp,
    scoringType,
    leagueType,
    renew,
    renewed,
    irisGroupChatId,
    shortInvitationUrl,
    allowAddToDlExtraPos,
    proLeague,
    cashLeague,
    currentWeek,
    startWeek,
    startDate,
    endWeek,
    endDate,
    gameCode,
    season,
  };
};

export const parseLeagueSettings = (root: Document): FantasyFootballLeagueSettings | undefined => {
  const league = root.getElementsByTagName('league').item(0);
  if (!league) {
    return;
  }

  const settings = league.getElementsByTagName('settings').item(0);
  if (!settings) {
    return;
  }

  const draftType = mustHaveStringValue(settings, 'draft_type');
  const auctionDraft = mustHaveBooleanValue(settings, 'is_auction_draft');
  const scoringType = mustHaveStringValue(settings, 'scoring_type');
  const persistentUrl = mightHaveStringValue(settings, 'persistent_url');
  const usesPlayoff = mustHaveBooleanValue(settings, 'uses_playoff');
  const hasPlayoffConsolationGames = mustHaveBooleanValue(settings, 'has_playoff_consolation_games');
  const playoffStartWeek = mustHaveNumberValue(settings, 'playoff_start_week');
  const usesPlayoffReseeding = mustHaveBooleanValue(settings, 'uses_playoff_reseeding');
  const usesLockEliminatedTeams = mustHaveBooleanValue(settings, 'uses_lock_eliminated_teams');
  const numPlayoffTeams = mustHaveNumberValue(settings, 'num_playoff_teams');
  const numPlayoffConsolationTeams = mustHaveNumberValue(settings, 'num_playoff_consolation_teams');
  const hasMultiweekChampionship = mustHaveBooleanValue(settings, 'has_multiweek_championship');
  const waiverType = mustHaveStringValue(settings, 'waiver_type');
  const waiverRule = mustHaveStringValue(settings, 'waiver_rule');
  const usesFaab = mustHaveBooleanValue(settings, 'uses_faab');
  const draftPickTime = mustHaveNumberValue(settings, 'draft_pick_time');
  const postDraftPlayers = mustHaveStringValue(settings, 'post_draft_players');
  const maxTeams = mustHaveNumberValue(settings, 'max_teams');
  const waiverTime = mustHaveNumberValue(settings, 'waiver_time');
  const tradeEndDate = mustHaveStringValue(settings, 'trade_end_date');
  const tradeRatifyType = mustHaveStringValue(settings, 'trade_ratify_type');
  const tradeRejectTime = mustHaveNumberValue(settings, 'trade_reject_time');
  const playerPool = mustHaveStringValue(settings, 'player_pool');
  const cantCutList = mustHaveStringValue(settings, 'cant_cut_list');
  const canTradeDraftPicks = mustHaveBooleanValue(settings, 'can_trade_draft_picks');
  const rosterPositions: RosterPosition[] = [];
  const statCategories: StatCategory[] = [];
  const statModifiers: StatModifier[] = [];
  const divisions: Division[] = [];
  const pickemEnabled = mustHaveBooleanValue(settings, 'pickem_enabled');
  const usesFractionalPoints = mustHaveBooleanValue(settings, 'uses_fractional_points');
  const usesNegativePoints = mustHaveBooleanValue(settings, 'uses_negative_points');

  const allRosterPositions = settings
    .getElementsByTagName('roster_positions')
    .item(0)!
    .getElementsByTagName('roster_position');
  for (let i = 0; i < allRosterPositions.length; i++) {
    rosterPositions.push(parseRosterPosition(allRosterPositions.item(i)!));
  }

  const allStatCategories = settings
    .getElementsByTagName('stat_categories')
    .item(0)!
    .getElementsByTagName('stat');
  for (let i = 0; i < allStatCategories.length; i++) {
    statCategories.push(parseStatCategory(allStatCategories.item(i)!));
  }

  const allStatModifiers = settings
    .getElementsByTagName('stat_modifiers')
    .item(0)!
    .getElementsByTagName('stat');
  for (let i = 0; i < allStatModifiers.length; i++) {
    statModifiers.push(parseStatModifer(allStatModifiers.item(i)!));
  }

  const allDivisions = settings
    .getElementsByTagName('divisions')
    .item(0)!
    .getElementsByTagName('division');
  for (let i = 0; i < allDivisions.length; i++) {
    divisions.push(parseDivision(allDivisions.item(i)!));
  }

  return {
    draftType,
    auctionDraft,
    scoringType,
    persistentUrl,
    usesPlayoff,
    hasPlayoffConsolationGames,
    playoffStartWeek,
    usesPlayoffReseeding,
    usesLockEliminatedTeams,
    numPlayoffTeams,
    numPlayoffConsolationTeams,
    hasMultiweekChampionship,
    waiverType,
    waiverRule,
    usesFaab,
    draftPickTime,
    postDraftPlayers,
    maxTeams,
    waiverTime,
    tradeEndDate,
    tradeRatifyType,
    tradeRejectTime,
    playerPool,
    cantCutList,
    canTradeDraftPicks,
    rosterPositions,
    statCategories,
    statModifiers,
    divisions,
    pickemEnabled,
    usesFractionalPoints,
    usesNegativePoints,
  };
};

const parseRosterPosition = (rosterPosition: Element): RosterPosition => {
  const position = mustHaveStringValue(rosterPosition, 'position');
  const positionType = mightHaveStringValue(rosterPosition, 'position_type');
  const count = mustHaveNumberValue(rosterPosition, 'count');

  return { position, positionType, count };
};

const parseStatCategory = (stat: Element): StatCategory => {
  const id = mustHaveNumberValue(stat, 'stat_id');
  const enabled = mustHaveBooleanValue(stat, 'enabled');
  const name = mustHaveStringValue(stat, 'name');
  const displayName = mustHaveStringValue(stat, 'display_name');
  const sortOrder = mustHaveNumberValue(stat, 'sort_order');
  const positionType = mustHaveStringValue(stat, 'position_type');
  const isOnlyDisplayStat = mightHaveBooleanValue(stat, 'is_only_display_stat');
  const isExcludedFromDisplay = mightHaveBooleanValue(stat, 'is_excluded_from_display');
  const positionTypes: StatPositionType[] = [];

  const allPositionTypesList = stat.getElementsByTagName('stat_position_types').item(0);
  if (allPositionTypesList) {
    const allPositionTypes = allPositionTypesList.getElementsByTagName('stat_position_type');
    for (let i = 0; i < allPositionTypes.length; i++) {
      positionTypes.push(parseStatPositionType(allPositionTypes.item(i)!));
    }
  }

  return {
    id,
    enabled,
    name,
    displayName,
    sortOrder,
    positionType,
    isOnlyDisplayStat,
    isExcludedFromDisplay,
    positionTypes,
  };
};

const parseStatPositionType = (spt: Element): StatPositionType => {
  const positionType = mustHaveStringValue(spt, 'position_type');
  const isOnlyDisplayStat = mightHaveBooleanValue(spt, 'is_only_display_stat');

  return { positionType, isOnlyDisplayStat };
};

const parseStatModifer = (stat: Element): StatModifier => {
  const id = mustHaveNumberValue(stat, 'stat_id');
  const value = mustHaveNumberValue(stat, 'value');

  return { id, value };
};

const parseDivision = (division: Element): Division => {
  const id = mustHaveNumberValue(division, 'division_id');
  const name = mustHaveStringValue(division, 'name');

  return { id, name };
};

export const parseLeagueScoreboard = (root: Document): FantasyFootballLeagueScoreboard | undefined => {
  const league = root.getElementsByTagName('league').item(0);
  if (!league) {
    return;
  }

  const scoreboard = league.getElementsByTagName('scoreboard').item(0);
  if (!scoreboard) {
    return;
  }

  const week = mustHaveNumberValue(scoreboard, 'week');
  const matchups: ScoreboardMatchup[] = [];

  const allMatchups = scoreboard
    .getElementsByTagName('matchups')
    .item(0)!
    .getElementsByTagName('matchup');
  for (let i = 0; i < allMatchups.length; i++) {
    matchups.push(parseScoreboardMatchup(allMatchups.item(i)!));
  }

  return { week, matchups };
};

const parseScoreboardMatchup = (matchup: Element): ScoreboardMatchup => {
  const week = mustHaveNumberValue(matchup, 'week');
  const weekStart = mustHaveStringValue(matchup, 'week_start');
  const weekEnd = mustHaveStringValue(matchup, 'week_end');
  const status = mustHaveStringValue(matchup, 'status');
  const playoffs = mustHaveBooleanValue(matchup, 'is_playoffs');
  const consolation = mustHaveBooleanValue(matchup, 'is_consolation');
  const matchupRecapAvailable = mustHaveBooleanValue(matchup, 'is_matchup_recap_available');
  const matchupRecapUrl = mightHaveStringValue(matchup, 'matchup_recap_url');
  const matchupRecapTitle = mightHaveStringValue(matchup, 'matchup_recap_title');
  const matchupGrades: ScoreboardMatchupGrade[] = [];
  const tied = mightHaveBooleanValue(matchup, 'is_tied');
  const winningTeamKey = mightHaveStringValue(matchup, 'winner_team_key');
  const teams: MatchupTeam[] = [];

  const allMatchupGradesList = matchup.getElementsByTagName('matchup_grades').item(0);
  if (allMatchupGradesList) {
    const allMatchupGrades = allMatchupGradesList.getElementsByTagName('matchup_grade');

    for (let i = 0; i < allMatchupGrades.length; i++) {
      matchupGrades.push(parseMatchupGrade(allMatchupGrades.item(i)!));
    }
  }

  const allTeams = matchup
    .getElementsByTagName('teams')
    .item(0)!
    .getElementsByTagName('team');
  for (let i = 0; i < allTeams.length; i++) {
    teams.push(parseMatchupTeam(allTeams.item(i)!));
  }

  return {
    week,
    weekStart,
    weekEnd,
    status,
    playoffs,
    consolation,
    matchupRecapAvailable,
    matchupRecapUrl,
    matchupRecapTitle,
    matchupGrades,
    tied,
    winningTeamKey,
    teams,
  };
};

const parseMatchupGrade = (matchupGrade: Element): ScoreboardMatchupGrade => {
  const teamKey = mustHaveStringValue(matchupGrade, 'team_key');
  const grade = mustHaveStringValue(matchupGrade, 'grade');

  return { teamKey, grade };
};

export const parseTeams = (root: Document): FantasyFootballTeam[] => {
  const teams: FantasyFootballTeam[] = [];

  const teamsList = root.getElementsByTagName('teams').item(0);
  if (teamsList) {
    const allTeams = teamsList.getElementsByTagName('team');
    for (let i = 0; i < allTeams.length; i++) {
      teams.push(_parseTeam(allTeams.item(i)!));
    }
  }

  return teams;
};

export const parseTeam = (root: Document) => {
  return _parseTeam(root.getElementsByTagName('team').item(0)!);
};

const _parseTeam = (team: Element): FantasyFootballTeam => {
  const key = mustHaveStringValue(team, 'team_key');
  const id = mustHaveNumberValue(team, 'team_id');
  const name = mustHaveStringValue(team, 'name');
  const ownedByCurrentLogin = mightHaveBooleanValue(team, 'is_owned_by_current_login');
  const url = mustHaveStringValue(team, 'url');
  const teamLogos: TeamLogo[] = [];
  const divisionId = mustHaveNumberValue(team, 'division_id');
  const waiverPriority = mightHaveNumberValue(team, 'waiver_priority');
  const faabBalance = mightHaveNumberValue(team, 'faab_balance');
  const numberOfMoves = mustHaveNumberValue(team, 'number_of_moves');
  const numberOfTrades = mustHaveNumberValue(team, 'number_of_trades');
  const rosterAdds = parseTeamRosterAdd(team);
  const leagueScoringType = mustHaveStringValue(team, 'league_scoring_type');
  const hasDraftGrade = mustHaveBooleanValue(team, 'has_draft_grade');
  const draftGrade = mightHaveStringValue(team, 'draft_grade');
  const draftRecapUrl = mightHaveStringValue(team, 'draft_recap_url');
  const auctionBudgetTotal = mightHaveNumberValue(team, 'auction_budget_total');
  const auctionBudgetSpent = mightHaveNumberValue(team, 'auction_budget_spent');
  const managers: TeamManager[] = [];
  const points = parseTeamPoints(team);
  const standings = parseTeamStandings(team);
  const matchups: Matchup[] = [];
  const roster = parseRoster(team);

  const allTeamLogos = team
    .getElementsByTagName('team_logos')
    .item(0)!
    .getElementsByTagName('team_logo');
  for (let i = 0; i < allTeamLogos.length; i++) {
    teamLogos.push(parseTeamLogo(allTeamLogos.item(i)!));
  }

  const allManagers = team
    .getElementsByTagName('managers')
    .item(0)!
    .getElementsByTagName('manager');
  for (let i = 0; i < allManagers.length; i++) {
    managers.push(parseManager(allManagers.item(i)!));
  }

  const allMatchupsList = team.getElementsByTagName('matchups').item(0);
  if (allMatchupsList) {
    const allMatchups = allMatchupsList.getElementsByTagName('matchup');
    for (let i = 0; i < allMatchups.length; i++) {
      matchups.push(parseMatchup(id, allMatchups.item(i)!));
    }
  }

  return {
    key,
    id,
    name,
    ownedByCurrentLogin,
    url,
    teamLogos,
    divisionId,
    waiverPriority,
    faabBalance,
    numberOfMoves,
    numberOfTrades,
    rosterAdds,
    leagueScoringType,
    hasDraftGrade,
    draftGrade,
    draftRecapUrl,
    auctionBudgetTotal,
    auctionBudgetSpent,
    managers,
    points,
    standings,
    matchups,
    roster,
  };
};

const parseTeamLogo = (teamLogo: Element): TeamLogo => {
  const size = mustHaveStringValue(teamLogo, 'size');
  const url = mustHaveStringValue(teamLogo, 'url');

  return { size, url };
};

const parseTeamRosterAdd = (team: Element): TeamRosterAdd | undefined => {
  const rosterAdd = team.getElementsByTagName('roster_adds').item(0);
  if (!rosterAdd) {
    return;
  }

  const coverageType = mustHaveStringValue(rosterAdd, 'coverage_type');
  const coverageValue = mustHaveNumberValue(rosterAdd, 'coverage_value');
  const value = mustHaveNumberValue(rosterAdd, 'value');

  return { coverageType, coverageValue, value };
};

const parseManager = (manager: Element): TeamManager => {
  const id = mustHaveNumberValue(manager, 'manager_id');
  const nickname = mustHaveStringValue(manager, 'nickname');
  const guid = mustHaveStringValue(manager, 'guid');
  const commissioner = mightHaveBooleanValue(manager, 'is_commissioner');
  const currentLogin = mightHaveBooleanValue(manager, 'is_current_login');
  const email = mightHaveStringValue(manager, 'email');
  const imageUrl = mustHaveStringValue(manager, 'image_url');

  return { id, nickname, guid, commissioner, currentLogin, email, imageUrl };
};

const parseTeamPoints = (team: Element): TeamPoints | undefined => {
  const points = team.getElementsByTagName('team_points').item(0);
  if (!points) {
    return;
  }

  const coverageType = mustHaveStringValue(points, 'coverage_type');
  const season = mightHaveNumberValue(points, 'season');
  const total = mustHaveNumberValue(points, 'total');

  return { coverageType, season, total };
};

const parseTeamStandings = (team: Element): TeamStandings | undefined => {
  const standings = team.getElementsByTagName('team_standings').item(0);
  if (!standings) {
    return;
  }

  const rank = mustHaveNumberValue(standings, 'rank');
  const playoffSeed = mightHaveNumberValue(standings, 'playoff_seed');
  const teamOutcomeTotals = parseStandingsTeamOutcomeTotals(standings);
  const divisionOutcomeTotals = parseStandingsDivisionOutcomeTotals(standings);
  const streak = parseStandingsStreak(standings);
  const pointsFor = mustHaveNumberValue(standings, 'points_for');
  const pointsAgainst = mustHaveNumberValue(standings, 'points_against');

  return { rank, playoffSeed, teamOutcomeTotals, divisionOutcomeTotals, streak, pointsFor, pointsAgainst };
};

const parseStandingsTeamOutcomeTotals = (standings: Element): StandingsTeamOutcomeTotals => {
  const tot = standings.getElementsByTagName('outcome_totals').item(0)!;

  const wins = mustHaveNumberValue(tot, 'wins');
  const losses = mustHaveNumberValue(tot, 'losses');
  const ties = mustHaveNumberValue(tot, 'ties');
  const pct = mustHaveNumberValue(tot, 'percentage');

  return { wins, losses, ties, pct };
};

const parseStandingsDivisionOutcomeTotals = (standings: Element): StandingsDivisionOutcomeTotals => {
  const dot = standings.getElementsByTagName('divisional_outcome_totals').item(0)!;

  const wins = mustHaveNumberValue(dot, 'wins');
  const losses = mustHaveNumberValue(dot, 'losses');
  const ties = mustHaveNumberValue(dot, 'ties');

  return { wins, losses, ties };
};

const parseStandingsStreak = (standings: Element): StandingsStreak | undefined => {
  const streak = standings.getElementsByTagName('streak').item(0);

  if (!streak) {
    return;
  }

  const type = mustHaveStringValue(streak, 'type');
  const value = mustHaveNumberValue(streak, 'value');

  return { type, value };
};

interface Matchup {
  week: number;
  weekStart: string;
  weekEnd: string;
  status: string;
  playoffs: boolean;
  consolation: boolean;
  matchRecapAvailable: boolean;
  self: MatchupTeam;
  opp: MatchupTeam;
}

const parseMatchup = (teamId: number, matchup: Element): Matchup => {
  const week = mustHaveNumberValue(matchup, 'week');
  const weekStart = mustHaveStringValue(matchup, 'week_start');
  const weekEnd = mustHaveStringValue(matchup, 'week_end');
  const status = mustHaveStringValue(matchup, 'status');
  const playoffs = mustHaveBooleanValue(matchup, 'is_playoffs');
  const consolation = mustHaveBooleanValue(matchup, 'is_consolation');
  const matchRecapAvailable = mustHaveBooleanValue(matchup, 'is_matchup_recap_available');
  const teams: MatchupTeam[] = [];

  const allTeams = matchup
    .getElementsByTagName('teams')
    .item(0)!
    .getElementsByTagName('team');
  for (let i = 0; i < allTeams.length; i++) {
    teams.push(parseMatchupTeam(allTeams.item(i)!));
  }

  return {
    week,
    weekStart,
    weekEnd,
    status,
    playoffs,
    consolation,
    matchRecapAvailable,
    ...teams.reduce(
      (acc, team) => ({
        ...acc,
        [team.id === teamId ? 'self' : 'opp']: team,
      }),
      {} as { self: MatchupTeam; opp: MatchupTeam }
    ),
  };
};

const parseMatchupTeam = (matchupTeam: Element): MatchupTeam => {
  const id = mustHaveNumberValue(matchupTeam, 'team_id');
  const winProbability = mustHaveNumberValue(matchupTeam, 'win_probability');
  const points = parseMatchupTeamPoints(matchupTeam.getElementsByTagName('team_points').item(0)!);
  const projectedPoints = parseMatchupTeamPoints(matchupTeam.getElementsByTagName('team_projected_points').item(0)!);

  return { id, winProbability, points, projectedPoints };
};

const parseMatchupTeamPoints = (matchupTeamPoints: Element): MatchupTeamPoints => {
  const coverageType = mustHaveStringValue(matchupTeamPoints, 'coverage_type');
  const week = mustHaveNumberValue(matchupTeamPoints, 'week');
  const total = mustHaveNumberValue(matchupTeamPoints, 'total');
  return { coverageType, week, total };
};

export interface FantasyFootballLeagueStandings {
  teams: FantasyFootballTeam[];
}

export const parseLeagueStandings = (root: Document): FantasyFootballLeagueStandings | undefined => {
  const league = root.getElementsByTagName('league').item(0);
  if (!league) {
    return;
  }

  const standings = league.getElementsByTagName('standings').item(0);
  if (!standings) {
    return;
  }

  const teams: FantasyFootballTeam[] = [];

  const allTeams = standings
    .getElementsByTagName('teams')
    .item(0)!
    .getElementsByTagName('team');
  for (let i = 0; i < allTeams.length; i++) {
    teams.push(_parseTeam(allTeams.item(i)!));
  }

  return { teams };
};

const parseRoster = (team: Element): TeamRoster | undefined => {
  const roster = team.getElementsByTagName('roster').item(0);
  if (!roster) {
    return;
  }

  const coverageType = mustHaveStringValue(roster, 'coverage_type');
  const week = mustHaveNumberValue(roster, 'week');
  const editable = mustHaveBooleanValue(roster, 'is_editable');
  const players: RosterPlayer[] = [];

  const allPlayersList = roster.getElementsByTagName('players').item(0);
  if (allPlayersList) {
    const allPlayers = allPlayersList.getElementsByTagName('player');
    for (let i = 0; i < allPlayers.length; i++) {
      players.push(parsePlayer(allPlayers.item(i)!));
    }
  }

  return { coverageType, week, editable, players };
};

const parsePlayer = (player: Element): RosterPlayer => {
  const key = mustHaveStringValue(player, 'player_key');
  const id = mustHaveNumberValue(player, 'player_id');
  const name = parsePlayerName(player.getElementsByTagName('name').item(0)!);
  const editorialPlayerKey = mustHaveStringValue(player, 'editorial_player_key');
  const editorialTeamKey = mustHaveStringValue(player, 'editorial_team_key');
  const editorialTeamFullName = mustHaveStringValue(player, 'editorial_team_full_name');
  const editorialTeamAbbr = mustHaveStringValue(player, 'editorial_team_abbr');
  const byeWeeks = parseByeWeeks(player);
  const uniformNumber = mustHaveNumberValue(player, 'uniform_number');
  const displayPosition = mustHaveStringValue(player, 'display_position');
  const headshot = parseHeadshot(player.getElementsByTagName('headshot').item(0)!);
  const imageUrl = mustHaveStringValue(player, 'image_url');
  const undroppable = mustHaveBooleanValue(player, 'is_undroppable');
  const positionType = mustHaveStringValue(player, 'position_type');
  const primaryPosition = mustHaveStringValue(player, 'primary_position');
  const eligiblePositions = parseEligiblePositions(player);
  const playerNotes = mightHaveBooleanValue(player, 'has_player_notes');
  const playerNotesLastTimestamp = mightHaveNumberValue(player, 'player_notes_last_timestamp');
  const selectedPosition = parseSelectedPosition(player);

  return {
    key,
    id,
    name,
    editorialPlayerKey,
    editorialTeamKey,
    editorialTeamFullName,
    editorialTeamAbbr,
    byeWeeks,
    uniformNumber,
    displayPosition,
    headshot,
    imageUrl,
    undroppable,
    positionType,
    primaryPosition,
    eligiblePositions,
    playerNotes,
    playerNotesLastTimestamp,
    selectedPosition,
  };
};

const parsePlayerName = (playerName: Element): RosterPlayerName => {
  const full = mustHaveStringValue(playerName, 'full');
  const first = mustHaveStringValue(playerName, 'first');
  const last = mustHaveStringValue(playerName, 'last');
  const asciiFirst = mustHaveStringValue(playerName, 'ascii_first');
  const asciiLast = mustHaveStringValue(playerName, 'ascii_last');

  return { full, first, last, asciiFirst, asciiLast };
};

const parseByeWeeks = (player: Element): number[] => {
  const byeWeeks: number[] = [];

  const weeks = player
    .getElementsByTagName('bye_weeks')
    .item(0)!
    .getElementsByTagName('weeks');
  for (let i = 0; i < weeks.length; i++) {
    try {
      byeWeeks.push(parseInt(weeks.item(i)!.textContent || ''));
    } catch {}
  }

  return byeWeeks;
};

const parseHeadshot = (headshot: Element): RosterPlayerHeadshot => {
  const url = mustHaveStringValue(headshot, 'url');
  const size = mustHaveStringValue(headshot, 'size');

  return { url, size };
};

const parseEligiblePositions = (player: Element): string[] => {
  const eligiblePositions: string[] = [];

  const eligiblePositionsList = player.getElementsByTagName('eligible_positions').item(0);
  if (eligiblePositionsList) {
    const positions = eligiblePositionsList.getElementsByTagName('weeks');
    for (let i = 0; i < positions.length; i++) {
      eligiblePositions.push(positions.item(i)!.textContent || '');
    }
  }

  return eligiblePositions;
};

const parseSelectedPosition = (player: Element): RosterPlayerSelectedPosition | undefined => {
  const selectedPosition = player.getElementsByTagName('selected_position').item(0);
  if (!selectedPosition) {
    return;
  }

  const coverageType = mustHaveStringValue(selectedPosition, 'coverage_type');
  const week = mustHaveNumberValue(selectedPosition, 'week');
  const position = mustHaveStringValue(selectedPosition, 'position');

  return { coverageType, week, position };
};

interface RosterPlayer {
  key: string;
  id: number;
  name: RosterPlayerName;
  editorialPlayerKey: string;
  editorialTeamKey: string;
  editorialTeamFullName: string;
  editorialTeamAbbr: string;
  byeWeeks: number[];
  uniformNumber: number;
  displayPosition: string;
  headshot: RosterPlayerHeadshot;
  imageUrl: string;
  undroppable: boolean;
  positionType: string;
  primaryPosition: string;
  eligiblePositions: string[];
  playerNotes: boolean;
  playerNotesLastTimestamp?: number;
  selectedPosition?: RosterPlayerSelectedPosition;
}

interface RosterPlayerName {
  full: string;
  first: string;
  last: string;
  asciiFirst: string;
  asciiLast: string;
}

interface RosterPlayerHeadshot {
  url: string;
  size: string;
}

interface RosterPlayerSelectedPosition {
  coverageType: string;
  week: number;
  position: string;
}
