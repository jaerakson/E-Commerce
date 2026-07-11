#!/usr/bin/env python3
import glob, re, os

ROOT = "/Users/liche/Documents/dev/E-Commerce"
SRC = os.path.join(ROOT, "stitch-export/html")

# Color map (Stitch tokens + semantic aliases used in style blocks)
COLORS = {
    "secondary-container": "#d0f100", "tertiary-container": "#c3aa5a", "on-surface": "#e3e2e6",
    "primary-fixed": "#ffdadb", "inverse-primary": "#be003d", "on-tertiary-fixed": "#231b00",
    "on-tertiary-fixed-variant": "#564500", "on-primary-fixed-variant": "#91002c", "on-background": "#e3e2e6",
    "on-secondary": "#2c3400", "secondary-fixed": "#d0f100", "tertiary": "#dfc573", "secondary": "#ffffff",
    "primary-fixed-dim": "#ffb2b8", "on-secondary-fixed": "#181e00", "tertiary-fixed": "#fce18b",
    "surface-variant": "#343538", "pitch-black": "#000000", "on-primary-fixed": "#40000f",
    "on-secondary-fixed-variant": "#404c00", "surface-bright": "#38393c", "surface-container": "#1e2022",
    "outline": "#ab888a", "silver-mist": "#9ea0a9", "surface-deep": "#272c33",
    "surface-container-lowest": "#0d0e11", "on-tertiary": "#3c2f00", "pure-white": "#ffffff",
    "on-error-container": "#ffdad6", "secondary-fixed-dim": "#b6d300", "error": "#ffb4ab",
    "on-primary-container": "#ffffff", "surface-container-low": "#1a1b1e", "background": "#121316",
    "outline-variant": "#5b3f41", "surface-dim": "#121316", "on-tertiary-container": "#4e3e00",
    "primary": "#ffb2b8", "surface-container-high": "#292a2d", "tertiary-fixed-dim": "#dfc572",
    "on-error": "#690005", "inverse-on-surface": "#2f3033", "surface": "#121316",
    "primary-container": "#e32652", "inverse-surface": "#e3e2e6", "error-container": "#93000a",
    "on-surface-variant": "#e4bdbf", "surface-tint": "#ffb2b8", "on-primary": "#67001d",
    "on-secondary-container": "#5c6b00", "surface-container-highest": "#343538", "charcoal-canvas": "#222326",
    # semantic aliases referenced only inside style blocks
    "action-raspberry": "#e32652", "interactive-lime": "#dcff00", "highlight-gold": "#eed37f",
}

def resolve_theme(css):
    def repl(m):
        key = m.group(1)
        key = key.replace("colors.", "")
        return COLORS.get(key, "currentColor")
    css = re.sub(r"theme\(\s*['\"]([^'\"]+)['\"]\s*\)", repl, css)
    return css

# selectors to drop (handled by Tailwind utilities / globals already)
DROP_SELECTORS = {
    "body", ".material-symbols-outlined", ".font-display-lg", ".font-label-caps",
    ".font-headline-md", ".font-body-md", ".font-display-lg-mobile", ".font-display-xl",
    ".accent-serif", ".font-accent-serif", ".font-body-lg",
}

def split_rules(css):
    """Split flat CSS into (selector, body) pairs at top-level braces."""
    rules = []
    depth = 0; buf = ""; sel = None
    i = 0
    while i < len(css):
        c = css[i]
        if c == "{":
            if depth == 0:
                sel = buf.strip(); buf = ""
            else:
                buf += c
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                rules.append((sel, buf.strip())); buf = ""; sel = None
            else:
                buf += c
        else:
            buf += c
        i += 1
    return rules

seen = set()
out = []
for fp in sorted(glob.glob(os.path.join(SRC, "*.html"))):
    s = open(fp, encoding="utf-8").read()
    for m in re.finditer(r"<style[^>]*>(.*?)</style>", s, re.S):
        for sel, decl in split_rules(m.group(1)):
            if not sel or sel in DROP_SELECTORS:
                continue
            rule = "%s { %s }" % (sel, resolve_theme(decl).strip())
            rule = re.sub(r"\s+", " ", rule).strip()
            if rule in seen:
                continue
            seen.add(rule)
            out.append("%s {\n  %s\n}" % (sel, resolve_theme(decl).strip()))

css_out = "/* Custom component styles ported from Stitch page <style> blocks (theme() resolved to hex). */\n\n" + "\n\n".join(out) + "\n"
open(os.path.join(ROOT, "app/stitch-pages.css"), "w", encoding="utf-8").write(css_out)
print("wrote app/stitch-pages.css with", len(out), "rules")
