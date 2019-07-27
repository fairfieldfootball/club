import { BSON } from 'mongodb-stitch-browser-sdk';

import appActions from '../../../actions';
import { RootContext, RootState } from '../../../root';

import { Draft } from '../../drafts';
// import { Matchup } from '../../matchups';
import { Manager } from '../../managers';
import { Season } from '../../seasons';
import { Standings } from '../../standings';

import State from '../state';

import {
  // parseLeagueMetadata,
  // parseLeagueScoreboard,
  // parseLeagueSettings,
  // parseLeagueStandings,
  // parseTeam,
  // parseTeams,
  FantasyFootballTeam,
  LeagueYearData,
} from './league';

const factory = appActions.app().forNamespace<State>(State.NAMESPACE);

const names: any = {
  'npm622@yahoo.com': { first_name: 'Nick', last_name: 'Makes' },
  'rob.pigue@gmail.com': { first_name: 'Robbie', last_name: 'Pigue' },
  'danpogoda@gmail.com': { first_name: 'Dan', last_name: 'Pogoda' },
  'velotta.rich@gmail.com': { first_name: 'Rich', last_name: 'Velotta' },
  'ericwdelia@gmail.com': { first_name: 'Eric', last_name: "D'Elia" },
  'adambarlow22@gmail.com': { first_name: 'Adam', last_name: 'Barlow' },
  'brendan.p.lane@gmail.com': { first_name: 'Brendan', last_name: 'Lane' },
  'cbanten1@gmail.com': { first_name: 'Chris', last_name: 'Banten' },
  'mrodgers389@gmail.com': { first_name: 'Mark', last_name: 'Rodgers' },
  'rob.intrieri@gmail.com': { first_name: 'Rob', last_name: 'Intrieri' },
  'mikeyurk@gmail.com': { first_name: 'Michael', last_name: 'Yurkerwich' },
  'bmcardle22@gmail.com': { first_name: 'Brian', last_name: 'McArdle' },
  'roycheck99@gmail.com': { first_name: 'Charlie', last_name: 'Kollar' },
  'ajvoucas@gmail.com': { first_name: 'Alex', last_name: 'Voucas' },
};

const unknowns: any = {
  'thebiggreen22@yahoo.com': 'bmcardle22@gmail.com',
  'vickvinegar1999@yahoo.com': 'ajvoucas@gmail.com',
  'charlie.kollar@yahoo.com': 'roycheck99@gmail.com',
  'rlpigue@hotmail.com': 'rob.pigue@gmail.com',
  'dannyjoe11242002@yahoo.com': 'danpogoda@gmail.com',
  'cbant5289@yahoo.com': 'cbanten1@gmail.com',
  'skittles15007@yahoo.com': 'adambarlow22@gmail.com',
  'velotta.rich@yahoo.com': 'velotta.rich@gmail.com',
};

const hiddens: any = {
  'Tony Wonder': 'rob.pigue@gmail.com',
  'Peanutbutter Gumball': 'rob.pigue@gmail.com',
};

const normalizeEmail = (team: FantasyFootballTeam) => {
  const manager = team.managers[0];

  const managerEmail = manager.email || '';

  return unknowns[managerEmail] ? unknowns[managerEmail] : managerEmail || hiddens[team.name];
};

// const normalizeManager = ({ manager }: { manager: { email?: string } }) => {
//   const managerEmail = manager.email || '';
//   console.log(managerEmail);
//
//   return unknowns[managerEmail] ? unknowns[managerEmail] : managerEmail;
// };

const ids: any = {
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
};

const leagueIds: any = {
  '314.l.206212': '5d479c490e6c9811fdd90a13',
  '331.l.407576': '5d479c460e6c9811fdd90a10',
  '348.l.650735': '5d479c430e6c9811fdd90a0d',
  '359.l.562551': '5d479c410e6c9811fdd90a0a',
  '371.l.402544': '5d479c3f0e6c9811fdd90a07',
  '380.l.875189': '5d4780920e6c9811fdd90a04',
};

