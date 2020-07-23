import {CCommunityBase} from "community/common/CCommunityBase";
import {ContextTypes} from "modules/ASContext";

import {FHighlightFriendsActivity} from "community/profile_activity/FHighlightFriendsActivity";

import {EarlyAccess} from "common";
import {CommentHandler} from "community/common/CommentHandler";

export class CProfileActivityPage extends CCommunityBase {

    constructor() {
        
        super([
            FHighlightFriendsActivity,
        ]);

        this.type = ContextTypes.PROFILE_ACTIVITY;

        this.triggerCallbacks();

        new MutationObserver(() => {
            // TODO Only apply on new nodes
            this.triggerCallbacks();
            EarlyAccess.showEarlyAccess();
            CommentHandler.hideSpamComments();

        }).observe(document.querySelector("#blotter_content"), {"subtree": true, "childList": true});
    }
}
