# Foundation Cram

Revision app for the UK amateur radio **Foundation** exam (RSGB, 26 questions,
pass mark 19, 60 minutes). It's a static page with no build step.

- **Cram weak spots**: serves the questions you get wrong most.
- **Mock exam**: 26 questions split by topic like the real paper, with a 60-minute timer.
- **Flashcards**: tap to reveal the answer, then mark it knew it / missed it.
- **Pass likelihood**: your estimated chance of scoring 19+, and which topic loses you the most marks.
- **EX307 pointers**: the 4-page reference booklet you get in the exam. After you answer, a
  question it covers tells you which page and row has the answer. Get the sheet itself, and the
  RSGB's official mock papers, from https://rsgb.org/mock-exams.
- **Backups**: progress lives in your browser. Download a backup file and restore it on another device.

Questions were checked against the Foundation column of RSGB syllabus v1.6b
(March 2026) and the licence rules exams test from 1 Sept 2024 (25 W, M7 calls).
Spotted a wrong answer? Open an issue.

## Use it

Just open https://edleeman.co.uk/ham/. No sign-up, nothing to install.

## Run your own copy

```sh
git clone git@github.com:edleeman17/foundation-cram.git
cd foundation-cram
docker compose up -d --build
```

Then open http://localhost:8080 (or http://<that machine's IP>:8080 from your
phone on the same network). Your progress is saved in the `progress` Docker
volume, so every device you use shares it and it survives restarts.

To update after a `git pull`: `docker compose up -d --build`.

No Docker? Run `python3 -m http.server -d site 8080` instead. Progress is then
saved in each browser only.

## Files

- `site/questions.js`: the question bank. Rows are `[topic, question, [correct, wrong, wrong, wrong], explanation, ex307ref?]`
- `site/index.html`: the whole app, no build step
- `tools/check.js`: validates the bank (`node tools/check.js`)
- `Dockerfile`, `docker-compose.yml`, `docker/nginx.conf`: nginx serving the site, plus progress saving

The questions and explanations are written for this app against the RSGB Foundation syllabus.
Not affiliated with the RSGB or Ofcom.

## Licence

Code: MIT. Questions and explanations: CC BY-SA 4.0.