export const insertManagers = factory.withType('insert managers').asThunk(() => (_dispatch, getState, stitch) => {
  const leagueData: { [key: number]: LeagueYearData } = getState().ffc.leagueData || {};

  const managers: { [key: string]: Manager } = {};

  const leagueDatas = Object.values(leagueData);
  for (let i = 0; i < leagueDatas.length; i++) {
    const { teams } = leagueDatas[i];
    for (let j = 0; j < teams.length; j++) {
      const team = teams[j];
      const email = normalizeEmail(team);

      managers[email] = { email, ...(names[email] || {}) };
    }
  }

  return stitch
    .clients()
    .db('ffc', 'app')
    .collection<Manager>('managers')
    .insertMany(Object.values(managers));
});

export const deleteManagers = factory.withType('delete managers').asThunk(() => (_dispatch, _getState, stitch) =>
  stitch
    .clients()
    .db('ffc', 'app')
    .collection<Manager>('managers')
    .deleteMany({})
);

export const saveSeasonStandings = factory
  .withType('save season standings')
  .asThunk((leagueKey: string) => (_dispatch, _getState, { stitch }) =>
    stitch.callFunction('saveStandings', [leagueIds[leagueKey]])
  );

export const saveDraftResults = factory
  .withType('save draft results')
  .asThunk((leagueKey: string) => (_dispatch, getState, stitch) =>
    makeYahooRequests(
      getState(),
      stitch,
      [`https://fantasysports.yahooapis.com/fantasy/v2/league/${leagueKey}/draftresults`],
      true
    ).then(([{ fantasy_content: { league: [_meta, { draft_results }] } }]) =>
      stitch
        .clients()
        .db('ffc', 'app')
        .collection<Draft>('drafts')
        .insertOne({
          season_id: new BSON.ObjectId(leagueIds[leagueKey]),
          picks: Object.values<any>(draft_results)
            .filter(r => r.draft_result)
            .map(({ draft_result: { pick, round, player_key, team_key, cost } }) => ({
              index: pick,
              round: round,
              player_key: player_key,
              team_key: team_key,
              cost: parseInt(cost),
            })),
        })
    )
  );

const calculateWinPct = ({ wins, losses, ties }: { wins: number; losses: number; ties: number }) =>
  wins / (wins + losses + ties);

