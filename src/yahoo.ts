export const YAHOO_AUTH_URL = [
  'https://api.login.yahoo.com/oauth2/request_auth',
  `?client_id=${process.env.YAHOO_CLIENT_ID}`,
  `&redirect_uri=${process.env.YAHOO_REDIRECT_URI}`,
  '&response_type=code',
  '&language=en-us',
].join('');

export const childExists = (parent: Element, tagName: string) => !!parent.getElementsByTagName(tagName).item(0);

export const mustHaveBooleanValue = (parent: Element, tagName: string) => mustHaveStringValue(parent, tagName) === '1';

export const mustHaveNumberValue = (parent: Element, tagName: string) => parseNumber(mustHaveStringValue(parent, tagName));

export const mustHaveStringValue = (parent: Element, tagName: string) =>
  parent.getElementsByTagName(tagName).item(0)!.textContent!;

export const mightHaveBooleanValue = (parent: Element, tagName: string) =>
  mightHaveStringValue(parent, tagName) === '1';

export const mightHaveNumberValue = (parent: Element, tagName: string) => {
  const value = mightHaveStringValue(parent, tagName);
  if (value) {
    return parseNumber(value);
  }
  return;
};

const parseNumber = (value: string) => {
  try {
    return parseInt(value);
  } catch (e1) {
    try {
      return parseFloat(value);
    } catch (e2) {
      try {
        return parseFloat(`0${value}`);
      } catch (e3) {
        throw e3;
      }
    }
  }
}

export const mightHaveStringValue = (parent: Element, tagName: string) => {
  const child = parent.getElementsByTagName(tagName).item(0);
  if (child && child.textContent) {
    return child.textContent;
  }
  return;
};
