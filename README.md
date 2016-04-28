# national-lottery-api
It's simple helper API for https://loteriaparagonowa.gov.pl/ that will fasten up adding recipt's to.

#How does it work?
1. Get `tampermonkey` from [here](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=pl&gl=PL)
or other place that you want (should work with ff on [Greasemonkey](https://addons.mozilla.org/pl/firefox/addon/greasemonkey/))
2. Install [this](https://github.com/szymczakk/national-lottery-api/blob/master/tampermonkeyScript.js) script to it.
3. Get on [loteria paragonowa](https://loteriaparagonowa.gov.pl/) and enjoy. (after typing `numer kasy` that already exists in database
script will automaticly fill `nip` for you. Trust me. It speed up whole process!)

#Simple api description
Right now, api works on monogdb database, in simple way.

- GET `https://loteriaapi.rakaz.pl/lottery/` will return all pairs `nip` and `numer kasy` that has in db.
- GET `https://loteriaapi.rakaz.pl/lottery/:nrkasy` if there is a document with such `nrkasy` you will get one.
- POST `https://loteriaapi.rakaz.pl/lottery/` {nrkasy, nip} will add new document to my db for next usage.
