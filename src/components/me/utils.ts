import { BSON } from 'mongodb-stitch-browser-sdk';

import { Season, YahooLeagueMeta, YahooLeagueSettings, YahooLeagueStandings } from '../../types';

const unknowns: { [key: string]: string } = {
  'thebiggreen22@yahoo.com': 'bmcardle22@gmail.com',
  'vickvinegar1999@yahoo.com': 'ajvoucas@gmail.com',
  'charlie.kollar@yahoo.com': 'roycheck99@gmail.com',
  'rlpigue@hotmail.com': 'rob.pigue@gmail.com',
  'dannyjoe11242002@yahoo.com': 'danpogoda@gmail.com',
  'cbant5289@yahoo.com': 'cbanten1@gmail.com',
  'skittles15007@yahoo.com': 'adambarlow22@gmail.com',
  'velotta.rich@yahoo.com': 'velotta.rich@gmail.com',
};

const hiddens: { [key: string]: string } = {
  'Tony Wonder': 'rob.pigue@gmail.com',
  'Peanutbutter Gumball': 'rob.pigue@gmail.com',
};

const managerIds: { [key: string]: string } = {
  'npm622@yahoo.com': '5d44a9b18e68765256aeb14f',
  'rob.pigue@gmail.com': '5d44a9b18e68765256aeb159',
  'danpogoda@gmail.com': '5d44a9b18e68765256aeb155',
  'velotta.rich@gmail.com': '5d44a9b18e68765256aeb158',
  'ericwdelia@gmail.com': '5d44a9b18e68765256aeb154',
  'adambarlow22@gmail.com': '5d44a9b18e68765256aeb157',
  'brendan.p.lane@gmail.com': '5d44a9b18e68765256aeb151',
  'cbanten1@gmail.com': '5d44a9b18e68765256aeb156',
  'mrodgers389@gmail.com': '5d44a9b18e68765256aeb150',
  'rob.intrieri@gmail.com': '5d44a9b18e68765256aeb152',
  'mikeyurk@gmail.com': '5d44a9b18e68765256aeb153',
  'bmcardle22@gmail.com': '5d44a9b18e68765256aeb15c',
  'roycheck99@gmail.com': '5d44a9b18e68765256aeb15a',
  'ajvoucas@gmail.com': '5d44a9b18e68765256aeb15b',
  'jeffreycswan@gmail.com': '5d54cda81acd79a8377140d9',
};

const normalizeEmail = (email: string, name: string) => {
  return unknowns[email] ? unknowns[email] : email || hiddens[name];
};

export const newSeason = (
  meta: YahooLeagueMeta,
  { settings: [settings] }: YahooLeagueSettings,
  { standings: [{ teams }] }: YahooLeagueStandings
): Season => {
  const divisionManagerIndexes: { [key: number]: number[] } = {};

  const managers = Object.entries(teams)
    .map(([k, v]) => {
      if (typeof v === 'number') {
        return null;
      }

      const index = parseInt(k) + 1;

      const [meta] = v.team;
      const team_email = meta
        .map(d => d.managers)
        .filter(d => d)
        .map(m => m[0].manager.email)
        .find(d => d);
      const team_name = meta.map(d => d.name).find(d => d);
      const team_division_id = meta.map(d => d.division_id).find(d => d);
      const manager_id = new BSON.ObjectId(managerIds[normalizeEmail(team_email, team_name)]);

      divisionManagerIndexes[team_division_id] = (divisionManagerIndexes[team_division_id] || []).concat(index);

      return {
        manager_id,
        index,
        team_name,
      };
    })
    .filter(manager => manager) as (Season['managers']);

  const statValues: { [key: number]: number } = settings.stat_modifiers.stats.reduce(
    (acc, { stat }) => ({
      ...acc,
      [stat.stat_id]: stat.value,
    }),
    {}
  );

  return {
    year: parseInt(meta.season),
    start_date: new Date(meta.start_date),
    end_date: new Date(meta.end_date),
    recent_week: parseInt(meta.current_week) - 1,
    commissioner: new BSON.ObjectId(managerIds['npm622@yahoo.com']),
    managers,
    settings: {
      scoring: {
        type: meta.scoring_type,
        fraction_points: settings.uses_fractional_points === '1',
        negative_points: settings.uses_negative_points === '1',
      },
      draft: {
        type: settings.draft_type,
        auction: settings.is_auction_draft === '1',
        pick_time: parseInt(settings.draft_pick_time),
      },
      waivers: {
        type: settings.waiver_type,
        rule: settings.waiver_rule,
        time: parseInt(settings.waiver_time),
        faab: settings.uses_faab === '1',
      },
      trade: {
        deadline: new Date(settings.trade_end_date),
        ratify_type: settings.trade_ratify_type,
        reject_time: parseInt(settings.trade_reject_time),
        draft_picks: settings.can_trade_draft_picks === '1',
      },
      players: {
        pool: settings.player_pool,
        cant_cut_list: settings.cant_cut_list,
        post_draft: settings.post_draft_players,
      },
      playoffs: {
        start_week: parseInt(settings.playoff_start_week),
        size: parseInt(settings.num_playoff_teams),
        consolation_size: settings.has_playoff_consolation_games ? settings.num_playoff_consolation_teams : 0,
        reseed: settings.uses_playoff_reseeding === 1,
        lock_eliminated_teams: settings.uses_lock_eliminated_teams === 1,
      },
    },
    scoring: settings.stat_categories.stats.map(({ stat }) => ({
      id: stat.stat_id,
      sort: parseInt(stat.sort_order),
      enabled: stat.enabled === '1',
      value: statValues[stat.stat_id],
      type: stat.position_type,
      name: stat.name,
      display: stat.display_name,
    })),
    rosters: settings.roster_positions.map(({ roster_position }) => ({
      position: roster_position.position,
      type: roster_position.position_type,
      count: roster_position.count,
    })),
    divisions: settings.divisions.map(({ division }, i) => ({
      index: i + 1,
      name: division.name,
      manager_indexes: divisionManagerIndexes[division.division_id],
    })),
    yahoo_data: {
      key: meta.league_key,
      id: meta.league_id,
      url: meta.url,
    },
  };
};
