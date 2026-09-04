"use strict";


/* =========================================
   AXEN TECHNOLOGIES
   Website v0.1
========================================= */


/* =========================
   ELEMENTS
========================= */

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

const closeCart =
    document.getElementById(
        "closeCart"
    );

const cartDrawer =
    document.getElementById(
        "cartDrawer"
    );

const drawerBackdrop =
    document.getElementById(
        "drawerBackdrop"
    );

const shopFromCart =
    document.getElementById(
        "shopFromCart"
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


/* =========================
   MOBILE NAVIGATION
========================= */

function closeMobileMenu() {

    mobileNav.hidden = true;

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

}


menuButton.addEventListener(
    "click",
    () => {

        const willOpen =
            mobileNav.hidden;

        mobileNav.hidden =
            !willOpen;

        menuButton.setAttribute(
            "aria-expanded",
            String(willOpen)
        );

    }
);


mobileNav
    .querySelectorAll("a")
    .forEach(
        link => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        }
    );


/* =========================
   SEARCH
========================= */

const searchableSections =
    Array.from(
        document.querySelectorAll(
            "[data-search-title]"
        )
    )
    .map(
        section => ({
            element: section,

            title:
                section.dataset
                    .searchTitle || "",

            keywords:
                section.dataset
                    .searchKeywords || ""
        })
    );


function hideSearchResults() {

    searchResults.hidden = true;

}


function showSearchResults(
    query
) {

    const cleanedQuery =
        query
            .trim()
            .toLowerCase();


    searchResults.innerHTML = "";


    if (!cleanedQuery) {

        hideSearchResults();

        return;

    }


    const matches =
        searchableSections
            .filter(
                item => {

                    const searchableText =
                        (
                            item.title +
                            " " +
                            item.keywords
                        )
                        .toLowerCase();

                    return searchableText
                        .includes(
                            cleanedQuery
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
                "search-result-title";

            title.textContent =
                item.title;


            const sub =
                document.createElement(
                    "span"
                );

            sub.className =
                "search-result-sub";

            sub.textContent =
                "Open section";


            button.append(
                title,
                sub
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

        const value =
            searchInput.value;

        clearSearch.style
            .display =
            value
                ? "block"
                : "none";

        showSearchResults(
            value
        );

    }
);


searchInput.addEventListener(
    "focus",
    () => {

        if (
            searchInput.value.trim()
        ) {

            showSearchResults(
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

            hideSearchResults();

            searchInput.blur();

        }


        if (
            event.key ===
            "Enter"
        ) {

            const firstResult =
                searchResults
                    .querySelector(
                        ".search-result"
                    );

            if (firstResult) {

                firstResult.click();

            }

        }

    }
);


clearSearch.addEventListener(
    "click",
    () => {

        searchInput.value =
            "";

        clearSearch.style
            .display =
            "none";

        hideSearchResults();

        searchInput.focus();

    }
);


document.addEventListener(
    "click",
    event => {

        const clickedInsideSearch =
            event.target.closest(
                ".header-search"
            );

        if (!clickedInsideSearch) {

            hideSearchResults();

        }

    }
);


/* =========================
   CART
========================= */

function openCartDrawer() {

    drawerBackdrop.hidden =
        false;

    cartDrawer.classList.add(
        "open"
    );

    cartDrawer.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style
        .overflow =
        "hidden";

}


function closeCartDrawer() {

    cartDrawer.classList.remove(
        "open"
    );

    cartDrawer.setAttribute(
        "aria-hidden",
        "true"
    );


    window.setTimeout(
        () => {

            drawerBackdrop.hidden =
                true;

        },
        220
    );


    document.body.style
        .overflow =
        "";

}


cartButton.addEventListener(
    "click",
    openCartDrawer
);


closeCart.addEventListener(
    "click",
    closeCartDrawer
);


drawerBackdrop.addEventListener(
    "click",
    closeCartDrawer
);


shopFromCart.addEventListener(
    "click",
    closeCartDrawer
);


/* =========================
   NOTICE MODAL
========================= */

function showNotice(
    message
) {

    noticeText.textContent =
        message;

    noticeModal.hidden =
        false;

    document.body.style
        .overflow =
        "hidden";

}


function hideNotice() {

    noticeModal.hidden =
        true;

    document.body.style
        .overflow =
        "";

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
                        button.dataset
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
            "AXEN Accounts will arrive in a future website update."
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


/* =========================
   KEYBOARD CONTROLS
========================= */

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


        closeMobileMenu();
        hideSearchResults();

    }
);


/* =========================
   ACTIVE NAVIGATION
========================= */

const navLinks =
    Array.from(
        document.querySelectorAll(
            ".desktop-nav a"
        )
    );


const observedSections =
    Array.from(
        document.querySelectorAll(
            "main section[id]"
        )
    );


if (
    "IntersectionObserver" in window
) {

    const sectionObserver =
        new IntersectionObserver(
            entries => {

                const visible =
                    entries
                        .filter(
                            entry =>
                                entry
                                    .isIntersecting
                        )
                        .sort(
                            (
                                a,
                                b
                            ) =>
                                b
                                    .intersectionRatio -
                                a
                                    .intersectionRatio
                        );


                if (
                    !visible.length
                ) {

                    return;

                }


                const id =
                    visible[0]
                        .target
                        .id;


                navLinks.forEach(
                    link => {

                        const active =
                            link.getAttribute(
                                "href"
                            ) ===
                            `#${id}`;


                        link.style.color =
                            active
                                ? "#000"
                                : "";

                        link.style.fontWeight =
                            active
                                ? "800"
                                : "";

                    }
                );

            },
            {
                threshold: [
                    0.25,
                    0.5,
                    0.7
                ]
            }
        );


    observedSections.forEach(
        section =>
            sectionObserver.observe(
                section
            )
    );

}


/* =========================
   CLEAN RESIZE
========================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth >
            920
        ) {

            closeMobileMenu();

        }

    }
);
