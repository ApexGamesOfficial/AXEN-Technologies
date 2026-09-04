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


/* STARTUP */

mobileNav.hidden = true;
cartBackdrop.hidden = true;
noticeModal.hidden = true;


/* MOBILE NAV */

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


/* SEARCH */

const searchableSections =
    Array.from(
        document.querySelectorAll(
            "[data-search-title]"
        )
    );


function hideSearch() {

    searchResults.hidden = true;

}


function searchSite(query) {

    const value =
        query
            .trim()
            .toLowerCase();

    searchResults.innerHTML = "";


    if (!value) {

        hideSearch();

        return;

    }


    const matches =
        searchableSections.filter(
            section => {

                const text =
                    (
                        section.dataset.searchTitle +
                        " " +
                        section.dataset.searchKeywords
                    )
                    .toLowerCase();

                return text.includes(value);

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

            const result =
                document.createElement("button");

            result.type =
                "button";

            result.className =
                "search-result";

            result.textContent =
                section.dataset.searchTitle;


            result.addEventListener(
                "click",
                () => {

                    section.scrollIntoView({
                        behavior: "smooth"
                    });

                    siteSearch.value = "";

                    clearSearch.style.display =
                        "none";

                    hideSearch();

                }
            );


            searchResults.appendChild(
                result
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

        hideSearch();

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

            hideSearch();

        }

    }
);


/* CART */

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


/* NOTICE */

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
            event.target ===
            noticeModal
        ) {

            hideNotice();

        }

    }
);


/* ESCAPE */

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

        hideSearch();

    }
);


/* RESIZE */

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
