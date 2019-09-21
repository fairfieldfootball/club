import { YahooLeagueMeta, YahooLeagueSettings, YahooLeagueStandings } from './dump';
import { LeagueScoreboard } from './scoreboard';

type Optional<T> = T | undefined;

class State {
  static NAMESPACE = 'yahoo';

  constructor(
    public meta: Optional<YahooLeagueMeta> = undefined,
    public settings: Optional<YahooLeagueSettings> = undefined,
    public standings: Optional<YahooLeagueStandings> = undefined,
    public scoreboard: Optional<LeagueScoreboard> = undefined,
    public duration: string = '',
    public error: string = ''
  ) {}
}

export default State;
