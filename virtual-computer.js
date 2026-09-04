"use strict";


/* =========================================
   AXEN VIRTUAL COMPUTER
   v0.1
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const menuButton =
    document.getElementById(
        "menuButton"
    );

const mobileNav =
    document.getElementById(
        "mobileNav"
    );


const searchInput =
    document.getElementById(
        "siteSearch"
    );

const clearSearch =
    document.getElementById(
        "clearSearch"
    );

const searchResults =
    document.getElementById(
        "searchResults"
    );


const cartButton =
    document.getElementById(
        "cartButton"
    );

const cartBackdrop =
    document.getElementById(
        "cartBackdrop"
    );

const cartDrawer =
    document.getElementById(
        "cartDrawer"
    );

const closeCart =
    document.getElementById(
        "closeCart"
    );


const accountButton =
    document.getElementById(
        "accountButton"
    );


const noticeModal =
    document.getElementById(
        "noticeModal"
    );

const noticeText =
    document.getElementById(
        "noticeText"
    );

const closeNotice =
    document.getElementById(
        "closeNotice"
    );

const noticeOkay =
    document.getElementById(
        "noticeOkay"
    );



/* =========================================
   STARTUP
========================================= */

noticeModal.hidden =
    true;

cartBackdrop.hidden =
    true;

cartDrawer.classList.remove(
    "open"
);

mobileNav.hidden =
    true;

document.body.classList.remove(
    "locked"
);



/* =========================================
   MOBILE NAV
========================================= */

function closeMobileNav() {

    mobileNav.hidden =
        true;

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

}


menuButton.addEventListener(
    "click",
    () => {

        const shouldOpen =
            mobileNav.hidden;

        mobileNav.hidden =
            !shouldOpen;

        menuButton.setAttribute(
            "aria-expanded",
            String(
                shouldOpen
            )
        );

    }
);


mobileNav
    .querySelectorAll("a")
    .forEach(
        link => {

            link.addEventListener(
                "click",
                closeMobileNav
            );

        }
    );



/* =========================================
   SEARCH
========================================= */

const searchableSections =
    Array.from(
        document.querySelectorAll(
            "[data-search-title]"
        )
    )
    .map(
        section => ({
            element:
                section,

            title:
                section.dataset
                    .searchTitle || "",

            keywords:
                section.dataset
                    .searchKeywords || ""
        })
    );


function hideSearchResults() {

    searchResults.hidden =
        true;

}


function renderSearchResults(
    query
) {

    const cleaned =
        query
            .trim()
            .toLowerCase();


    searchResults.innerHTML =
        "";


    if (!cleaned) {

        hideSearchResults();

        return;

    }


    const matches =
        searchableSections
            .filter(
                item => {

                    const text =
                        (
                            item.title +
                            " " +
                            item.keywords
                        )
                        .toLowerCase();

                    return text.includes(
                        cleaned
                    );

                }
            )
            .slice(
                0,
                6
            );


    if (!matches.length) {

        const empty =
            document.createElement(
                "div"
            );

        empty.className =
            "search-empty";

        empty.textContent =
            "No AXEN results found.";

        searchResults.appendChild(
            empty
        );

        searchResults.hidden =
            false;

        return;

    }


    matches.forEach(
        item => {

            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.className =
                "search-result";


            const title =
                document.createElement(
                    "span"
                );

            title.className =
                "search-title";

            title.textContent =
                item.title;


            const subtitle =
                document.createElement(
                    "span"
                );

            subtitle.className =
                "search-subtitle";

            subtitle.textContent =
                "Open section";


            button.append(
                title,
                subtitle
            );


            button.addEventListener(
                "click",
                () => {

                    item.element
                        .scrollIntoView({
                            behavior:
                                "smooth",
                            block:
                                "start"
                        });


                    searchInput.value =
                        "";

                    clearSearch.style
                        .display =
                        "none";

                    hideSearchResults();

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


searchInput.addEventListener(
    "input",
    () => {

        clearSearch.style.display =
            searchInput.value
                ? "block"
                : "none";


        renderSearchResults(
            searchInput.value
        );

    }
);


searchInput.addEventListener(
    "focus",
    () => {

        if (
            searchInput.value.trim()
        ) {

            renderSearchResults(
                searchInput.value
            );

        }

    }
);


searchInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            searchInput.value =
                "";

            clearSearch.style.display =
                "none";

            hideSearchResults();

            searchInput.blur();

        }


        if (
            event.key ===
            "Enter"
        ) {

            const first =
                searchResults
                    .querySelector(
                        ".search-result"
                    );

            if (first) {

                first.click();

            }

        }

    }
);


clearSearch.addEventListener(
    "click",
    () => {

        searchInput.value =
            "";

        clearSearch.style.display =
            "none";

        hideSearchResults();

        searchInput.focus();

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

            hideSearchResults();

        }

    }
);



/* =========================================
   CART
========================================= */

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


    window.setTimeout(
        () => {

            if (
                !cartDrawer.classList
                    .contains("open")
            ) {

                cartBackdrop.hidden =
                    true;

            }

        },
        210
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



/* =========================================
   NOTICE
========================================= */

function showNotice(
    message
) {

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
        element => {

            element.addEventListener(
                "click",
                () => {

                    showNotice(
                        element.dataset
                            .message
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



/* =========================================
   ESCAPE
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !==
            "Escape"
        ) {

            return;

        }


        if (
            !noticeModal.hidden
        ) {

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

        hideSearchResults();

    }
);



/* =========================================
   RESIZE
========================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth >
            900
        ) {

            closeMobileNav();

        }

    }
);
