import { configureStore } from '@reduxjs/toolkit';

import { alertReducer } from './alert.slice';
import { authReducer } from './auth.slice';
import { usersReducer } from './users.slice';
import { configReducer } from './configuration.slice';
import { registrationReducer } from './registration.slice';
import { mapCenterReducer } from './mapcenter.slice';
import { masterReducer } from './master.slice';
import  { supplyDiversityReducer } from './supplydiversity.slice';
import { userProfileReducer } from './userProfile.slice';
import { announcementReducer } from './announcement.slice';
import { supportReducer } from './support.slice';
import { faqReducer } from './faq.slice';
import {marketerReducer} from './marketer.slice';
import { marketergroupReducer } from './marketergroup.slice';
import { nominationReducer } from './nomination.slice';
import { myprofileReducer } from './ProfileUpdate.slice';
import { nominationpipelineReducer } from './nominationPipeline.slice';
import { customerReducer } from './admincustomer.slice';
import { firmReducer } from './firm.slice';
import { interruptibleReducer } from './interruptible.slice';
import { nominationgroupReducer } from './nominationGroup.slice';
import { activityLogReducer } from './activitylog.slice';
import { filehubReducer } from './filehub.slice';

export * from './alert.slice';
export * from './auth.slice';
export * from './users.slice';
export * from './configuration.slice';
export * from './registration.slice';
export * from './mapcenter.slice';
export * from './master.slice';
export * from './supplydiversity.slice';
export * from './userProfile.slice';
export * from './announcement.slice';
export * from './support.slice';
export * from './faq.slice';
export * from './marketer.slice';
export * from './marketergroup.slice';
export * from './nomination.slice';
export * from './ProfileUpdate.slice';
export * from './nominationPipeline.slice';
export * from './admincustomer.slice';
export * from './firm.slice';
export * from './interruptible.slice';
export * from './nominationGroup.slice';
export * from './activitylog.slice';
export * from './filehub.slice';

export const store = configureStore({
    reducer: {
        alert: alertReducer,
        auth: authReducer,
        users: usersReducer,
        configs:configReducer,
        registration:registrationReducer,
        mapcenter:mapCenterReducer,
        master:masterReducer,
        supplydiversity:supplyDiversityReducer,
        userProfile:userProfileReducer,
        announcement: announcementReducer,
        supports:supportReducer,
        faq:faqReducer,
        marketer: marketerReducer,
        marketergroup:marketergroupReducer,
        nomination: nominationReducer,
        profileupdate:myprofileReducer,
        nominationpipeline: nominationpipelineReducer,
        admincustomer:customerReducer,
        firm: firmReducer,
        interruptible :interruptibleReducer,
        nominationgroup:nominationgroupReducer,
        activityLog:activityLogReducer,
        filehubReducer:filehubReducer
    },
});