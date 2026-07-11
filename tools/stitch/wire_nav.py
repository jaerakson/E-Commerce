#!/usr/bin/env python3
"""Wire internal navigation in the generated AETHER pages.
- <a href="#">TEXT</a>  -> href based on link text
- header icon <button aria-label="Search|shopping_bag|person"> -> <a href=...>
Idempotent: only rewrites href="#".
"""
import glob, re, os

ROOT = "/Users/liche/Documents/dev/E-Commerce"

# normalized anchor text -> route
TEXT_MAP = {
    "AETHER": "/",
    "COLLECTIONS": "/collections",
    "NEW ARRIVALS": "/",
    "CURATIONS": "/curations",
    "MY CURATIONS": "/curations",
    "BOUTIQUE": "/collections",
    "SUSTAINABILITY": "/brand-story",
    "OUR STORY": "/brand-story",
    "CONTACT": "/contact",
    "CONTACT US": "/contact",
    "WISHLIST": "/wishlist",
    "FAVORITES": "/favorites",
    "REVIEWS": "/reviews",
    "ORDERS": "/orders",
    "ORDER HISTORY": "/orders",
    # CTAs
    "SHOP NEW ARRIVAL": "/collections",
    "SHOP NEW ARRIVALS": "/collections",
    "VIEW ALL": "/collections",
    "EXPLORE ALL": "/collections",
    "SHOP NOW": "/collections",
    "ADD TO BAG": "/bag",
    "ADD TO CART": "/bag",
    "VIEW BAG": "/bag",
    "SAVE TO CURATIONS": "/curations",
    "WRITE A REVIEW": "/reviews",
    "PROCEED TO CHECKOUT": "/checkout",
    "SECURE CHECKOUT": "/checkout",
    "CHECKOUT": "/checkout",
    "CONTINUE SHOPPING": "/collections",
    "VIEW ORDER": "/orders",
    "TRACK ORDER": "/orders",
}

# aria-label (matched case-insensitively) -> route
ICON_MAP = {
    "search": "/search",
    "shopping_bag": "/bag", "shopping bag": "/bag", "bag": "/bag", "cart": "/bag",
    "person": "/login", "account": "/login", "user": "/login", "profile": "/login",
}

def strip_tags(s):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", s)).strip()

def wire_anchors(src):
    def repl(m):
        attrs, inner = m.group(1), m.group(2)
        if 'href="#"' not in attrs:
            return m.group(0)
        key = strip_tags(inner).upper()
        route = TEXT_MAP.get(key)
        if not route:
            return m.group(0)
        new_attrs = attrs.replace('href="#"', 'href="%s"' % route)
        return "<a%s>%s</a>" % (new_attrs, inner)
    return re.sub(r"<a\b([^>]*)>(.*?)</a>", repl, src, flags=re.S)

def wire_icon_buttons(src):
    # <button ...aria-label="LABEL"...> SPAN </button> -> <a href=route ...>SPAN</a>
    def repl(m):
        attrs, inner = m.group(1), m.group(2)
        lm = re.search(r'aria-label="([^"]*)"', attrs)
        if not lm:
            return m.group(0)
        route = ICON_MAP.get(lm.group(1).strip().lower())
        if not route:
            return m.group(0)
        return '<a href="%s"%s>%s</a>' % (route, attrs, inner)
    # only match buttons whose body is a single icon span (avoid eating large buttons)
    return re.sub(r'<button\b([^>]*)>\s*(<span\b[^>]*>[^<]*</span>)\s*</button>',
                  repl, src, flags=re.S)

changed = 0
for fp in glob.glob(os.path.join(ROOT, "app/**/page.tsx"), recursive=True):
    s = open(fp, encoding="utf-8").read()
    orig = s
    s = wire_icon_buttons(s)
    s = wire_anchors(s)
    if s != orig:
        open(fp, "w", encoding="utf-8").write(s)
        # count wired hrefs
        n = len(re.findall(r'href="/', s))
        print(f"{os.path.relpath(fp, ROOT):34} wired ({n} internal links)")
        changed += 1
print("files changed:", changed)
