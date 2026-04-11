import { db, functions } from "../../../firebase/config"

// user_reports
export const userReportsRef = db.collection('user_reports')
export const reportsRef = db.collection('reports')

// doc collections ref
export const DocRef = id => {
  return {
   // user_reports
   reportsLive: userReportsRef.doc(id).collection('reports_live'),
  }
}
// user reporting firebase functions
export const UserReportingFunctions = () => {
  return {
    fetchBlockedUsers: functions().httpsCallable('fetchBlockedUsers'),
    markAbuse: functions().httpsCallable('markAbuse'),
    unblockUser: functions().httpsCallable('unblockUser'),
  }
}