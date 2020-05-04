class FSavingsCheck extends ASFeature {

    apply() {

        return new Promise(resolve => {
            setTimeout(() => {

                let notOwnedTotalPrice = 0;
    
                for (let node of document.querySelectorAll(".tab_item:not(.ds_owned)")) {
                    let priceNode = node.querySelector(".discount_final_price");
                    // Only present when the product has a price associated with (so it's not free or N/A)
                    if (priceNode) {
                        let priceContainer = priceNode.textContent.trim();
                        if (priceContainer) {
                            let price = Price.parseFromString(priceContainer);
                            if (price) {
                                notOwnedTotalPrice += price.value;
                                continue;
                            }
                        }
                    } else {
                        let finalPrice = node.querySelector(".final_price");
                        if (finalPrice) {
                            if (finalPrice.textContent === "N/A") {
                                notOwnedTotalPrice = null;
                                break;
                            }
                        }
                        continue;
                    }
                    console.warn("Couldn't find any price information for appid", node.dataset.dsAppid);
                }
    
                if (notOwnedTotalPrice !== null) {
                    let priceNode = DOMHelper.selectLastNode(document, ".package_totals_area .price");
                    let packagePrice = Price.parseFromString(priceNode.textContent);
                    if (!packagePrice) { return; }
    
                    notOwnedTotalPrice -= packagePrice.value;
                    notOwnedTotalPrice = new Price(notOwnedTotalPrice);
    
                    if (!document.querySelector("#package_savings_bar")) {
                        HTML.beforeEnd(".package_totals_area",
                            `<div id="package_savings_bar">
                                <div class="savings"></div>
                                <div class="message">${Localization.str.bundle_saving_text}</div>
                            </div>`);
                    }
    
                    let savingsNode = document.querySelector("#package_savings_bar > .savings");
                    savingsNode.textContent = notOwnedTotalPrice;
                    if (notOwnedTotalPrice.value < 0) {
                        savingsNode.style.color = "red";
                    }
                }

                resolve();
    
            }, 500); // why is this here?
        });
    }
}