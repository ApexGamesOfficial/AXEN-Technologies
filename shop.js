"use strict";


/* =========================================
   AXEN SHOP
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
        "shopSearch"
    );

const clearSearch =
    document.getElementById(
        "clearSearch"
    );


const categoryButtons =
    Array.from(
        document.querySelectorAll(
            ".category-button"
        )
    );


const productItems =
    Array.from(
        document.querySelectorAll(
            ".product-item"
        )
    );


const noResults =
    document.getElementById(
        "noResults"
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
   STATE
========================================= */

let activeCategory =
    "all";



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
   FILTERING
========================================= */

function applyFilters() {

    const searchValue =
        searchInput.value
            .trim()
            .toLowerCase();


    let visibleCount =
        0;


    productItems.forEach(
        item => {

            const category =
                item.dataset
                    .category || "";

            const searchText =
                (
                    item.dataset
                        .search || ""
                )
                .toLowerCase();


            const categoryMatches =
                activeCategory ===
                    "all"
                ||
                category ===
                    activeCategory;


            const searchMatches =
                !searchValue
                ||
                searchText.includes(
                    searchValue
                );


            const visible =
                categoryMatches
                &&
                searchMatches;


            item.classList.toggle(
                "filtered-out",
                !visible
            );


            if (visible) {

                visibleCount += 1;

            }

        }
    );


    noResults.hidden =
        visibleCount !== 0;

}



categoryButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                activeCategory =
                    button.dataset
                        .filter;


                categoryButtons
                    .forEach(
                        item => {

                            item.classList
                                .toggle(
                                    "active",
                                    item ===
                                        button
                                );

                        }
                    );


                applyFilters();

            }
        );

    }
);



/* =========================================
   SEARCH
========================================= */

searchInput.addEventListener(
    "input",
    () => {

        clearSearch.style.display =
            searchInput.value
                ? "block"
                : "none";


        applyFilters();

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

            applyFilters();

            searchInput.blur();

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

        applyFilters();

        searchInput.focus();

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
   NOTICE MODAL
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
            "AXEN Accounts are planned for a future update."
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
   ESCAPE KEY
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



/* =========================================
   INITIAL FILTER
========================================= */

applyFilters();