export const convertSeason = factory
  .withType('convert season')
  .asThunk(
    ({ leagueMetadata, leagueSettings, leagueStandings, teams }: LeagueYearData) => (_dispatch, _getState, stitch) => {
      if (!leagueMetadata || !leagueSettings || !leagueStandings) {
        return {};
      }

      const statValues: { [key: number]: number } = leagueSettings.statModifiers.reduce(
        (acc, { id, value }) => ({
          ...acc,
          [id]: value,
        }),
        {}
      );

      const db = stitch.clients().db('ffc', 'app');

      const divisionManagerIndexes: { [key: number]: number[] } = {};
      const managerIndexes: { [key: string]: number } = {};

      const managers = teams.map((team, i) => {
        const managerId = ids[normalizeEmail(team)];
        const index = i + 1;

        divisionManagerIndexes[team.divisionId] = (divisionManagerIndexes[team.divisionId] || []).concat(i);
        managerIndexes[managerId] = index;

        return {
          manager_id: managerId,
          index: i + 1,
          team_name: team.name,
        };
      });

      return db
        .collection<Season>('seasons')
        .insertOne({
          year: leagueMetadata.season,
          start_date: new Date(leagueMetadata.startDate),
          end_date: new Date(leagueMetadata.endDate),
          recent_week: leagueMetadata.currentWeek,
          commissioner: new BSON.ObjectId('5d44a8c373295704552bbc2e'),
          managers,
          settings: {
            scoring: {
              type: leagueSettings.scoringType,
              fraction_points: leagueSettings.usesFractionalPoints,
              negative_points: leagueSettings.usesNegativePoints,
            },
            draft: {
              type: leagueSettings.draftType,
              auction: leagueSettings.auctionDraft,
              pick_time: leagueSettings.draftPickTime,
            },
            waivers: {
              type: leagueSettings.waiverType,
              rule: leagueSettings.waiverRule,
              time: leagueSettings.waiverTime,
              faab: leagueSettings.usesFaab,
            },
            trade: {
              deadline: new Date(leagueSettings.tradeEndDate),
              ratify_type: leagueSettings.tradeRatifyType,
              reject_time: leagueSettings.tradeRejectTime,
              draft_picks: leagueSettings.canTradeDraftPicks,
            },
            players: {
              pool: leagueSettings.playerPool,
              cant_cut_list: leagueSettings.cantCutList,
              post_draft: leagueSettings.postDraftPlayers,
            },
            playoffs: {
              start_week: leagueSettings.playoffStartWeek,
              size: leagueSettings.numPlayoffTeams,
              consolation_size: leagueSettings.hasPlayoffConsolationGames
                ? leagueSettings.numPlayoffConsolationTeams
                : 0,
              reseed: leagueSettings.usesPlayoffReseeding,
              lock_eliminated_teams: leagueSettings.usesLockEliminatedTeams,
            },
          },
          scoring: leagueSettings.statCategories.map(({ id, enabled, name, displayName, sortOrder, positionType }) => ({
            id,
            sort: sortOrder,
            enabled,
            value: statValues[id],
            type: positionType,
            name,
            display: displayName,
          })),
          rosters: leagueSettings.rosterPositions.map(({ position, positionType, count }) => ({
            position,
            type: positionType,
            count,
          })),
          divisions: leagueSettings.divisions.map(({ id, name }, i) => ({
            index: i + 1,
            name,
            manager_indexes: divisionManagerIndexes[id],
          })),
          // schedule: [],
          // playoffs: [],
          yahoo_data: {
            key: leagueMetadata.key,
            id: leagueMetadata.id,
            url: leagueMetadata.url,
          },
        })
        .then(({ insertedId }) => {
          db.collection<Standings>('standings').insertOne({
            season_id: insertedId,
            week: 16,
            teams: leagueStandings.teams.map(team => {
              const managerId = ids[normalizeEmail(team)];
              return {
                name: team.name,
                team_key: team.key,
                manager_id: new BSON.ObjectId(managerId),
                season_manager_index: managerIndexes[managerId],
                rank: team.standings ? team.standings.rank : 0,
                record: {
                  wins: team.standings ? team.standings.teamOutcomeTotals.wins : 0,
                  losses: team.standings ? team.standings.teamOutcomeTotals.losses : 0,
                  ties: team.standings ? team.standings.teamOutcomeTotals.ties : 0,
                  pct: team.standings ? calculateWinPct(team.standings.teamOutcomeTotals) : 0,
                  points_for: team.standings ? team.standings.pointsFor : 0,
                  points_against: (team.standings && team.standings.pointsAgainst) || 0,
                },
                playoffs_record: {
                  wins: 0,
                  losses: 0,
                  ties: 0,
                  pct: 0,
                  points_for: 0,
                  points_against: 0,
                },
                streak: (team.standings && team.standings.streak) || { type: '', value: 0 },
                waiver: {
                  position: team.waiverPriority || 0,
                  budget: team.faabBalance || 0,
                },
                moves: team.numberOfMoves,
              };
            }),
          });
        });
    }
  );

export const deleteSeason = factory
  .withType('delete season')
  .asThunk((year: number) => (_dispatch, _getState, stitch) =>
    stitch
      .clients()
      .db('ffc', 'app')
      .collection<Season>('seasons')
      .findOneAndDelete({ year })
      .then(season => {
        if (season) {
          stitch
            .clients()
            .db('ffc', 'app')
            .collection<Standings>('standings')
            .deleteOne({ season_id: season._id });
        }
      })
  );

const makeYahooRequests = (
  { auth }: RootState,
  { stitch }: RootContext,
  urls: string[],
  json?: boolean
): Promise<any[]> =>
  stitch
    .callFunction('makeYahooRequests', [
      auth.user ? auth.user.email : '',
      json ? urls.map(url => `${url}?format=json`) : urls,
      process.env.YAHOO_REDIRECT_URI,
    ])
    .then((responses: any[]) =>
      responses.map(res => {
        if (json) {
          console.log(res);
          return JSON.parse(res);
        }

        const root = new DOMParser().parseFromString(res, 'application/xml');

        const error = root.getElementsByTagName('yahoo:description').item(0);
        if (error) {
          throw new Error(error.textContent || 'an unexpected eror occurred when executing Yahoo! api request');
        }

        return root;
      })
    );

