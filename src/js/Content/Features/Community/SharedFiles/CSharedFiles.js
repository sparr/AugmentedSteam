import ContextType from "../../../Modules/Context/ContextType";
import {CApp} from "../App/CApp";
import FMediaExpander from "../../Common/FMediaExpander";
import FSubscribeAllDependencies from "./FSubscribeAllDependencies";

export class CSharedFiles extends CApp {

    constructor() {

        // Don't apply features if there's an error message (e.g. private or non-existent items)
        if (document.getElementById("message") !== null) {
            super(ContextType.SHARED_FILES);
            return;
        }

        super(ContextType.SHARED_FILES, [
            FMediaExpander,
            FSubscribeAllDependencies,
        ]);
    }
}
