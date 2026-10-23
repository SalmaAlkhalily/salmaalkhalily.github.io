# PolicyGap recorded demo

The user-supplied recording shows the prototype interface: opening a workspace,
uploading sample policies, running a NIST CSF assessment and reviewing findings.
It is a recorded walkthrough rather than an assessment-speed benchmark.

- Original: 60 seconds, 1920 × 1020, H.264 at 30 fps, no audio.
- Prepared video: `public/videos/policygap-demo.mp4`, 1920 × 870, 7,655,875 bytes.
- Crop: remove the top 150 pixels containing browser tabs, address and bookmarks.
  The application navigation and native text resolution are preserved.
- Encoding: H.264, CRF 22, yuv420p, fast-start metadata before video data.
- Poster: `public/images/projects/policygap-demo-poster.webp`, results dashboard
  at 48 seconds, 1920 × 870, 70,388 bytes.
- The original remains outside the repository and is unchanged (SHA-256:
  `3d14616d5ab715bff0dd7a8a167619ecd9da74185a6efb42568e5ff9d96419ab`).

Regenerate both assets with:

```powershell
python scripts/prepare-policygap-demo.py "path/to/PolicyGap_demo_1min.mp4"
```

The demo is placed after the overview and linked from the hero and contents.
A preview button starts playback; the initial page does not request the MP4.
Native controls become available on playback, and keyboard focus moves to the
player. A visible Google Drive backup link remains available if playback fails.
The silent recording has a written walkthrough below the player.

The original source PDF is not included or linked. Review frames show a demo
email and a masked password. The browser tabs and address bar are cropped out.

Validation includes full media decoding, the production build and all eleven
page checks (408 local references). The verifier now checks video/poster references, the demo anchor,
initial preview state, text alternative and Drive link. Browser checks cover
keyboard play, mobile tap, seeking, loading behaviour and the failure fallback.
Chrome checks passed at 1440 × 1000 and 390 × 844, including light/dark previews,
native controls after Play, focus transfer, seeking to 48 seconds and keyboard
access to the walkthrough. The initial page made zero MP4 requests. The media
response supports HTTP 206 byte ranges with `video/mp4`. An intentionally
aborted media request produced the visible failure message and kept native
controls and the Drive fallback available. No page script errors were observed.
