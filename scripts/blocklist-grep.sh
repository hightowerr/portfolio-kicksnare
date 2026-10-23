#!/usr/bin/env bash
# Mechanism blocklist grep (Feature Loop, rule 2). A spec states behaviour; mechanism belongs in the plan.
#
# Usage: bash scripts/blocklist-grep.sh [file-or-dir ...]
# Default targets: docs/use-cases/UC-*.md and docs/shaping/*/specs/*.md. Never run it on plans.
# Exit 0 = clean, 1 = hits (printed as file:line: term), 2 = usage error.
#
# Skipped inside each file: fenced code blocks, and in the "## Acceptance criteria" section the
# text after "Verify:" on each line (verification commands are mechanism by design; the criterion
# before it is still checked). Phrases in docs/loops/blocklist-allowlist.txt are
# removed before matching; every allowlist entry needs a reason and a RETRO review.
#
# Per project: edit STACK_NAMES below to name your stack. Specs written before the project adopted
# v2.2 are plans by rule 2. Move them out of specs/ into docs/shaping/<feature>/shape/ (their wave
# folder, else shape/pre-adoption/), which this script never reads.
# Origin: MA Carlton, 2026-09-23. Shipped in starter-kit/ from 2026-09-24.
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
allowlist="$root/docs/loops/blocklist-allowlist.txt"

if [ "$#" -eq 0 ]; then
  shopt -s nullglob
  set -- "$root"/docs/use-cases/UC-*.md "$root"/docs/shaping/*/specs/*.md
  shopt -u nullglob
  [ "$#" -eq 0 ] && { echo "blocklist: no specs or use cases found"; exit 0; }
fi

files=()
for t in "$@"; do
  if [ -d "$t" ]; then
    while IFS= read -r f; do files+=("$f"); done < <(find "$t" -name '*.md' ! -name 'README.md' | sort)
  elif [ -f "$t" ]; then
    files+=("$t")
  else
    echo "blocklist: no such file or directory: $t" >&2; exit 2
  fi
done

python3 - "$allowlist" "${files[@]}" <<'PY'
import re, sys

allow_path, *files = sys.argv[1:]
allow = []
try:
    for line in open(allow_path, encoding="utf-8"):
        phrase = line.split("#", 1)[0].strip()
        if phrase:
            allow.append(re.compile(re.escape(phrase), re.I))
except FileNotFoundError:
    pass

# EDIT PER PROJECT: framework, database and library names that must never appear in a spec.
STACK_NAMES = ["Next(\\.js)?", "React", "Tailwind", "GSAP", "TypeScript", "Playwright", "Vercel", "shadcn",
               "Formspree", "PostHog", "Clarity"]

# (label, pattern, flags). Case-sensitive where the lower-case word is ordinary English.
rules = [
    ("crypto/auth mechanism", r"\b(JWT|tokens?|bcrypt|hash(es|ed|ing)?|salt(ed)?|SHA-?\d*|PKCE|OIDC|OAuth2?|cookies?)\b", re.I),
    ("mail mechanism", r"\b(SMTP|email server)\b", re.I),
    ("data mechanism", r"\b(SQL|regex(es)?|regular expressions?)\b", re.I),
    ("stack name", r"\b(" + "|".join(STACK_NAMES) + r")\b", re.I),
    ("SQL/HTTP verb", r"\b(SELECT|INSERT|UPDATE|DELETE|GET|POST|PUT|PATCH)\b", 0),
    ("HTTP status", r"\b(302|400|401|403|404|409|422|500|503)\b", 0),
    ("exception name", r"\b\w+(Exception|Error)\b", 0),
    ("camelCase identifier", r"\b[a-z]+[A-Z][A-Za-z0-9]*\b", 0),
    ("snake_case identifier", r"\b[a-z0-9]+_[a-z0-9_]+\b", 0),
    ("code span", r"`[^`]+`", 0),
    ("source path", r"\b[\w.-]+/[\w./-]+\.(ts|tsx|js|mjs|json|py|go|rb|prisma|sql|sh|ya?ml|html|css)\b", 0),
]
rules = [(label, re.compile(p, f)) for label, p, f in rules]

hits = 0
for path in files:
    in_fence = False
    in_ac = False
    for n, raw in enumerate(open(path, encoding="utf-8"), 1):
        line = raw.rstrip("\n")
        if line.lstrip().startswith("```"):
            in_fence = not in_fence
            continue
        if line.startswith("## "):
            in_ac = line.lower().startswith("## acceptance criteria")
        if in_fence:
            continue
        text = line.split("Verify:", 1)[0] if in_ac else line
        for a in allow:
            text = a.sub(" ", text)
        for label, rx in rules:
            for m in rx.finditer(text):
                print(f"{path}:{n}: {label}: {m.group(0)}")
                hits += 1

print(f"blocklist: {len(files)} file(s), {hits} hit(s)", file=sys.stderr)
sys.exit(1 if hits else 0)
PY