// const parseRoster = (r: any): { active_players: any[]; bench_players: any[] } => {
//   const players = Object.values<any>(r['0'].players)
//     .filter(v => typeof v !== 'number')
//     .map(({ player: [meta, { selected_position }] }) => {
//       const position = selected_position[1].position;
//       return {
//         player_key: meta[0].player_key,
//         player_name: meta[2].name.full,
//         position: position === 'BN' ? undefined : selected_position[1].position,
//         positions: (
//           meta.find((o: any) => 'eligible_positions' in o) || { eligible_positions: [{ position: '' }] }
//         ).eligible_positions
//           .map((v: any) => v.position)
//           .filter((p: any) => p && p !== 'W/R/T'),
//       };
//     });
//   return {
//     active_players: players.filter(p => !!p.position),
//     bench_players: players.filter(p => !p.position),
//   };
// };

export const getFfcLeague = factory
  .withType('get ffc league')
  .asThunk((leagueKey: string, week: number) => (_dispatch, getState, { stitch }) =>
    stitch.callFunction('complexAction', [
      getState().auth.user.email,
      process.env.YAHOO_REDIRECT_URI,
      [
        // `https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.1/roster;week=${week}/players/stats`,
        // `https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.2/roster;week=${week}/players/stats`,
        // `https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.3/roster;week=${week}/players/stats`,
        // `https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.4/roster;week=${week}/players/stats`,
        // `https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.5/roster;week=${week}/players/stats`,
        // `https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.6/roster;week=${week}/players/stats`,
        // `https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.7/roster;week=${week}/players/stats`,
        // `https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.8/roster;week=${week}/players/stats`,
        // `https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.9/roster;week=${week}/players/stats`,
        // `https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.10/roster;week=${week}/players/stats`,
        // `https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.11/roster;week=${week}/players/stats`,
        // `https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.12/roster;week=${week}/players/stats`,
        // `https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.13/roster;week=${week}/players/stats`,
        // `https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.14/roster;week=${week}/players/stats`,
      ],
      leagueIds[leagueKey],
      week,
    ])
  );
