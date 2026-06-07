"""
Visual analysis screenshot capture for kicksnare.digital
Captures above-the-fold views across Desktop, Laptop, Tablet, and Mobile viewports.
Also collects DOM metrics for accessibility and layout analysis.
"""

from playwright.sync_api import sync_playwright
import json
import time

URL = "https://www.kicksnare.digital/"
OUTPUT_DIR = "/home/yunix/learning-agentic/ideas/portfolio-kicksnare/screenshots"

VIEWPORTS = [
    {"name": "desktop", "width": 1920, "height": 1080},
    {"name": "laptop",  "width": 1366, "height": 768},
    {"name": "tablet",  "width": 768,  "height": 1024},
    {"name": "mobile",  "width": 375,  "height": 812},
]

def capture(page, name, width, height):
    path_atf = f"{OUTPUT_DIR}/{name}_atf.png"
    path_full = f"{OUTPUT_DIR}/{name}_full.png"
    page.screenshot(path=path_atf, full_page=False)
    page.screenshot(path=path_full, full_page=True)
    print(f"  saved: {path_atf}")
    print(f"  saved: {path_full}")


def collect_metrics(page):
    return page.evaluate("""() => {
        const h1 = document.querySelector('h1');
        const h2s = Array.from(document.querySelectorAll('h2')).map(el => el.innerText.trim().slice(0,80));
        const ctaButtons = Array.from(document.querySelectorAll('a, button')).filter(el => {
            const txt = el.innerText.trim().toLowerCase();
            return txt.includes('contact') || txt.includes('work') || txt.includes('audit') || txt.includes('book') || txt.includes('get') || txt.includes('start');
        }).map(el => {
            const r = el.getBoundingClientRect();
            return { text: el.innerText.trim().slice(0,60), tag: el.tagName, top: Math.round(r.top), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) };
        });
        const nav = document.querySelector('nav, header');
        const navRect = nav ? nav.getBoundingClientRect() : null;
        const images = Array.from(document.querySelectorAll('img')).map(img => ({
            src: img.src.slice(0,80), alt: img.alt, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight, loading: img.loading
        }));
        const fonts = Array.from(new Set(Array.from(document.querySelectorAll('*')).map(el => getComputedStyle(el).fontFamily).filter(Boolean))).slice(0,10);
        const bodyFontSize = getComputedStyle(document.body).fontSize;
        const metaViewport = document.querySelector('meta[name="viewport"]');
        const allLinks = Array.from(document.querySelectorAll('a, button')).map(el => {
            const r = el.getBoundingClientRect();
            return { text: el.innerText.trim().slice(0,40), width: Math.round(r.width), height: Math.round(r.height), top: Math.round(r.top) };
        }).filter(el => el.width > 0 && el.height > 0);
        const smallTouchTargets = allLinks.filter(el => el.width < 48 || el.height < 48);
        return {
            title: document.title,
            h1: h1 ? h1.innerText.trim() : null,
            h1Rect: h1 ? (() => { const r = h1.getBoundingClientRect(); return {top: Math.round(r.top), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height)}; })() : null,
            h2s,
            ctaButtons,
            navRect,
            images,
            fonts,
            bodyFontSize,
            metaViewport: metaViewport ? metaViewport.content : null,
            allLinks,
            smallTouchTargets,
            documentHeight: document.documentElement.scrollHeight,
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,
            hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth,
            scrollWidth: document.documentElement.scrollWidth,
        };
    }""")


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(args=["--no-sandbox"])
        results = {}

        for vp in VIEWPORTS:
            name = vp["name"]
            w, h = vp["width"], vp["height"]
            print(f"\n--- {name.upper()} ({w}x{h}) ---")

            page = browser.new_page(viewport={"width": w, "height": h})
            # Emulate mobile user agent for mobile viewport
            if name == "mobile":
                page.set_extra_http_headers({"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"})

            try:
                page.goto(URL, wait_until="networkidle", timeout=30000)
                time.sleep(1)  # let any JS animations settle
                capture(page, name, w, h)
                metrics = collect_metrics(page)
                metrics["viewport"] = vp
                results[name] = metrics
                print(f"  title: {metrics['title']}")
                print(f"  h1: {metrics['h1']}")
                print(f"  h1 top px: {metrics['h1Rect']}")
                print(f"  horizontal scroll: {metrics['hasHorizontalScroll']} (scrollWidth={metrics['scrollWidth']})")
                print(f"  small touch targets (<48px): {len(metrics['smallTouchTargets'])}")
                print(f"  body font-size: {metrics['bodyFontSize']}")
                print(f"  meta viewport: {metrics['metaViewport']}")
                print(f"  fonts detected: {metrics['fonts'][:3]}")
                print(f"  CTA buttons visible: {len(metrics['ctaButtons'])}")
                for cta in metrics['ctaButtons']:
                    print(f"    [{cta['tag']}] '{cta['text']}' top={cta['top']} {cta['width']}x{cta['height']}")
                print(f"  small touch targets detail:")
                for t in metrics['smallTouchTargets'][:10]:
                    print(f"    '{t['text']}' {t['width']}x{t['height']} top={t['top']}")
            except Exception as e:
                print(f"  ERROR: {e}")
                results[name] = {"error": str(e)}
            finally:
                page.close()

        browser.close()

        # Save full JSON metrics
        metrics_path = f"{OUTPUT_DIR}/metrics.json"
        with open(metrics_path, "w") as f:
            json.dump(results, f, indent=2)
        print(f"\nMetrics saved to {metrics_path}")


if __name__ == "__main__":
    main()
