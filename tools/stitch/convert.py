#!/usr/bin/env python3
import re, os

ROOT = "/Users/liche/Documents/dev/E-Commerce"
SRC = os.path.join(ROOT, "stitch-export/html")

VOID = {"img","input","br","hr","meta","link","source","area","base","col","embed","param","track","wbr"}

# slug -> (route dir relative to app/, component name, page <title>)
PAGES = {
    "home":           ("",              "HomePage",         "AETHER — Premium E-Commerce"),
    "collections":    ("collections",   "CollectionsPage",  "Collections — AETHER"),
    "search":         ("search",        "SearchPage",       "Search Results — AETHER"),
    "product-detail": ("products/[id]", "ProductDetailPage","Product — AETHER"),
    "shopping-bag":   ("bag",           "BagPage",          "Shopping Bag — AETHER"),
    "checkout":       ("checkout",      "CheckoutPage",     "Checkout — AETHER"),
    "wishlist":       ("wishlist",      "WishlistPage",     "Wishlist — AETHER"),
    "favorites":      ("favorites",     "FavoritesPage",    "Favorites — AETHER"),
    "my-curations":   ("curations",     "CurationsPage",    "My Curations — AETHER"),
    "reviews":        ("reviews",       "ReviewsPage",      "Reviews — AETHER"),
    "order-history":  ("orders",        "OrdersPage",       "Order History — AETHER"),
    "login":          ("login",         "LoginPage",        "Login & Sign Up — AETHER"),
    "contact":        ("contact",       "ContactPage",      "Contact — AETHER"),
    "brand-story":    ("brand-story",   "BrandStoryPage",   "Brand Story — AETHER"),
}

def css_to_obj(css):
    props = []
    for decl in css.split(";"):
        decl = decl.strip()
        if not decl or ":" not in decl:
            continue
        k, v = decl.split(":", 1)
        k = k.strip(); v = v.strip()
        if k.startswith("--"):
            key = '"%s"' % k
        else:
            parts = k.split("-")
            key = parts[0] + "".join(p.capitalize() for p in parts[1:])
        v = v.replace("\\", "\\\\").replace('"', '\\"')
        props.append('%s: "%s"' % (key, v))
    return "{" + ", ".join(props) + "}"

def convert_body(body):
    # strip scripts / noscript / comments
    body = re.sub(r"<script[^>]*>.*?</script>", "", body, flags=re.S)
    body = re.sub(r"<noscript[^>]*>.*?</noscript>", "", body, flags=re.S)
    body = re.sub(r"<!--.*?-->", "", body, flags=re.S)
    # strip inline event handlers (static port)
    body = re.sub(r'\son[a-zA-Z]+="[^"]*"', "", body)
    # attribute renames
    body = re.sub(r"\bclass=", "className=", body)
    body = re.sub(r"\sfor=", " htmlFor=", body)
    body = body.replace("viewbox=", "viewBox=")
    # form values -> uncontrolled defaults (avoid React controlled warnings)
    body = re.sub(r"\bvalue=", "defaultValue=", body)
    # boolean attrs: checked="" / checked="checked" / bare checked -> defaultChecked
    body = re.sub(r'\bchecked(="[^"]*")?', "defaultChecked", body)
    # disabled="..." -> bare boolean disabled
    body = re.sub(r'\bdisabled="[^"]*"', "disabled", body)
    # numeric attributes: rows="5" -> rows={5} (+ camelCase renames)
    numeric = {"rows": "rows", "cols": "cols", "size": "size", "span": "span",
               "tabindex": "tabIndex", "colspan": "colSpan", "rowspan": "rowSpan",
               "maxlength": "maxLength"}
    for html_a, jsx_a in numeric.items():
        body = re.sub(r'\b%s="(\d+)"' % html_a, r'%s={\1}' % jsx_a, body)
    # style="" -> style={{}}
    body = re.sub(r'style="([^"]*)"', lambda m: "style={%s}" % css_to_obj(m.group(1)), body)
    # <img> alt handling: prefer real alt; else promote data-alt; else empty alt
    def fix_img(m):
        tag = m.group(0)
        has_alt = re.search(r"\balt=", tag) is not None
        has_data = "data-alt=" in tag
        if has_data and has_alt:
            tag = re.sub(r'\sdata-alt="[^"]*"', "", tag)
        elif has_data and not has_alt:
            tag = tag.replace("data-alt=", "alt=", 1)
        elif not has_alt:
            tag = tag[:-1].rstrip() + ' alt="">'
        return tag
    body = re.sub(r"<img\b[^>]*>", fix_img, body)
    # self-close void elements
    def selfclose(m):
        tag = m.group(0); name = m.group(1).lower()
        if name in VOID and not tag.rstrip().endswith("/>"):
            return tag[:-1].rstrip() + " />"
        return tag
    body = re.sub(r"<([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>", selfclose, body)
    return body.strip()

def extract_body(html):
    m = re.search(r"<body[^>]*>(.*)</body>", html, re.S)
    return m.group(1) if m else html

created = []
for slug, (route, comp, title) in PAGES.items():
    fp = os.path.join(SRC, slug + ".html")
    if not os.path.exists(fp):
        print("MISSING", slug); continue
    html = open(fp, encoding="utf-8").read()
    body = convert_body(extract_body(html))
    outdir = os.path.join(ROOT, "app", route)
    os.makedirs(outdir, exist_ok=True)
    out = os.path.join(outdir, "page.tsx")
    content = (
        'import type { Metadata } from "next";\n\n'
        'export const metadata: Metadata = { title: %s };\n\n'
        'export default function %s() {\n  return (\n    <>\n%s\n    </>\n  );\n}\n'
    ) % ('"%s"' % title, comp, body)
    open(out, "w", encoding="utf-8").write(content)
    created.append((slug, route or "(home)", len(body)))

for slug, route, n in created:
    print(f"{slug:16} -> app/{route}/page.tsx   ({n} chars)")
print("TOTAL", len(created), "pages")