// export const getFfcLeague = factory
//   .withType('get ffc league')
//   .asThunk((leagueKey: string, week: number) => (_dispatch, getState, stitch) =>
//     makeYahooRequests(
//       getState(), // roster;week=1/players/stats
//       stitch,
//       [
//         // `https://fantasysports.yahooapis.com/fantasy/v2/league/${leagueKey}/scoreboard;week=${week}`,
//         `https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.1/roster;week=${week}/players/stats`,
//         // 'https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.1/stats;type=week;week=${week}',
//         `https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.2/roster;week=${week}/players/stats`,
//         // // 'https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.2/stats;type=week;week=${week}',
//         `https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.3/roster;week=${week}/players/stats`,
//         // // 'https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.3/stats;type=week;week=${week}',
//         `https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.4/roster;week=${week}/players/stats`,
//         // // 'https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.4/stats;type=week;week=${week}',
//         `https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.5/roster;week=${week}/players/stats`,
//         // // 'https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.5/stats;type=week;week=${week}',
//         `https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.6/roster;week=${week}/players/stats`,
//         // // 'https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.6/stats;type=week;week=${week}',
//         `https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.7/roster;week=${week}/players/stats`,
//         // // 'https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.7/stats;type=week;week=${week}',
//         `https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.8/roster;week=${week}/players/stats`,
//         // // 'https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.8/stats;type=week;week=${week}',
//         `https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.9/roster;week=${week}/players/stats`,
//         // // 'https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.9/stats;type=week;week=${week}',
//         `https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.10/roster;week=${week}/players/stats`,
//         // // 'https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.10/stats;type=week;week=${week}',
//         `https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.11/roster;week=${week}/players/stats`,
//         // // 'https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.11/stats;type=week;week=${week}',
//         `https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.12/roster;week=${week}/players/stats`,
//         // // 'https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.12/stats;type=week;week=${week}',
//         `https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.13/roster;week=${week}/players/stats`,
//         // // 'https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.13/stats;type=week;week=${week}',
//         `https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.14/roster;week=${week}/players/stats`,
//         // 'https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueKey}.t.14/stats;type=week;week=${week}',
//       ],
//       true
//     )
// .then(([...rosterStats]) =>
//   rosterStats.map(({ fantasy_content: { team: [_metadata, { roster }] } }) =>
//     Object.values<any>(roster['0'].players)
//       .filter(o => o.player)
//       .map(o => o.player)
//       .reduce((acc, [[{ player_key }], _pos, stats_alt, stats]) => {
//         let effStats = stats;
//         if (!stats) {
//           effStats = stats_alt;
//         }
//         const { player_stats, player_points } = effStats;
//         return {
//           ...acc,
//           [player_key]: {
//             final_score: player_points.total,
//             stats: (player_stats.stats as any[])
//               .map(({ stat: { stat_id, value } }) => ({ id: parseInt(stat_id), value: parseInt(value) }))
//               .filter(stat => stat.value),
//           },
//         };
//       }, {})
//   )
// )
// .then(([{ fantasy_content: { league: [_metadata, { scoreboard }] } }, ...rostersAndStats]) => {
//   // const rosters: any[] = rostersAndStats.filter((_, i) => i % 2 === 0);
//   // const stats: any[] = rostersAndStats.filter((_, i) => i % 2 === 1);
//
//   const rosters = [...rostersAndStats];
//
//   const rostersByTeamKey: { [key: string]: string } = rosters
//     .map(({ fantasy_content: { team: [meta, { roster }] } }) => ({ meta, roster }))
//     .reduce(
//       (acc, { meta, roster }) => ({
//         ...acc,
//         [`${meta[0].team_key}`]: roster,
//       }),
//       {}
//     );
//
//   const matchups: Matchup[] = Object.values<any>(scoreboard['0'].matchups)
//     .filter(v => typeof v !== 'number')
//     .map(({ matchup: m }: any, i: number) => {
//       const winningTeamKey = m.winner_team_key;
//       const leagueKey = winningTeamKey.substring(0, winningTeamKey.indexOf('t') - 1);
//       console.log(leagueKey);
//       const [awayTeam, awayStats] = m['0'].teams['0'].team;
//
//       const {
//         team_key: awayTeamKey,
//         name: awayName,
//         roster_adds: awayMoves,
//         managers: awayManagers,
//       } = awayTeam.reduce((acc: any, arg: any) => ({ ...acc, ...arg }), {});
//
//       const [homeTeam, homeStats] = m['0'].teams['1'].team;
//
//       const {
//         team_key: homeTeamKey,
//         name: homeName,
//         roster_adds: homeMoves,
//         managers: homeManagers,
//       } = homeTeam.reduce((acc: any, arg: any) => ({ ...acc, ...arg }), {});
//
//       const matchup = {
//         season_id: new BSON.ObjectId(leagueIds[leagueKey]),
//         week: parseInt(m.week),
//         index: i + 1,
//         start_date: new Date(m.week_start),
//         end_date: new Date(m.week_end),
//         playoffs: m.is_playoffs === '1',
//         consolation: m.is_consolation === '1',
//         away_team: {
//           manager_id: ids[normalizeManager(awayManagers[0])],
//           team_key: awayTeamKey,
//           name: awayName,
//           wins: 0,
//           losses: 0,
//           ties: 0,
//           initial_win_probability: 0,
//           initial_projected_score: 0,
//           final_score: parseFloat(awayStats.team_points.total),
//           ...parseRoster(rostersByTeamKey[awayTeamKey]),
//           moves: parseInt(awayMoves.value),
//         },
//         home_team: {
//           manager_id: ids[normalizeManager(homeManagers[0])],
//           team_key: homeTeamKey,
//           name: homeName,
//           wins: 0,
//           losses: 0,
//           ties: 0,
//           initial_win_probability: 0,
//           initial_projected_score: 0,
//           final_score: parseFloat(homeStats.team_points.total),
//           ...parseRoster(rostersByTeamKey[homeTeamKey]),
//           moves: parseInt(homeMoves.value),
//         },
//         home_team_wins: m.winner_team_key === homeTeamKey,
//         tied: m.is_tied === '1',
//       };
//
//       if (m.is_matchup_recap_available) {
//         return { ...matchup, recap: { url: m.matchup_recap_url, title: m.matchup_recap_title } };
//       }
//
//       return matchup;
//     });
//   return matchups;
// })
// .then(res => res.reduce((acc, payload) => ({ ...acc, ...payload }), {}))
// .then(res => {
//   console.log(res);
//   return res;
// })
// .then(res =>
//   stitch
//     .clients()
//     .db('ffc', 'app')
//     .collection<Matchup>('matchups')
//     .find({ season_id: new BSON.ObjectId(leagueIds[leagueKey]), week })
//     .toArray()
//     .then(matchups =>
//       Promise.all(
//         matchups
//           .map(matchup => {
//             const update: Matchup = {
//               ...matchup,
//               away_team: {
//                 ...matchup.away_team,
//                 active_players: matchup.away_team.active_players.map(player => ({
//                   ...player,
//                   ...res[player.player_key],
//                 })),
//                 bench_players: matchup.away_team.bench_players.map(player => ({
//                   ...player,
//                   ...res[player.player_key],
//                 })),
//               },
//               home_team: {
//                 ...matchup.home_team,
//               },
//             };
//             return stitch
//               .clients()
//               .db('ffc', 'app')
//               .collection<Matchup>('matchups.bkp')
//               .updateOne({ _id: matchup._id }, update);
//             // return update;
//           })
//           .filter(m => !!m)
//       )
//     )
//     .then(payloads => {
//       console.log(JSON.stringify(payloads, null, 2));
//       return payloads;
//     })
// )
// );

