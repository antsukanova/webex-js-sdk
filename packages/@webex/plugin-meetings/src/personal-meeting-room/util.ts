import {
  HTTP_VERBS,
  VALID_PIN,
  VALID_PMR_ADDRESS,
  VALID_PMR_LINK,
  CMR_MEETINGS,
  CLAIM,
  HECATE,
  WEBEX_DOT_COM,
} from '../constants';

const PersonalMeetingRoomUtil: any = {};

PersonalMeetingRoomUtil.getClaimPmrLink = (pmrLink: string) => {
  let validator: boolean | RegExpMatchArray | null = VALID_PMR_ADDRESS.test(pmrLink);

  if (validator) {
    return pmrLink;
  }
  validator = pmrLink.match(VALID_PMR_LINK);
  if (validator) {
    // userId + '@' + site + '.webex.com'
    return `${validator[4]}@${validator[2]}.${WEBEX_DOT_COM}`;
  }

  return null;
};

PersonalMeetingRoomUtil.getClaimPmrPin = (hostPin: string) => {
  if (VALID_PIN.test(hostPin)) {
    return hostPin;
  }

  return null;
};

PersonalMeetingRoomUtil.getClaimedRequestParams = (
  link: string,
  pin: Record<string, any>,
  options: Record<string, any>
) => ({
  method: HTTP_VERBS.POST,
  api: HECATE,
  resource: `/${CMR_MEETINGS}/${CLAIM}`,
  body: {
    userId: options.userId,
    passcode: pin,
    preferred: options.preferred,
    meetingAddress: link,
  },
});

export default PersonalMeetingRoomUtil;
