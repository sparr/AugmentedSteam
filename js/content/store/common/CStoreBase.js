class CStoreBase extends ASContext {

    constructor(features) {

        features.push(
            FHighlightsTags,
        );

        super(features);
    }
}