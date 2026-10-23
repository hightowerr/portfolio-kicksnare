#!/usr/bin/env python3
"""Git merge driver for docs/loops/work-log.md. Parallel waves append entries from separate worktrees.

Union merge drops the lines both sides add identically (the `---` separator and blank lines), so
entries run together. This driver merges whole entries instead: it keeps our file, then appends
each entry from their side that is new since the merge base, with its own separator.

Set it up once per clone (worktrees share the clone's config):
  git config merge.work-log.driver "python3 scripts/merge-work-log.py %O %A %B"
.gitattributes then routes the work log to it:
  docs/loops/work-log.md merge=work-log
Without that config, git falls back to its normal text merge and reports any conflict.

An entry starts at a line beginning "## [". If their side edited or removed an entry from the
merge base, the log was not append-only: the driver leaves our file untouched and exits 1, so git
reports a conflict for a person to resolve.
"""
import sys

HEAD = "## ["
SEP = "\n\n---\n\n"


def entries(text):
    """Return the entries of a work log, each without its trailing blank and separator lines."""
    out, cur = [], None
    for line in text.replace("\r\n", "\n").split("\n"):
        if line.startswith(HEAD):
            if cur is not None:
                out.append(cur)
            cur = [line]
        elif cur is not None:
            cur.append(line)
    if cur is not None:
        out.append(cur)
    cleaned = []
    for e in out:
        while e and e[-1].strip() in ("", "---"):
            e.pop()
        cleaned.append("\n".join(e))
    return cleaned


def main(base_path, ours_path, theirs_path):
    read = lambda p: open(p, encoding="utf-8", newline="").read()
    base, ours, theirs = read(base_path), read(ours_path), read(theirs_path)
    base_e, ours_e, theirs_e = entries(base), set(entries(ours)), entries(theirs)

    if any(e not in theirs_e for e in base_e):
        print("merge-work-log: their side edited or removed an existing entry", file=sys.stderr)
        return 1

    known = set(base_e) | ours_e
    new = [e for e in theirs_e if e not in known]
    if not new:
        return 0
    crlf = "\r\n" in ours
    text = ours.replace("\r\n", "\n").rstrip("\n")
    text += "".join(SEP + e for e in new) + "\n"
    with open(ours_path, "w", encoding="utf-8", newline="") as f:
        f.write(text.replace("\n", "\r\n") if crlf else text)
    return 0


if __name__ == "__main__":
    if len(sys.argv) != 4:
        sys.exit("usage: merge-work-log.py <base> <ours> <theirs>")
    sys.exit(main(*sys.argv[1:]))