// export const getFfcLeague = factory
// .withType('get ffc league')
// .asThunk(() => (_dispatch, getState, stitch) =>
//   makeYahooRequests(getState(), stitch, [
//     'https://fantasysports.yahooapis.com/fantasy/v2/league/314.l.206212;out=settings,standings',
//     'https://fantasysports.yahooapis.com/fantasy/v2/league/331.l.407576;out=settings,standings',
//     'https://fantasysports.yahooapis.com/fantasy/v2/league/348.l.650735;out=settings,standings',
//     'https://fantasysports.yahooapis.com/fantasy/v2/league/359.l.562551;out=settings,standings',
//     'https://fantasysports.yahooapis.com/fantasy/v2/league/371.l.402544;out=settings,standings',
//     'https://fantasysports.yahooapis.com/fantasy/v2/league/380.l.875189;out=settings,standings',
//     'https://fantasysports.yahooapis.com/fantasy/v2/league/390.l.529959;out=settings,standings',
//     // 'https://fantasysports.yahooapis.com/fantasy/v2/league/314.l.206212;out=scoreboard',
//     // 'https://fantasysports.yahooapis.com/fantasy/v2/league/331.l.407576;out=scoreboard',
//     // 'https://fantasysports.yahooapis.com/fantasy/v2/league/348.l.650735;out=scoreboard',
//     // 'https://fantasysports.yahooapis.com/fantasy/v2/league/359.l.562551;out=scoreboard',
//     // 'https://fantasysports.yahooapis.com/fantasy/v2/league/371.l.402544;out=scoreboard',
//     // 'https://fantasysports.yahooapis.com/fantasy/v2/league/380.l.875189;out=scoreboard',
//     // 'https://fantasysports.yahooapis.com/fantasy/v2/league/390.l.529959;out=scoreboard',
//   ]).then(leagues =>
//     Promise.all(
//       leagues.map(league =>
//         makeYahooRequests(
//           getState(),
//           stitch,
//           parseTeams(league).map(
//             ({ key }) => `https://fantasysports.yahooapis.com/fantasy/v2/team/${key};out=matchups,roster`
//           )
//         ).then(teams => ({
//           leagueMetadata: parseLeagueMetadata(league),
//           leagueSettings: parseLeagueSettings(league),
//           leagueScoreboard: parseLeagueScoreboard(league),
//           leagueStandings: parseLeagueStandings(league),
//           teams: teams.map(parseTeam),
//         }))
//       )
//     ).then(([l2013, l2014, l2015, l2016, l2017, l2018, l2019]) => ({
//       2013: l2013,
//       2014: l2014,
//       2015: l2015,
//       2016: l2016,
//       2017: l2017,
//       2018: l2018,
//       2019: l2019,
//     }))
//   )
// )
// .withReducer((state, action) => {
//   switch (action.status) {
//     case 'success':
//       return {
//         ...state,
//         leagueData: { ...state.leagueData, ...action.payload },
//       };
//   }
//   return state;
// });
