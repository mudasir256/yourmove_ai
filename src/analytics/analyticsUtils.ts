type CustomWindow = Window & {
  gtag?: (command: string, eventName: string, eventParams: Record<string, any>) => void;
}

export type EventParams = Record<string, string | number | boolean>;

export const logEvent = (
  eventName: string,
  product: string | undefined = undefined,
  eventParams: EventParams = {},
  eventCategory: string = 'funnel',
  storage: Storage = localStorage,
  win: CustomWindow = window
): void => {
  if (typeof win !== 'undefined' && win.gtag) {
    const experimentValue = storage.getItem('experiment_group');
    const group = experimentValue !== null && experimentValue !== undefined ? parseInt(experimentValue, 10) : undefined;
    const experimentGroup = group === undefined ? undefined : group === 0 ? 'A' : 'B';
    const source = storage.getItem('utm_source')
    const campaign = storage.getItem('utm_campaign')

    const params = {
      ...eventParams,
      'event_category': eventCategory,
      ...(product && { product: product }),
      ...(experimentGroup && { experiment_group: experimentGroup }),
      ...(source && { utm_source: source }),
      ...(campaign && { utm_campaign: campaign }),
    }
    win.gtag('event', eventName, params);
    console.log("LOGGING EVENT:: ", eventName, JSON.stringify(params))
  } else {
    console.warn('gtag is not available');
  }
};