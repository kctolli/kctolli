#!/bin/sh
cd F:/kctolli
git add --all
timestamp() {
  date +"at %H:%M on %m/%d/%Y"
}
git commit -am "Update $(timestamp)"
git pull
git push origin master
