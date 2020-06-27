// export type botAuthorizingStatusType = 'WAITING' | 'APPROVED' | 'DENIED';

// export const botAuthorizingStatus: Array<botAuthorizingStatusType> = [
//   'APPROVED',
//   'DENIED',
//   'WAITING',
// ];

export enum botAuthorizingStatus {
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
  WAITING = 'WAITING',
}
