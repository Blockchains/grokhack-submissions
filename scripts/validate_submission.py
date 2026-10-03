#!/usr/bin/env python3
"""Validate submission.json against submission.schema.json (stdlib subset of JSON Schema: type, required, enum, pattern,
minLength, maxLength, minItems, items, properties). For status=submitted, demo_url and video_url must be real https URLs that respond."""
import json, re, sys, urllib.request

def check(v, s, path, errs):
    t = s.get("type")
    types = {"object": dict, "array": list, "string": str}
    if t and not isinstance(v, types[t]):
        errs.append(f"{path}: expected {t}"); return
    if "enum" in s and v not in s["enum"]: errs.append(f"{path}: {v!r} not in {s['enum']}")
    if isinstance(v, str):
        if "minLength" in s and len(v) < s["minLength"]: errs.append(f"{path}: too short")
        if "maxLength" in s and len(v) > s["maxLength"]: errs.append(f"{path}: too long")
        if "pattern" in s and not re.search(s["pattern"], v): errs.append(f"{path}: does not match {s['pattern']}")
    if isinstance(v, list):
        if "minItems" in s and len(v) < s["minItems"]: errs.append(f"{path}: needs at least {s['minItems']} item(s)")
        for i, x in enumerate(v):
            if "items" in s: check(x, s["items"], f"{path}[{i}]", errs)
    if isinstance(v, dict):
        for k in s.get("required", []):
            if k not in v: errs.append(f"{path}.{k}: required")
        for k, sub in s.get("properties", {}).items():
            if k in v: check(v[k], sub, f"{path}.{k}", errs)

def reachable(url):
    try:
        req = urllib.request.Request(url, method="GET", headers={"User-Agent": "grokhack-submission-check"})
        with urllib.request.urlopen(req, timeout=20) as r: return r.status < 400
    except Exception: return False

def main(p="submission.json", schema="submission.schema.json"):
    sub, sch = json.load(open(p)), json.load(open(schema))
    errs = []; check(sub, sch, "$", errs)
    if sub.get("status") == "submitted":
        for k in ("demo_url", "video_url"):
            u = sub.get(k, "")
            if not u.startswith("https://"): errs.append(f"$.{k}: required as an https URL when status=submitted")
            elif not reachable(u): errs.append(f"$.{k}: {u} did not respond with < 400")
    if errs:
        print("submission.json INVALID:"); [print(" -", e) for e in errs]; return 1
    print(f"submission.json OK ({sub['project']}, status={sub['status']})"); return 0

if __name__ == "__main__":
    sys.exit(main(*sys.argv[1:]))
