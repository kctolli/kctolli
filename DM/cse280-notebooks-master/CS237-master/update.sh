#!/bin/bash
cd C:/Users/Kyle/mue14003/
git add .
echo "If you have a message, record it below. Else, press ENTER."
read input
if [[ $input == "" ]]; then
	git commit -m "Update on $(date +"%D") at $(date +"%T")"
else
	git commit -m "$input on $(date +"%D") at $(date +"%T")"
fi
if git push; then
	echo "Git Push Successful!"
else
	echo "Git Push Failed. Press ENTER to force push. Press any other key to cancel."
	read force_push
	if [[ $force_push == "" ]]; then
		if git push --force-with-lease; then
			echo "Git Force Push Successful!"
		else
			echo "Git Force Push Failed. Press ENTER to Pull Upstream Master."
			read pull_upstream
			if [[ $pull_upstream == "" ]]; then
				true
			else
				kill $PPID
			fi
		fi
	else
		kill $PPID
	fi
fi
git pull upstream master --allow-unrelated-histories