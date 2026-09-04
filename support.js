"use strict";


const menuButton =
    document.getElementById("menuButton");

const mobileNav =
    document.getElementById("mobileNav");

const siteSearch =
    document.getElementById("siteSearch");

const clearSearch =
    document.getElementById("clearSearch");

const searchResults =
    document.getElementById("searchResults");

const supportSearch =
    document.getElementById("supportSearch");

const supportSearchButton =
    document.getElementById("supportSearchButton");

const supportSearchMessage =
    document.getElementById("supportSearchMessage");

const cartButton =
    document.getElementById("cartButton");

const cartBackdrop =
    document.getElementById("cartBackdrop");

const cartDrawer =
    document.getElementById("cartDrawer");

const closeCart =
    document.getElementById("closeCart");

const accountButton =
    document.getElementById("accountButton");

const noticeModal =
    document.getElementById("noticeModal");

const noticeText =
    document.getElementById("noticeText");

const closeNotice =
    document.getElementById("closeNotice");

const noticeOkay =
    document.getElementById("noticeOkay");


/* =====================================
   STARTUP
===================================== */

mobileNav.hidden = true;
cartBackdrop.hidden = true;
noticeModal.hidden = true;
supportSearchMessage.hidden = true;


/* =====================================
   MOBILE NAV
===================================== */

function closeMobileNav() {

    mobileNav.hidden = true;

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

}


menuButton.addEventListener(
    "click",
    () => {

        const opening =
            mobileNav.hidden;

        mobileNav.hidden =
            !opening;

        menuButton.setAttribute(
            "aria-expanded",
            String(opening)
        );

    }
);


/* =====================================
   HEADER SEARCH
===================================== */

const searchableSections =
    Array.from(
        document.querySelectorAll(
            "[data-search-title]"
        )
    );


function hideHeaderSearch() {

    searchResults.hidden = true;

}


function searchSite(query) {

    const value =
        query
            .trim()
            .toLowerCase();

    searchResults.innerHTML = "";


    if (!value) {

        hideHeaderSearch();

        return;

    }


    const matches =
        searchableSections.filter(
            section => {

                const searchableText =
                    (
                        section.dataset.searchTitle +
                        " " +
                        section.dataset.searchKeywords
                    )
                    .toLowerCase();

                return searchableText.includes(
                    value
                );

            }
        );


    if (!matches.length) {

        const result =
            document.createElement("div");

        result.className =
            "search-result";

        result.textContent =
            "No AXEN results found.";

        searchResults.appendChild(
            result
        );

        searchResults.hidden =
            false;

        return;

    }


    matches.forEach(
        section => {

            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.className =
                "search-result";

            button.textContent =
                section.dataset.searchTitle;


            button.addEventListener(
                "click",
                () => {

                    section.scrollIntoView({
                        behavior: "smooth"
                    });

                    siteSearch.value = "";

                    clearSearch.style.display =
                        "none";

                    hideHeaderSearch();

                }
            );


            searchResults.appendChild(
                button
            );

        }
    );


    searchResults.hidden =
        false;

}


siteSearch.addEventListener(
    "input",
    () => {

        clearSearch.style.display =
            siteSearch.value
                ? "block"
                : "none";

        searchSite(
            siteSearch.value
        );

    }
);


clearSearch.addEventListener(
    "click",
    () => {

        siteSearch.value = "";

        clearSearch.style.display =
            "none";

        hideHeaderSearch();

        siteSearch.focus();

    }
);


document.addEventListener(
    "click",
    event => {

        if (
            !event.target.closest(
                ".header-search"
            )
        ) {

            hideHeaderSearch();

        }

    }
);


/* =====================================
   SUPPORT SEARCH
===================================== */

const supportCards =
    Array.from(
        document.querySelectorAll(
            "[data-support-topic]"
        )
    );


function runSupportSearch() {

    const value =
        supportSearch.value
            .trim()
            .toLowerCase();


    if (!value) {

        supportSearchMessage.hidden =
            false;

        supportSearchMessage.textContent =
            "Enter a support topic to search.";

        return;

    }


    const matches =
        supportCards.filter(
            card => {

                const text =
                    (
                        card.dataset.supportTopic +
                        " " +
                        card.innerText
                    )
                    .toLowerCase();

                return text.includes(
                    value
                );

            }
        );


    if (!matches.length) {

        supportSearchMessage.hidden =
            false;

        supportSearchMessage.textContent =
            "No matching support category was found. Try AXEN OS, Virtual Computer, Hardware, or Account.";

        return;

    }


    supportSearchMessage.hidden =
        false;

    supportSearchMessage.textContent =
        `Found ${matches.length} matching support ${
            matches.length === 1
                ? "category"
                : "categories"
        }.`;


    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });


    supportCards.forEach(
        card => {

            card.style.opacity =
                matches.includes(card)
                    ? "1"
                    : ".3";

        }
    );


    setTimeout(
        () => {

            supportCards.forEach(
                card => {

                    card.style.opacity =
                        "1";

                }
            );

        },
        2200
    );

}


supportSearchButton.addEventListener(
    "click",
    runSupportSearch
);


supportSearch.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            runSupportSearch();

        }

    }
);


/* =====================================
   CART
===================================== */

function openCartDrawer() {

    cartBackdrop.hidden =
        false;

    cartDrawer.classList.add(
        "open"
    );

    cartDrawer.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "locked"
    );

}


function closeCartDrawer() {

    cartDrawer.classList.remove(
        "open"
    );

    cartDrawer.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "locked"
    );


    setTimeout(
        () => {

            if (
                !cartDrawer.classList
                    .contains("open")
            ) {

                cartBackdrop.hidden =
                    true;

            }

        },
        220
    );

}


cartButton.addEventListener(
    "click",
    openCartDrawer
);

closeCart.addEventListener(
    "click",
    closeCartDrawer
);

cartBackdrop.addEventListener(
    "click",
    closeCartDrawer
);


/* =====================================
   NOTICE MODAL
===================================== */

function showNotice(message) {

    noticeText.textContent =
        message;

    noticeModal.hidden =
        false;

    document.body.classList.add(
        "locked"
    );

}


function hideNotice() {

    noticeModal.hidden =
        true;

    document.body.classList.remove(
        "locked"
    );

}


document
    .querySelectorAll(
        "[data-message]"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    showNotice(
                        button.dataset.message
                    );

                }
            );

        }
    );


accountButton.addEventListener(
    "click",
    () => {

        showNotice(
            "AXEN Accounts are planned for a future website update."
        );

    }
);


closeNotice.addEventListener(
    "click",
    hideNotice
);

noticeOkay.addEventListener(
    "click",
    hideNotice
);


noticeModal.addEventListener(
    "click",
    event => {

        if (
            event.target === noticeModal
        ) {

            hideNotice();

        }

    }
);


/* =====================================
   ESCAPE
===================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) {

            return;

        }


        if (!noticeModal.hidden) {

            hideNotice();

            return;

        }


        if (
            cartDrawer.classList
                .contains("open")
        ) {

            closeCartDrawer();

            return;

        }


        closeMobileNav();

        hideHeaderSearch();

    }
);


/* =====================================
   RESIZE
===================================== */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 950
        ) {

            closeMobileNav();

        }

    }
);
