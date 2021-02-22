#!/bin/bash
git add .
git commit -m "Update on $(date +"%D") at $(date +"%T")"
if git push; then
	echo "Git Push Successful!"
else
	git push --force-with-lease
fi
git pull upstream master --allow-unrelated-histories
