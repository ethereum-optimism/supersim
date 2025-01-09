// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="introduction.html">Introduction</a></li><li class="chapter-item expanded affix "><li class="part-title">Getting Started</li><li class="chapter-item expanded "><a href="getting-started/installation.html"><strong aria-hidden="true">1.</strong> Installation</a></li><li class="chapter-item expanded "><a href="getting-started/first-steps.html"><strong aria-hidden="true">2.</strong> First steps</a></li><li class="chapter-item expanded affix "><li class="part-title">CLI Reference</li><li class="chapter-item expanded "><a href="reference/supersim.html"><strong aria-hidden="true">3.</strong> supersim</a></li><li class="chapter-item expanded "><a href="reference/supersim-fork.html"><strong aria-hidden="true">4.</strong> supersim fork</a></li><li class="chapter-item expanded affix "><li class="part-title">Chain Environment</li><li class="chapter-item expanded "><a href="chain-environment/contracts/index.html"><strong aria-hidden="true">5.</strong> Included contracts</a></li><li class="chapter-item expanded "><a href="chain-environment/network-details/index.html"><strong aria-hidden="true">6.</strong> Network details &amp; contract addresses</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="chain-environment/network-details/op-chain-a.html"><strong aria-hidden="true">6.1.</strong> OPChainA</a></li><li class="chapter-item expanded "><a href="chain-environment/network-details/op-chain-b.html"><strong aria-hidden="true">6.2.</strong> OPChainB</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">Guides</li><li class="chapter-item expanded "><a href="guides/deposit-transactions.html"><strong aria-hidden="true">7.</strong> Deposit Transactions</a></li><li class="chapter-item expanded "><a href="guides/interop/index.html"><strong aria-hidden="true">8.</strong> Interoperability</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="guides/interop/cross-chain-contract-calls-pingpong.html"><strong aria-hidden="true">8.1.</strong> Cross Chain Contract Calls (PingPong)</a></li><li class="chapter-item expanded "><a href="guides/interop/cross-chain-event-reads-tictactoe.html"><strong aria-hidden="true">8.2.</strong> Cross Chain Event Reading (TicTacToe)</a></li><li class="chapter-item expanded "><a href="guides/interop/cross-chain-event-composability-predictionmarket.html"><strong aria-hidden="true">8.3.</strong> Cross Chain Event Composability (Prediction Market)</a></li><li class="chapter-item expanded "><a href="guides/interop/bridging-eth.html"><strong aria-hidden="true">8.4.</strong> Bridging ETH</a></li><li class="chapter-item expanded "><a href="guides/interop/viem.html"><strong aria-hidden="true">8.5.</strong> Viem bindings</a></li><li class="chapter-item expanded "><a href="guides/interop/cast.html"><strong aria-hidden="true">8.6.</strong> Relay with Cast</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
