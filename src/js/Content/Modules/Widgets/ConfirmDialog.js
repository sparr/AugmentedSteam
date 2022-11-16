import {Page} from "../../Features/Page";
import {Localization} from "../../../Core/Localization/Localization";

class ConfirmDialog {

    static open(strTitle, strDescription, strOKButton, strCancelButton, strSecondaryActionButton) {
        return Page.runInPageContext((a, b, c, d, e) => {
            const prompt = window.SteamFacade.showConfirmDialog(a, b, c, d, e);

            return new Promise((resolve) => {
                prompt.done(result => {
                    resolve(result);
                }).fail(() => {
                    resolve("CANCEL");
                });
            });
        },
        [
            strTitle,
            strDescription,
            strOKButton,
            strCancelButton,
            strSecondaryActionButton
        ],
        true);
    }

    static openFeatureHint(
        strTitle,
        optionStr,
        strDescription,
        strOKButton = Localization.str.thewordyes,
        strCancelButton = Localization.str.thewordno,
        strSecondaryActionButton
    ) {
        const _strTitle = strTitle ? `Augmented Steam - ${strTitle}` : "Augmented Steam";

        const _strDescription =
            `${strDescription ? `${strDescription}<br><br>` : ""}
            ${Localization.str.feature_hint.desc}<br><br>
            <span class="as_feature_hint_option">${Localization.str.options[option]}</span><br><br>
            ${Localization.str.feature_hint.reminder}`;

        return this.open(_strTitle, _strDescription, strOKButton, strCancelButton, strSecondaryActionButton);
    }
}

export {ConfirmDialog};
